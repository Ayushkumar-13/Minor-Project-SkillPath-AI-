import React, { useState } from 'react';
import { Sparkles, Play, ExternalLink, Github, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

export const TimelineItem = ({ 
  mod, 
  index, 
  isActive, 
  isFinalModule, 
  onToggleModule, 
  onToggleTask, 
  onLaunchQuiz,
  onVerifyRepo,
  gitLoadingModuleId,
  gitMessageModuleId,
  gitStatusModuleId
}) => {
  const [localRepoUrl, setLocalRepoUrl] = useState('');

  // Calculate completed tasks
  const completedTasks = mod.tasks.filter(t => t.completed).length;
  const progressVal = mod.tasks.length > 0 ? Math.round((completedTasks / mod.tasks.length) * 100) : 0;

  // Workflow states
  const quizDone = mod.quizScore !== undefined && mod.quizScore >= 0;
  const quizPassed = mod.quizScore >= 4;
  const isVerified = mod.repoVerified === true;

  const isCurrentLoading = gitLoadingModuleId === mod.id;

  const handleSubmitGit = (e) => {
    e.preventDefault();
    if (!localRepoUrl) return;
    onVerifyRepo(localRepoUrl, mod.id);
  };

  return (
    <div className="relative animate-fadeIn">
      {/* Glowing vertical connector line */}
      {!isFinalModule && (
        <div className="absolute left-7 top-14 bottom-0 w-0.5 bg-gradient-to-b from-cyber-primary/40 to-transparent pointer-events-none"></div>
      )}

      <div className={`glass-panel rounded-2xl border transition-all ${
        isActive 
          ? 'border-cyber-primary/30 shadow-[0_0_25px_rgba(6,182,212,0.1)] bg-[#0B1224]/85' 
          : 'border-white/5 hover:border-white/10'
      }`}>
        
        {/* Module Title Click Area */}
        <div 
          onClick={onToggleModule}
          className="p-5 flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
              isActive 
                ? 'bg-cyber-primary text-cyber-dark shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                : 'bg-cyber-dark border border-white/10 text-gray-400'
            }`}>
              {index + 1}
            </div>
            <div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                {mod.durationDays} Days Duration
              </span>
              <h3 className="text-base font-black text-white mt-0.5 flex items-center gap-2">
                {mod.title}
                {isVerified && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10B981]" title="Practical Completed!" />
                )}
              </h3>
            </div>
          </div>

          {/* Collapsed view status bar */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end gap-1">
              <span className="text-[10px] text-gray-400 font-bold">{progressVal}% Done</span>
              <div className="w-20 bg-cyber-dark h-1.5 rounded-full overflow-hidden border border-white/5">
                <div className="bg-cyber-primary h-full rounded-full transition-all duration-500" style={{ width: `${progressVal}%` }}></div>
              </div>
            </div>
            <span className="text-xs text-gray-500 font-extrabold">{isActive ? '▲' : '▼'}</span>
          </div>
        </div>

        {/* Expanded Content Drawer */}
        {isActive && (
          <div className="px-5 pb-5 pt-1 border-t border-white/5 space-y-5 animate-fadeIn">
            <p className="text-xs text-gray-400 font-light leading-relaxed">{mod.description}</p>
            
            {/* Checklist */}
            <div className="space-y-2.5">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Tasks & Exercises</span>
              <div className="space-y-2">
                {mod.tasks.map(task => (
                  <div 
                    key={task.id}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all duration-300 ${
                      task.completed 
                        ? 'bg-cyber-primary/5 border-cyber-primary/20 text-gray-300 shadow-[inset_0_0_12px_rgba(6,182,212,0.02)]' 
                        : 'bg-cyber-dark/40 border-white/5 text-gray-100 hover:bg-cyber-dark/60'
                    }`}
                  >
                    <input 
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => onToggleTask(mod.id, task.id)}
                      className="w-4.5 h-4.5 rounded border-white/20 text-cyber-primary bg-cyber-dark focus:ring-0 focus:ring-offset-0 cursor-pointer mt-0.5"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-bold leading-normal">{task.title}</span>
                      
                      {/* Learning resources inside checklist item */}
                      {task.learningResources && task.learningResources.length > 0 && (
                        <div className="flex gap-3 mt-1.5">
                          {task.learningResources.map((res, rIdx) => (
                            <a 
                              key={rIdx}
                              href={res.url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] text-cyber-primary font-bold hover:underline"
                            >
                              {res.title || 'Source'} <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                      task.difficulty === 'advanced' 
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                        : task.difficulty === 'intermediate' 
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                        : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    }`}>
                      {task.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* INTEGRATED DYNAMIC THEORY-TO-PRACTICE WORKFLOW */}
            <div className="pt-3 border-t border-white/5 space-y-4">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">
                Credential Workflow Progression
              </span>

              {/* STAGE 1: CONCEPT TIMED QUIZ */}
              {!quizDone ? (
                <div className="p-4 rounded-xl bg-gradient-to-r from-cyber-primary/10 via-cyber-secondary/5 to-transparent border border-cyber-primary/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-cyber-primary animate-bounce" /> Stage 1: Theory Assessment
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Prerequisite: Score 80%+ to unlock the practical deliverable portal.
                    </p>
                  </div>
                  <button
                    onClick={() => onLaunchQuiz(mod)}
                    className="px-4 py-2.5 rounded-lg bg-cyber-primary text-cyber-dark font-black text-xs hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-1.5 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-cyber-dark" /> Start Concept Quiz
                  </button>
                </div>
              ) : (
                
                /* STAGE 1 LOGGED: THEORY COMPLETED */
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#091C28]/80 border border-emerald-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Stage 1: Theory Verified</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          Achieved Score: <span className="text-emerald-400 font-bold">{mod.quizScore} / 5</span> ({Math.round((mod.quizScore/5)*100)}%)
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => onLaunchQuiz(mod)}
                      className="px-2.5 py-1.5 rounded border border-white/5 text-[10px] text-gray-400 hover:text-white bg-cyber-dark/40"
                    >
                      Review Answers
                    </button>
                  </div>

                  {/* STAGE 2: PRACTICAL PROJECT DELIVERABLE */}
                  {quizPassed ? (
                    <div className="p-5 rounded-2xl bg-cyber-dark/40 border border-white/5 space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-cyber-primary/10 text-cyber-primary">
                          <Github className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">Stage 2: Practical Coding Deliverable</h4>
                          <span className="text-[9px] text-cyber-primary uppercase tracking-widest font-black">
                            Hands-On Application
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                        Implement your coding skills! Build an application incorporating this module's topics, commit the files to a public GitHub repository, and submit the URL below.
                      </p>

                      {isVerified ? (
                        /* GORGEOUS VERIFIED RADIAL GLOW SUCCESS CARD */
                        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/30 space-y-2 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                            <CheckCircle2 className="w-4 h-4" /> 
                            <span>Practical Project Submission Verified</span>
                          </div>
                          <p className="text-[10px] text-gray-400 leading-normal">
                            Our AI scanning engine has confirmed file activity and parsed the language matrix. The final reward task has been checked off!
                          </p>
                        </div>
                      ) : (
                        /* INLINE SUBMISSION FORM */
                        <form onSubmit={handleSubmitGit} className="space-y-3">
                          <div className="flex flex-col sm:flex-row gap-2">
                            <input 
                              type="url"
                              value={localRepoUrl}
                              onChange={(e) => setLocalRepoUrl(e.target.value)}
                              placeholder="https://github.com/username/repository"
                              className="flex-1 bg-cyber-dark border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyber-primary/60"
                              required
                              disabled={isCurrentLoading}
                            />
                            <button
                              type="submit"
                              disabled={isCurrentLoading}
                              className="px-5 py-2.5 rounded-xl bg-cyber-primary text-cyber-dark font-black text-xs hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50 flex items-center justify-center gap-1.5 transition-all"
                            >
                              {isCurrentLoading ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                'Verify Codebase'
                              )}
                            </button>
                          </div>

                          {/* Dynamic Module Scoped Message Logging */}
                          {gitMessageModuleId && gitLoadingModuleId === mod.id && (
                            <div className={`p-3 rounded-lg text-[10px] font-mono leading-relaxed border ${
                              gitStatusModuleId === 'verified'
                                ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400'
                                : gitStatusModuleId === 'empty'
                                ? 'bg-amber-500/5 border-amber-500/10 text-amber-400'
                                : 'bg-red-500/5 border-red-500/10 text-red-400'
                            }`}>
                              &gt; {gitMessageModuleId}
                            </div>
                          )}
                        </form>
                      )}
                    </div>
                  ) : (
                    /* QUIZ ATTEMPTED BUT SCORE IS UNDER 80% */
                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[11px] text-amber-400/90 leading-relaxed flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Theory Threshold Lock:</span> You scored below the required 80% passing grade in the conceptual quiz. Retake the assessment and achieve 4/5 or higher to unlock the Stage 2 Practical GitHub Submission drawer!
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
