import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const RoadmapContext = createContext();

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

// Replicate localized curriculum generator for absolute client-side offline robustness
const OFFLINE_CURRICULA = {
  MERN: [
    {
      id: 'mern_mod_1',
      title: 'Frontend Foundations (HTML, CSS, Modern JS)',
      description: 'Master standard semantic HTML5 structures, responsive Flexbox/Grid CSS grids, and modern ES6 asynchronous logic.',
      durationDays: 6,
      tasks: [
        { id: 'mern_t_1', title: 'Learn semantic HTML5 elements and SEO-friendly structures', completed: false, difficulty: 'beginner', learningResources: [{ title: 'MDN Semantics Guide', url: 'https://developer.mozilla.org' }] },
        { id: 'mern_t_2', title: 'Build a responsive Flexbox & CSS Grid portfolio layout', completed: false, difficulty: 'beginner', learningResources: [{ title: 'CSS Tricks Grid Guide', url: 'https://css-tricks.com' }] },
        { id: 'mern_t_3', title: 'Understand ES6 features (Destructuring, Arrow functions, Promises)', completed: false, difficulty: 'intermediate', learningResources: [{ title: 'JavaScript.info Guide', url: 'https://javascript.info' }] },
        { id: 'mern_t_4', title: 'Create an event-driven web counter with localStorage state persistence', completed: false, difficulty: 'intermediate', learningResources: [{ title: 'Wes Bos JS30', url: 'https://javascript30.com' }] }
      ],
      quizzes: [
        { id: 'm1_q1', question: 'Which HTML5 element represents self-contained, independent composition?', options: ['<section>', '<article>', '<div>', '<aside>'], correctAnswer: 1, explanation: 'The <article> represents a complete self-contained composition.' },
        { id: 'm1_q2', question: 'What is the correct grid-template-columns value to create 3 equal fluid columns?', options: ['repeat(3, 1fr)', '3fr 3fr 3fr', 'repeat(3, 33%)', '1fr 1fr 1fr 100px'], correctAnswer: 0, explanation: 'repeat(3, 1fr) is clean and standard.' },
        { id: 'm1_q3', question: 'Which JS Array method returns a new array with all elements that pass a test?', options: ['map()', 'forEach()', 'filter()', 'reduce()'], correctAnswer: 2, explanation: 'filter() is used to filter down arrays.' },
        { id: 'm1_q4', question: 'What does a Promise state change from PENDING to resolved mean?', options: ['Fulfilled', 'Rejected', 'Settled', 'Completed'], correctAnswer: 0, explanation: 'It means the promise has been successfully Fulfilled.' },
        { id: 'm1_q5', question: 'How do you store an object in localStorage?', options: ['localStorage.setItem("key", obj)', 'localStorage.setItem("key", JSON.stringify(obj))', 'localStorage.setObject("key", obj)', 'localStorage.store(obj)'], correctAnswer: 1, explanation: 'Serialize objects into strings using JSON.stringify.' }
      ]
    },
    {
      id: 'mern_mod_2',
      title: 'React.js SPA Development',
      description: 'Deep dive into React functional components, hooks state management, and client-side routing.',
      durationDays: 8,
      tasks: [
        { id: 'mern_t_5', title: 'Initialize a React SPA using Vite, configuring custom Tailwind styles', completed: false, difficulty: 'beginner', learningResources: [{ title: 'Vite Getting Started', url: 'https://vitejs.dev' }] },
        { id: 'mern_t_6', title: 'Master useState, useEffect, and custom modular hook creation', completed: false, difficulty: 'intermediate', learningResources: [{ title: 'React Hooks Ref', url: 'https://react.dev' }] },
        { id: 'mern_t_7', title: 'Implement dynamic SPA client-side routing using React Router v6', completed: false, difficulty: 'intermediate', learningResources: [{ title: 'React Router Tutorial', url: 'https://reactrouter.com' }] },
        { id: 'mern_t_8', title: 'Manage complex user inputs and client-side form validations safely', completed: false, difficulty: 'intermediate', learningResources: [{ title: 'React Hook Form', url: 'https://react-hook-form.com' }] }
      ],
      quizzes: [
        { id: 'm2_q1', question: 'Which React Hook is used to perform side effects in components?', options: ['useState', 'useReducer', 'useCallback', 'useEffect'], correctAnswer: 3, explanation: 'useEffect handles component synchronization side effects.' },
        { id: 'm2_q2', question: 'What is a critical rule regarding React Hook execution?', options: ['Must be in loops', 'Must be called at the top level of your component', 'Must be inside nested structures', 'Run asynchronously'], correctAnswer: 1, explanation: 'Declare hooks at the top level of React functions.' },
        { id: 'm2_q3', question: 'In React Router v6, how do you declare a dynamic URL parameter route?', options: ['path="user/:id"', 'path="user/id"', 'path="user?id"', 'path="user/param"'], correctAnswer: 0, explanation: 'Use a colon prefix for dynamic path parameters.' },
        { id: 'm2_q4', question: 'What is the purpose of passing a dependency array to the useEffect hook?', options: ['Execute on all rerenders', 'Restrict execution to only when specified values change', 'Secure keys', 'Bind state'], correctAnswer: 1, explanation: 'Allows limiting execution to specific dependency shifts.' },
        { id: 'm2_q5', question: 'What optimization does React.memo perform?', options: ['Saves to local storage', 'Memoizes state variables', 'Skips component re-renders if props are unchanged', 'Validates form states'], correctAnswer: 2, explanation: 'React.memo optimizes functional components by skipping render cycles if props match.' }
      ]
    }
  ],
  DSA: [
    {
      id: 'dsa_mod_1',
      title: 'Complexity & Linear Structures (Arrays & Lists)',
      description: 'Master Big-O asymptotic notations, array manipulations, and linked list structures.',
      durationDays: 7,
      tasks: [
        { id: 'dsa_t_1', title: 'Analyze time complexity (Big-O) of basic search and sorting', completed: false, difficulty: 'beginner', learningResources: [{ title: 'Big-O Sheet', url: 'https://bigocheatsheet.com' }] },
        { id: 'dsa_t_2', title: 'Implement insertions and reverses on a singly linked list', completed: false, difficulty: 'intermediate', learningResources: [{ title: 'Linked List Tutorial', url: 'https://geeksforgeeks.org' }] }
      ],
      quizzes: [
        { id: 'dsa_q1', question: 'What is the search time complexity inside an unsorted array?', options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'], correctAnswer: 2, explanation: 'O(N) search time because you must scan the entire sequence in worst-case.' }
      ]
    }
  ]
};

export const RoadmapProvider = ({ children }) => {
  const { user, isOfflineMode, refreshProfile } = useContext(AuthContext);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch roadmap on user mount or change
  useEffect(() => {
    if (user) {
      getMyRoadmap();
    } else {
      setRoadmap(null);
    }
  }, [user]);

  // Load client offline roadmaps from storage if offline mode
  const getMyRoadmap = async () => {
    setLoading(true);
    setError(null);

    if (isOfflineMode || !localStorage.getItem('skillpath_token')) {
      const stored = localStorage.getItem(`skillpath_roadmap_${user?._id || 'guest'}`);
      if (stored) {
        setRoadmap(JSON.parse(stored));
      } else {
        setRoadmap(null);
      }
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('skillpath_token');
      const response = await fetch(`${API_BASE}/roadmaps/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        setRoadmap(data);
      } else {
        setRoadmap(null);
        setError(data.message);
      }
    } catch (err) {
      console.log('Failed fetching live roadmap, attempting local storage check');
      const stored = localStorage.getItem(`skillpath_roadmap_${user?._id || 'guest'}`);
      if (stored) setRoadmap(JSON.parse(stored));
    } finally {
      setLoading(false);
    }
  };

  // @desc    Generate a brand new personalized roadmap
  const generateRoadmap = async (params) => {
    setLoading(true);
    setError(null);

    if (isOfflineMode) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const { domain, careerGoal, skillLevel, dailyStudyTime, interests = [], existingSkills = [] } = params;
          
          // Pull template or build a fallback modular list
          const baseModules = OFFLINE_CURRICULA[domain] || [
            {
              id: `${domain.toLowerCase()}_mod_1`,
              title: `${domain} Foundations & CLI Setup`,
              description: `Get started with compilation and environment packages for ${domain}.`,
              durationDays: Math.ceil(5 * (2 / Math.max(0.5, dailyStudyTime))),
              tasks: [
                { id: `${domain.toLowerCase()}_t_1`, title: 'Install required packages and verify CLI setup', completed: false, difficulty: 'beginner', learningResources: [{ title: 'Guides', url: 'https://google.com' }] },
                { id: `${domain.toLowerCase()}_t_2`, title: 'Compile and launch a standard Hello World test file', completed: false, difficulty: 'beginner', learningResources: [{ title: 'CLI Check', url: 'https://google.com' }] }
              ],
              quizzes: [
                { id: 'q_off_1', question: 'What is the main value of setup validations?', options: ['Writing tests', 'Confirming local environments run code correctly', 'Securing tokens', 'Deploying cloud files'], correctAnswer: 1, explanation: 'Guarantees execution environments function.' }
              ]
            }
          ];

          // Adapt based on parameter triggers
          const adaptedModules = JSON.parse(JSON.stringify(baseModules));
          let preCompleted = 0;
          let totalTasks = 0;

          adaptedModules.forEach(mod => {
            mod.tasks.forEach(t => {
              totalTasks++;
              // If skill level is advanced, flag tasks
              if (skillLevel === 'advanced') {
                t.title = `[Advanced Integration] ${t.title} (Hardened)`;
              }

              // Auto-check existing skills
              const hasSkill = existingSkills.some(skill => 
                t.title.toLowerCase().includes(skill.toLowerCase()) || 
                mod.title.toLowerCase().includes(skill.toLowerCase())
              );
              if (hasSkill) {
                t.completed = true;
                preCompleted++;
              }
            });

            // Appending primary interest project challenge
            if (interests.length > 0) {
              mod.tasks.push({
                id: `${mod.id}_interest_challenge`,
                title: `Design custom ${interests[0]}-themed utility demonstrating module concepts`,
                completed: false,
                difficulty: skillLevel,
                learningResources: [{ title: `${interests[0]} Project Idea`, url: 'https://github.com' }]
              });
              totalTasks++;
            }
          });

          const mockRoadmap = {
            _id: 'mock_rdm_' + Math.random().toString(36).substr(2, 9),
            user: user?._id || 'guest',
            domain,
            careerGoal,
            skillLevel,
            dailyStudyTime,
            interests,
            existingSkills,
            progress: totalTasks > 0 ? Math.round((preCompleted / totalTasks) * 100) : 0,
            completedTasksCount: preCompleted,
            weakAreas: [],
            modules: adaptedModules,
            createdAt: new Date().toISOString()
          };

          localStorage.setItem(`skillpath_roadmap_${user?._id || 'guest'}`, JSON.stringify(mockRoadmap));
          setRoadmap(mockRoadmap);
          setLoading(false);
          resolve(mockRoadmap);
        }, 1500);
      });
    }

    try {
      const token = localStorage.getItem('skillpath_token');
      const response = await fetch(`${API_BASE}/roadmaps/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(params)
      });
      const data = await response.json();

      if (response.ok) {
        setRoadmap(data);
        localStorage.setItem(`skillpath_roadmap_${user?._id}`, JSON.stringify(data));
        return data;
      } else {
        throw new Error(data.message || 'Generation failed');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // @desc    Toggle checklist item completion
  const toggleTask = async (moduleId, taskId) => {
    if (!roadmap) return;

    if (isOfflineMode) {
      const updated = { ...roadmap };
      const mod = updated.modules.find(m => m.id === moduleId);
      const task = mod.tasks.find(t => t.id === taskId);
      task.completed = !task.completed;

      // Recalculate
      let total = 0;
      let completed = 0;
      updated.modules.forEach(m => {
        m.tasks.forEach(t => {
          total++;
          if (t.completed) completed++;
        });
      });

      updated.progress = Math.round((completed / total) * 100);
      updated.completedTasksCount = completed;

      setRoadmap(updated);
      localStorage.setItem(`skillpath_roadmap_${user?._id || 'guest'}`, JSON.stringify(updated));
      return;
    }

    try {
      const token = localStorage.getItem('skillpath_token');
      const response = await fetch(`${API_BASE}/roadmaps/${roadmap._id}/tasks/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ moduleId, taskId })
      });
      const data = await response.json();
      if (response.ok) {
        setRoadmap(data);
        localStorage.setItem(`skillpath_roadmap_${user?._id}`, JSON.stringify(data));
        refreshProfile();
      }
    } catch (err) {
      console.log('Failed submitting live toggle, updating locally');
      // local fallback
    }
  };

  // @desc    Grade dynamic module quiz and apply adaptive changes
  const submitQuiz = async (moduleId, answers) => {
    if (!roadmap) return;

    if (isOfflineMode) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const updated = { ...roadmap };
          const mod = updated.modules.find(m => m.id === moduleId);
          const questions = mod.quizzes;

          let score = 0;
          const feedback = [];
          const missed = [];

          questions.forEach((q, idx) => {
            const isCorrect = answers[idx] === q.correctAnswer;
            if (isCorrect) {
              score++;
            } else {
              const weakTopic = q.question.split(' ')[0] + ' topics';
              missed.push(weakTopic);
              feedback.push({
                questionIndex: idx,
                yourAnswer: q.options[answers[idx]] || 'Skipped',
                correctAnswer: q.options[q.correctAnswer],
                explanation: q.explanation
              });
            }
          });

          let recommendationUpdate = 'Proficiency verified. Keep going!';
          let roadmapAdjusted = false;

          if (score < 4) {
            roadmapAdjusted = true;
            recommendationUpdate = `Adaptive Engine: Identified areas of improvement. Injected a conceptual review task inside this module to solidify these skills.`;
            
            // Add weak areas
            missed.forEach(c => {
              if (!updated.weakAreas.includes(c)) updated.weakAreas.push(c);
            });

            // Insert review task
            const reviewId = `${moduleId}_rev_task`;
            if (!mod.tasks.some(t => t.id === reviewId)) {
              mod.tasks.push({
                id: reviewId,
                title: `[Adaptive Review] Reinforce understanding on: ${missed.join(', ')}`,
                completed: false,
                difficulty: 'beginner',
                learningResources: [{ title: 'SkillPath Diagnostic References', url: 'https://developer.mozilla.org' }]
              });
            }
          }

          // Persist the quiz score inside the timeline module
          mod.quizScore = score;

          // Recalculate progress in case task count changes
          let total = 0;
          let completed = 0;
          updated.modules.forEach(m => {
            m.tasks.forEach(t => {
              total++;
              if (t.completed) completed++;
            });
          });
          updated.progress = Math.round((completed / total) * 100);
          updated.completedTasksCount = completed;

          setRoadmap(updated);
          localStorage.setItem(`skillpath_roadmap_${user?._id || 'guest'}`, JSON.stringify(updated));
          
          resolve({
            score,
            totalQuestions: questions.length,
            passed: score >= 4,
            feedback,
            weakAreasDetected: missed,
            recommendationUpdate,
            roadmapAdjusted
          });
        }, 1000);
      });
    }

    try {
      const token = localStorage.getItem('skillpath_token');
      const response = await fetch(`${API_BASE}/roadmaps/${roadmap._id}/quizzes/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ moduleId, answers })
      });
      const data = await response.json();
      if (response.ok) {
        setRoadmap(data.roadmap);
        localStorage.setItem(`skillpath_roadmap_${user?._id}`, JSON.stringify(data.roadmap));
        return data;
      } else {
        throw new Error(data.message || 'Quiz submission failed');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // @desc    Submit GitHub repository for verification (scoped by module)
  const submitGithubRepo = async (repoUrl, moduleId) => {
    if (!roadmap) return;

    if (isOfflineMode) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const githubPattern = /^(https?:\/\/)?(www\.)?github\.com\/([a-zA-Z0-9-_]+)\/([a-zA-Z0-9-_.]+)\/?$/;
          const match = repoUrl.trim().match(githubPattern);

          if (!match) {
            resolve({
              success: false,
              message: 'Invalid GitHub URL format. Use standard: https://github.com/owner/repo'
            });
            return;
          }

          const owner = match[3];
          const repo = match[4].replace(/\.git$/, '');
          const isEmpty = repo.toLowerCase().includes('empty') || repo.toLowerCase() === 'test';

          if (isEmpty) {
            resolve({
              success: true,
              message: 'GitHub repository validated but flagged as empty.',
              submission: { repoOwner: owner, repoName: repo, isValid: true, isEmpty: true, status: 'empty' }
            });
          } else {
            // Reward: Auto-complete final challenge task in Specified module if verified!
            const updated = { ...roadmap };
            const mod = updated.modules.find(m => m.id === moduleId);
            if (mod) {
              mod.repoVerified = true;
              if (mod.tasks.length > 0) {
                const finalTask = mod.tasks[mod.tasks.length - 1];
                finalTask.completed = true;
              }
              
              let total = 0;
              let completed = 0;
              updated.modules.forEach(m => {
                m.tasks.forEach(t => {
                  total++;
                  if (t.completed) completed++;
                });
              });
              updated.progress = Math.round((completed / total) * 100);
              updated.completedTasksCount = completed;

              setRoadmap(updated);
              localStorage.setItem(`skillpath_roadmap_${user?._id || 'guest'}`, JSON.stringify(updated));
            }

            resolve({
              success: true,
              message: 'GitHub repository validated and verified successfully! Scoped reward activated.',
              submission: { repoOwner: owner, repoName: repo, isValid: true, isEmpty: false, status: 'verified', languages: ['JavaScript', 'HTML'] }
            });
          }
        }, 1200);
      });
    }

    try {
      const token = localStorage.getItem('skillpath_token');
      const response = await fetch(`${API_BASE}/github/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ roadmapId: roadmap._id, repoUrl, moduleId })
      });
      const data = await response.json();

      if (response.ok) {
        // Complete the final task as reward
        const updated = { ...roadmap };
        if (data.submission.status === 'verified') {
          const mod = updated.modules.find(m => m.id === moduleId);
          if (mod) {
            mod.repoVerified = true;
            const lastTask = mod.tasks[mod.tasks.length - 1];
            if (lastTask && !lastTask.completed) {
              lastTask.completed = true;
            }
            // recalculate progress
            let total = 0;
            let completed = 0;
            updated.modules.forEach(m => {
              m.tasks.forEach(t => {
                total++;
                if (t.completed) completed++;
              });
            });
            updated.progress = Math.round((completed / total) * 100);
            updated.completedTasksCount = completed;
            setRoadmap(updated);
            localStorage.setItem(`skillpath_roadmap_${user?._id}`, JSON.stringify(updated));
          }
        }
        return { success: true, message: data.message, submission: data.submission };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      return { success: false, message: 'Server unreachable. Verification failed.' };
    }
  };

  // @desc    Regenerate a brand new randomized quiz question set for a module (mastery reattempt)
  const refreshQuiz = async (moduleId) => {
    if (!roadmap) return;

    if (isOfflineMode) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const updated = { ...roadmap };
          const mod = updated.modules.find(m => m.id === moduleId);
          
          if (mod) {
            // Retrieve fallback question pool from local storage templates
            const baseCurriculum = OFFLINE_CURRICULA[roadmap.domain] || [];
            const originalModuleTemplate = baseCurriculum.find(m => m.id.toLowerCase() === moduleId.split('_interest')[0].toLowerCase() || m.title === mod.title);

            let masterPool = [];
            if (originalModuleTemplate && originalModuleTemplate.quizzes) {
              masterPool = originalModuleTemplate.quizzes;
            } else {
              // General default offline lists
              masterPool = mod.quizzes || [
                { id: 'q_off_1', question: 'What is the main value of setup validations?', options: ['Writing tests', 'Confirming local environments run code correctly', 'Securing tokens', 'Deploying cloud files'], correctAnswer: 1, explanation: 'Guarantees execution environments function.' }
              ];
            }

            // Shuffle and pick 5 randomized questions
            const shuffled = [...masterPool].sort(() => 0.5 - Math.random());
            mod.quizzes = shuffled.slice(0, 5);
            mod.quizScore = -1; // Reset score

            setRoadmap(updated);
            localStorage.setItem(`skillpath_roadmap_${user?._id || 'guest'}`, JSON.stringify(updated));
            resolve(updated);
          }
        }, 800);
      });
    }

    try {
      const token = localStorage.getItem('skillpath_token');
      const response = await fetch(`${API_BASE}/roadmaps/${roadmap._id}/modules/${moduleId}/quizzes/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        setRoadmap(data.roadmap);
        localStorage.setItem(`skillpath_roadmap_${user?._id}`, JSON.stringify(data.roadmap));
        return data.roadmap;
      } else {
        throw new Error(data.message || 'Quiz refresh failed');
      }
    } catch (err) {
      console.error('Quiz refresh failure:', err.message);
      throw err;
    }
  };

  return (
    <RoadmapContext.Provider value={{ roadmap, loading, error, generateRoadmap, getMyRoadmap, toggleTask, submitQuiz, submitGithubRepo, refreshQuiz }}>
      {children}
    </RoadmapContext.Provider>
  );
};
