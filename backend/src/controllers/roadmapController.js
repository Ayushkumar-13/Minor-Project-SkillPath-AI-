import Roadmap from '../models/Roadmap.js';
import User from '../models/User.js';
import { generateRoadmapData, getRandomSubset, DOMAIN_CURRICULA, getFallbackModules } from '../services/roadmapEngine.js';
import { getMockUser } from './authController.js';

// In-Memory Backup Store for Roadmap operations when MongoDB is offline
export const memoryRoadmaps = [];

// @desc    Generate personalized roadmap
// @route   POST /api/roadmaps/generate
// @access  Private
export const generateRoadmap = async (req, res) => {
  const { domain, careerGoal, skillLevel, dailyStudyTime, interests, existingSkills } = req.body;
  const userId = req.user._id;

  if (!domain || !careerGoal || !skillLevel || !dailyStudyTime) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    // Generate roadmap structure using our rule engine
    const roadmapParams = { domain, careerGoal, skillLevel, dailyStudyTime, interests, existingSkills };
    const roadmapTemplate = generateRoadmapData(roadmapParams);
    
    // Assign user ownership
    roadmapTemplate.user = userId;

    let savedRoadmap;
    try {
      // Delete old roadmap for this user if it exists to maintain one roadmap per user
      await Roadmap.deleteMany({ user: userId });
      savedRoadmap = await Roadmap.create(roadmapTemplate);
    } catch (err) {
      console.log('⚠️ DB write failed in generateRoadmap, simulating in-memory storage');
      
      // Simulate MongoDB document creation
      const mockId = 'rdm_' + Math.random().toString(36).substr(2, 9);
      savedRoadmap = {
        _id: mockId,
        ...roadmapTemplate,
        createdAt: new Date()
      };

      // Remove any prior mock roadmap for this user
      const prevIndex = memoryRoadmaps.findIndex(r => r.user.toString() === userId.toString());
      if (prevIndex !== -1) {
        memoryRoadmaps.splice(prevIndex, 1);
      }
      
      memoryRoadmaps.push(savedRoadmap);
    }

    res.status(201).json(savedRoadmap);

  } catch (error) {
    console.error(`Roadmap generation error: ${error.message}`);
    res.status(500).json({ message: 'Server error generating roadmap' });
  }
};

// @desc    Get user's current active roadmap
// @route   GET /api/roadmaps/me
// @access  Private
export const getMyRoadmap = async (req, res) => {
  const userId = req.user._id;

  try {
    let roadmap;
    try {
      roadmap = await Roadmap.findOne({ user: userId });
    } catch (err) {
      console.log('⚠️ DB find failed in getMyRoadmap, reading memory store');
    }

    if (!roadmap) {
      roadmap = memoryRoadmaps.find(r => r.user.toString() === userId.toString());
    }

    if (!roadmap) {
      return res.status(404).json({ message: 'No active roadmap found. Please generate one.' });
    }

    res.json(roadmap);
  } catch (error) {
    console.error(`Get roadmap error: ${error.message}`);
    res.status(500).json({ message: 'Server error fetching roadmap data' });
  }
};

