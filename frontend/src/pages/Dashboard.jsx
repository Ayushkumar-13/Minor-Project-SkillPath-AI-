import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { RoadmapContext } from '../context/RoadmapContext';

// Import Modular Components
import { Header } from '../components/Header';
import { RadialProgress } from '../components/RadialProgress';
import { StatsCard } from '../components/StatsCard';
import { WeakAreas } from '../components/WeakAreas';
import { TimelineItem } from '../components/TimelineItem';
import { QuizModal } from '../components/QuizModal';
import { RepoModal } from '../components/RepoModal';
import { PerformanceTracker } from '../components/PerformanceTracker';

// Lucide & Loader Icons
import { Flame, CheckSquare, Github, BookOpen, Loader2 } from 'lucide-react';

export const Dashboard = ({ onNavigate }) => {
  const { user, logout } = useContext(AuthContext);
  const { roadmap, loading, toggleTask, submitQuiz, submitGithubRepo, getMyRoadmap, refreshQuiz } = useContext(RoadmapContext);

  const [activeModule, setActiveModule] = useState(null);
  
  // Timed Quiz States
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizModule, setQuizModule] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { qIndex: optionIndex }
  const [quizTimer, setQuizTimer] = useState(60);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);

  // GitHub Validation States
  const [gitOpen, setGitOpen] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [gitLoading, setGitLoading] = useState(false);
  const [gitMessage, setGitMessage] = useState('');
  const [gitStatus, setGitStatus] = useState(null); // 'verified' | 'empty' | 'error'

  // Module Scoped GitHub Verification States
  const [gitLoadingModuleId, setGitLoadingModuleId] = useState(null);
  const [gitMessageModuleId, setGitMessageModuleId] = useState('');
  const [gitStatusModuleId, setGitStatusModuleId] = useState(null);

  // Load first module as active by default on launch
  useEffect(() => {
    if (roadmap && roadmap.modules && roadmap.modules.length > 0 && !activeModule) {
      setActiveModule(roadmap.modules[0].id);
    }
  }, [roadmap]);

  // Assessment Quiz Timer Countdown Loop
  useEffect(() => {
    let interval = null;
    if (quizOpen && !quizSubmitted && quizTimer > 0) {
      interval = setInterval(() => {
        setQuizTimer(prev => prev - 1);
      }, 1000);
    } else if (quizTimer === 0 && !quizSubmitted) {
      handleQuizSubmit();
    }
    return () => clearInterval(interval);
  }, [quizOpen, quizTimer, quizSubmitted]);

  // Event Trigger Launchers
  const launchQuiz = (mod) => {
    setQuizModule(mod);
    setSelectedAnswers({});
    setQuizTimer(60);
    setQuizSubmitted(false);
    setQuizResult(null);
    setQuizOpen(true);
  };

  const handleQuizSelectAnswer = (qIndex, optionIndex) => {
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleQuizSubmit = async () => {
    if (!quizModule) return;
    setQuizLoading(true);

    const answersArray = quizModule.quizzes.map((_, idx) => 
      selectedAnswers[idx] !== undefined ? selectedAnswers[idx] : -1
    );

    try {
      const result = await submitQuiz(quizModule.id, answersArray);
      setQuizResult(result);
      setQuizSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Error grading quiz.');
    } finally {
      setQuizLoading(false);
    }
  };

  const handleQuizRetake = async () => {
    if (!quizModule) return;
    setQuizLoading(true);
    setQuizSubmitted(false);
    setQuizResult(null);

    try {
      // Dynamic Mastery: Fetch a completely new randomized set of 5 MCQs
      const updatedRoadmap = await refreshQuiz(quizModule.id);
      if (updatedRoadmap) {
        const freshMod = updatedRoadmap.modules.find(m => m.id === quizModule.id);
        if (freshMod) {
          launchQuiz(freshMod);
        }
      }
    } catch (err) {
      console.error('Failed regenerating fresh quiz pool:', err);
      launchQuiz(quizModule);
    } finally {
      setQuizLoading(false);
    }
  };

  const handleQuizClose = () => {
    setQuizOpen(false);
    getMyRoadmap(); // Refresh active timeline elements
  };

  const handleGitSubmit = async (e) => {
    e.preventDefault();
    if (!repoUrl) return;

    setGitLoading(true);
    setGitMessage('');
    setGitStatus(null);

    try {
      const res = await submitGithubRepo(repoUrl);
      if (res.success) {
        if (res.submission.status === 'verified') {
          setGitStatus('verified');
          setGitMessage(`Verified: ${res.submission.repoOwner}/${res.submission.repoName} is live and active! Main stack detected: ${res.submission.languages?.join(', ') || 'N/A'}. A core timeline task was completed as a reward!`);
        } else {
          setGitStatus('empty');
          setGitMessage(`Flagged: Repository validated but detected as EMPTY. Please add some code files (e.g. index.js, HTML files) to get credit!`);
        }
      } else {
        setGitStatus('error');
        setGitMessage(res.message);
      }
    } catch (err) {
      setGitStatus('error');
      setGitMessage('Connection timed out. Please check repository URL.');
    } finally {
      setGitLoading(false);
    }
  };

  const handleGitVerifyModule = async (url, moduleId) => {
    setGitLoadingModuleId(moduleId);
    setGitMessageModuleId('🤖 SkillPath AI: Scanning public GitHub repository...');
    setGitStatusModuleId(null);

    try {
      const res = await submitGithubRepo(url, moduleId);
      if (res.success) {
        if (res.submission.status === 'verified') {
          setGitStatusModuleId('verified');
          setGitMessageModuleId(`Success: Verified ${res.submission.repoOwner}/${res.submission.repoName} is active! Tech stacks: ${res.submission.languages?.join(', ') || 'N/A'}. Checked off the final project milestone!`);
        } else {
          setGitStatusModuleId('empty');
          setGitMessageModuleId(`Warning: Repository validated but detected as EMPTY. Please add some code files (e.g. index.js, HTML) to pass verification!`);
        }
      } else {
        setGitStatusModuleId('error');
        setGitMessageModuleId(`Failed: ${res.message}`);
      }
      getMyRoadmap(); // Refresh active timeline elements
    } catch (err) {
      setGitStatusModuleId('error');
      setGitMessageModuleId('Error: Connection timed out. Make sure your repository is public.');
    }
  };

  if (loading && !roadmap) {
    return (
      <div className="min-h-screen bg-cyber-bg flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 text-cyber-primary animate-spin mx-auto" />
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            Accessing Career Blueprints...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden pb-16">
      
      {/* Dynamic space background radial mesh */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-l from-cyber-primary/5 to-transparent blur-[120px] pointer-events-none"></div>

      {/* Cyber Header Navigation */}
      <Header user={user} onLogout={() => { logout(); onNavigate('landing'); }} onNavigate={onNavigate} />

      {/* Main Workspace Frame */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: OVERVIEW STATS COMMAND CENTER */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Operative Welcome Greetings */}
          <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-3">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Neural Core Online</span>
            <h2 className="text-2xl font-black text-white leading-tight">
              Hello, <span className="bg-gradient-to-r from-cyber-primary to-cyber-secondary bg-clip-text text-transparent">{user?.name || 'Developer'}</span>
            </h2>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Welcome back. Your customized roadmap is computed and fully responsive. Complete tasks, submit quizzes, and submit code to update values.
            </p>
          </div>

          {/* Radial Circular Progress Gauge */}
          {roadmap && (
            <RadialProgress progress={roadmap.progress} completedCount={roadmap.completedTasksCount} />
          )}

          <div className="grid grid-cols-2 gap-4">
            <StatsCard 
              title="Streak" 
              value={`${user?.streak || 0} 🔥`} 
              label="Consecutive Days" 
              icon={Flame} 
              iconColor="text-orange-400"
              accentColor="border-orange-400/40"
            />
            <StatsCard 
              title="Tasks" 
              value={roadmap ? roadmap.completedTasksCount : 0} 
              label="Completed Items" 
              icon={CheckSquare} 
              iconColor="text-cyber-secondary"
              accentColor="border-cyber-secondary/40"
            />
          </div>

          {/* Dynamic Learning Velocity and Streak Multiplier Tracker */}
          <PerformanceTracker user={user} roadmap={roadmap} />

          {/* Dynamic Diagnostic Weak Areas Tags */}
          <WeakAreas weakAreas={roadmap?.weakAreas} />

          {/* Repository Submit Verification Actions */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
              <Github className="w-4 h-4 text-cyber-primary" /> Repository Center
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Submit your project repository below to test validations and unlock progression accelerators.
            </p>
            <button
              onClick={() => { setGitMessage(''); setRepoUrl(''); setGitStatus(null); setGitOpen(true); }}
              className="w-full py-3 rounded-xl bg-cyber-dark/80 hover:bg-cyber-dark border border-white/10 hover:border-cyber-primary/40 text-xs font-bold text-gray-200 hover:text-white flex items-center justify-center gap-2 transition-all"
            >
              <Github className="w-4 h-4" /> Verify Repository Code
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: TIMELINE TREE & RESOURCE DRAWER */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Blueprint stats bar */}
          {roadmap ? (
            <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">Active Curriculum Blueprint</span>
                  <h2 className="text-lg font-black text-white mt-0.5">{roadmap.domain} Personalized Path</h2>
                  <p className="text-xs text-gray-400 font-light mt-1">Goal: {roadmap.careerGoal}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <span className="px-3 py-1 rounded bg-cyber-primary/10 border border-cyber-primary/20 text-cyber-primary text-xs font-bold capitalize">
                    {roadmap.skillLevel}
                  </span>
                  <span className="px-3 py-1 rounded bg-cyber-secondary/10 border border-cyber-secondary/20 text-cyber-secondary text-xs font-bold uppercase">
                    {roadmap.dailyStudyTime} Hrs/Day
                  </span>
                </div>
              </div>
              {/* Overall Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-gray-500 uppercase tracking-wider">Overall Progress</span>
                  <span className="text-cyber-primary">{roadmap.progress || 0}% Complete · {roadmap.modules?.length || 0} Modules</span>
                </div>
                <div className="w-full bg-cyber-dark/80 h-2 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-cyber-primary to-cyber-secondary shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all duration-700"
                    style={{ width: `${roadmap.progress || 0}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-8 border border-white/5 text-center space-y-4">
              <BookOpen className="w-12 h-12 text-gray-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No active roadmaps found</h3>
              <p className="text-sm text-gray-500 font-light">Generate a brand new career path now using our AI setup wizard.</p>
              <button 
                onClick={() => onNavigate('wizard')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white font-bold"
              >
                Launch Onboarding Wizard
              </button>
            </div>
          )}

          {/* Interactive Timeline Tree looping */}
          {roadmap && roadmap.modules && (
            <div className="space-y-4">
              {roadmap.modules.map((mod, index) => (
                <TimelineItem 
                  key={mod.id}
                  mod={mod}
                  index={index}
                  isActive={activeModule === mod.id}
                  isFinalModule={index === roadmap.modules.length - 1}
                  onToggleModule={() => setActiveModule(activeModule === mod.id ? null : mod.id)}
                  onToggleTask={toggleTask}
                  onLaunchQuiz={launchQuiz}
                  onVerifyRepo={handleGitVerifyModule}
                  gitLoadingModuleId={gitLoadingModuleId}
                  gitMessageModuleId={gitMessageModuleId}
                  gitStatusModuleId={gitStatusModuleId}
                />
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Interactive Assessment Timed Quiz Overlay Drawer */}
      <QuizModal 
        isOpen={quizOpen}
        quizModule={quizModule}
        onClose={handleQuizClose}
        selectedAnswers={selectedAnswers}
        onSelectAnswer={handleQuizSelectAnswer}
        quizTimer={quizTimer}
        quizSubmitted={quizSubmitted}
        quizResult={quizResult}
        quizLoading={quizLoading}
        onSubmitQuiz={handleQuizSubmit}
        onRetakeQuiz={handleQuizRetake}
      />

      {/* Repository Checker Overlay Drawer */}
      <RepoModal 
        isOpen={gitOpen}
        onClose={() => setGitOpen(false)}
        repoUrl={repoUrl}
        onChangeRepoUrl={setRepoUrl}
        gitLoading={gitLoading}
        gitMessage={gitMessage}
        gitStatus={gitStatus}
        onSubmitGit={handleGitSubmit}
      />

    </div>
  );
};