// @desc    Toggle task completion state (Complete / Incomplete)
// @route   POST /api/roadmaps/:id/tasks/toggle
// @access  Private
export const toggleTaskCompletion = async (req, res) => {
  const { id: roadmapId } = req.params;
  const { moduleId, taskId } = req.body;
  const userId = req.user._id;

  if (!moduleId || !taskId) {
    return res.status(400).json({ message: 'Module ID and Task ID are required' });
  }

  try {
    let roadmap;
    let isInMemory = false;

    try {
      roadmap = await Roadmap.findById(roadmapId);
    } catch (err) {
      console.log('⚠️ DB find failed on toggle, using memory store');
    }

    if (!roadmap) {
      roadmap = memoryRoadmaps.find(r => r._id.toString() === roadmapId);
      isInMemory = true;
    }

    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    // Double check ownership
    if (roadmap.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to modify this roadmap' });
    }

    // Locate module and task
    const moduleItem = roadmap.modules.find(m => m.id === moduleId);
    if (!moduleItem) {
      return res.status(404).json({ message: 'Module not found in roadmap' });
    }

    const taskItem = moduleItem.tasks.find(t => t.id === taskId);
    if (!taskItem) {
      return res.status(404).json({ message: 'Task not found in module' });
    }

    // Toggle completion state
    taskItem.completed = !taskItem.completed;

    // Recalculate global completion progress metrics
    let totalTasks = 0;
    let completedTasks = 0;

    roadmap.modules.forEach(m => {
      m.tasks.forEach(t => {
        totalTasks++;
        if (t.completed) completedTasks++;
      });
    });

    roadmap.progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    roadmap.completedTasksCount = completedTasks;

    // Save changes
    if (isInMemory) {
      const idx = memoryRoadmaps.findIndex(r => r._id.toString() === roadmapId);
      memoryRoadmaps[idx] = roadmap;
    } else {
      await roadmap.save();
    }

    // Proactively increment user's daily study streak on completing tasks!
    try {
      const now = new Date();
      const user = await User.findById(userId);
      if (user) {
        const lastActive = new Date(user.lastActive);
        const timeDiff = now.getTime() - lastActive.getTime();
        const oneDay = 24 * 60 * 60 * 1000;
        
        if (timeDiff > oneDay && timeDiff < oneDay * 2) {
          user.streak += 1;
        } else if (timeDiff >= oneDay * 2) {
          user.streak = 1;
        } else if (user.streak === 0) {
          user.streak = 1;
        }
        
        user.lastActive = now;
        await user.save();
      }
    } catch (streakErr) {
      console.log('⚠️ DB update failed for user streak, skipping profile update');
    }

    res.json(roadmap);

  } catch (error) {
    console.error(`Toggle task error: ${error.message}`);
    res.status(500).json({ message: 'Server error modifying task state' });
  }
};

// @desc    Submit module timed quiz score & perform Adaptive Adjustments
// @route   POST /api/roadmaps/:id/quizzes/submit
// @access  Private
export const submitQuizScore = async (req, res) => {
  const { id: roadmapId } = req.params;
  const { moduleId, answers } = req.body; // array of indexes: [1, 0, 2, 3, 0]
  const userId = req.user._id;

  if (!moduleId || !answers || !Array.isArray(answers)) {
    return res.status(400).json({ message: 'Missing parameters or invalid answers list' });
  }

  try {
    let roadmap;
    let isInMemory = false;

    try {
      roadmap = await Roadmap.findById(roadmapId);
    } catch (err) {
      console.log('⚠️ DB find failed on quiz submit, checking memory');
    }

    if (!roadmap) {
      roadmap = memoryRoadmaps.find(r => r._id.toString() === roadmapId);
      isInMemory = true;
    }

    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    const moduleItem = roadmap.modules.find(m => m.id === moduleId);
    if (!moduleItem) {
      return res.status(404).json({ message: 'Module not found in this roadmap' });
    }

    // Grade the 5 quiz questions
    let score = 0;
    const questions = moduleItem.quizzes;
    const feedbackList = [];
    const missedConcepts = [];

    questions.forEach((q, idx) => {
      const userAns = answers[idx];
      const correctAns = q.correctAnswer;
      const isCorrect = userAns === correctAns;

      if (isCorrect) {
        score++;
      } else {
        // Collect question topic details as a weak area
        missedConcepts.push(q.question.split(' ')[0] + ' ' + q.question.split(' ')[1] + ' topics');
        feedbackList.push({
          questionIndex: idx,
          yourAnswer: q.options[userAns] || 'Skipped',
          correctAnswer: q.options[correctAns],
          explanation: q.explanation
        });
      }
    });

    // Persist score inside the timeline module
    moduleItem.quizScore = score;

    // Performance Tracking: Adaptive adjustments & feedback
    // If user scores less than 4 out of 5 (below 80%), identify weak areas and append a customized review task!
    let recommendationUpdate = 'Performance matches requirements. Keep it up!';
    let roadmapAdjusted = false;

    if (score < 4) {
      roadmapAdjusted = true;
      recommendationUpdate = `Adaptive Engine: Identified weak understanding. Injected helpful review resources and a diagnostic review task inside this module to reinforce these skills.`;

      // 1. Add to roadmap's weak areas list
      missedConcepts.forEach(c => {
        if (!roadmap.weakAreas.includes(c)) {
          roadmap.weakAreas.push(c);
        }
      });

      // 2. Dynamic roadmap task adjustment: Inject custom review subtask if not already there
      const reviewTaskId = `${moduleId}_rev_task`;
      const alreadyHasReview = moduleItem.tasks.some(t => t.id === reviewTaskId);

      if (!alreadyHasReview) {
        const reviewTask = {
          id: reviewTaskId,
          title: `[Adaptive Review] Reinforce understanding on missed Quiz topics: ${missedConcepts.join(', ')}`,
          completed: false,
          difficulty: 'beginner',
          learningResources: [
            { title: 'Interactive concept exercises and MDN document references', url: 'https://developer.mozilla.org', type: 'article' },
            { title: 'SkillPath Guided Concept Crash Course', url: 'https://youtube.com', type: 'video' }
          ]
        };
        moduleItem.tasks.push(reviewTask);
      }
    } else {
      // If user scores exceptionally well, remove previous adaptive review task for this module
      const reviewIndex = moduleItem.tasks.findIndex(t => t.id === `${moduleId}_rev_task`);
      if (reviewIndex !== -1) {
        moduleItem.tasks.splice(reviewIndex, 1);
        roadmapAdjusted = true;
        recommendationUpdate = `Adaptive Engine: High proficiency demonstrated! Removed previous review exercises. Excellent work!`;
      }
    }

    // Save roadmap adjustments
    if (isInMemory) {
      const idx = memoryRoadmaps.findIndex(r => r._id.toString() === roadmapId);
      memoryRoadmaps[idx] = roadmap;
    } else {
      await roadmap.save();
    }

    res.json({
      score,
      totalQuestions: questions.length,
      passed: score >= 4,
      feedback: feedbackList,
      weakAreasDetected: missedConcepts,
      recommendationUpdate,
      roadmapAdjusted,
      roadmap // return adjusted roadmap to instantly update the UI state
    });

  } catch (error) {
    console.error(`Submit quiz error: ${error.message}`);
    res.status(500).json({ message: 'Server error processing quiz evaluation' });
  }
};

// @desc    Refresh/regenerate randomized quiz questions for a module
// @route   POST /api/roadmaps/:id/modules/:moduleId/quizzes/refresh
// @access  Private
export const refreshModuleQuiz = async (req, res) => {
  const roadmapId = req.params.id;
  const { moduleId } = req.params;

  try {
    let roadmap;
    let isInMemory = false;

    try {
      roadmap = await Roadmap.findById(roadmapId);
    } catch (dbErr) {
      console.log('⚠️ DB query failed for roadmap update during quiz refresh');
    }

    if (!roadmap) {
      roadmap = memoryRoadmaps.find(r => r._id.toString() === roadmapId);
      isInMemory = true;
    }

    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    const moduleItem = roadmap.modules.find(m => m.id === moduleId);
    if (!moduleItem) {
      return res.status(404).json({ message: 'Module not found in this roadmap' });
    }

    // Determine the master pool of questions for this module
    const domainCurriculum = DOMAIN_CURRICULA[roadmap.domain] || getFallbackModules(roadmap.domain);
    const originalModuleTemplate = domainCurriculum.find(m => m.id.toLowerCase() === moduleId.split('_interest')[0].toLowerCase() || m.title === moduleItem.title);

    let masterPool = [];
    if (originalModuleTemplate && originalModuleTemplate.quizzes) {
      masterPool = originalModuleTemplate.quizzes;
    } else {
      const fallbackCurriculum = getFallbackModules(roadmap.domain);
      masterPool = fallbackCurriculum[0].quizzes;
    }

    // Generate 5 new randomized questions from our pool of 10+
    const newQuizzes = getRandomSubset(masterPool, 5);
    moduleItem.quizzes = newQuizzes;
    moduleItem.quizScore = -1; // Reset score to allow re-assessment

    // Save changes
    if (isInMemory) {
      const idx = memoryRoadmaps.findIndex(r => r._id.toString() === roadmapId);
      if (idx !== -1) memoryRoadmaps[idx] = roadmap;
    } else {
      await roadmap.save();
    }

    console.log(`🔄 Dynamic Quiz regenerated for Module: ${moduleItem.title}. Accessing fresh randomized MCQ pool!`);

    res.json({
      message: 'Dynamic quiz questions regenerated successfully!',
      roadmap
    });

  } catch (error) {
    console.error(`Refresh module quiz error: ${error.message}`);
    res.status(500).json({ message: 'Server error regenerating quiz questions' });
  }
};
