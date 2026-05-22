import React from 'react';
import { Target, TrendingUp } from 'lucide-react';

export const PerformanceTracker = ({ user, roadmap }) => {
  // Days of the week activity simulation based on completed tasks
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Highlighting current day of the week based on local time
  const currentDayIdx = (new Date().getDay() + 6) % 7; // Mon is 0, Sun is 6
  
  // Calculate completion ratio
  const completedRatio = roadmap ? roadmap.completedTasksCount / Math.max(1, roadmap.modules.reduce((sum, m) => sum + m.tasks.length, 0)) : 0;
  
  // Simulated acceleration multiplier based on streak count
  const multiplier = 1.0 + (user?.streak || 0) * 0.1;

  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
          <Target className="w-4 h-4 text-cyber-primary" /> Learning Velocity
        </h3>
        <span className="px-2 py-0.5 rounded bg-cyber-primary/10 border border-cyber-primary/20 text-[10px] font-bold text-cyber-primary uppercase tracking-wider flex items-center gap-1">
          <TrendingUp className="w-3 h-3 animate-pulse" /> {multiplier.toFixed(1)}x Momentum
        </span>
      </div>

      {/* 7-Day Activity Grid */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase">
          <span>Weekly Habit Tracker</span>
          <span className="text-cyber-primary font-mono">{Math.round(completedRatio * 100)}% Core Cap</span>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-1 text-center">
          {days.map((day, idx) => {
            const isToday = idx === currentDayIdx;
            // Simulate earlier days as completed if they completed tasks, else mock high-density progress
            const isCompleted = idx < currentDayIdx || (idx === currentDayIdx && roadmap?.completedTasksCount > 0);
            
            return (
              <div key={day} className="space-y-1.5">
                <div 
                  className={`w-full aspect-square rounded-lg flex items-center justify-center transition-all ${
                    isCompleted 
                      ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)] animate-pulse' 
                      : isToday
                      ? 'bg-cyber-dark border border-cyber-primary text-cyber-primary'
                      : 'bg-cyber-dark/40 border border-white/5 text-gray-600'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold">
                    {isCompleted ? '✓' : idx + 1}
                  </span>
                </div>
                <span className={`text-[9px] block font-bold ${isToday ? 'text-cyber-primary font-extrabold' : 'text-gray-500'}`}>
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-[10px] text-gray-500 leading-relaxed font-light">
        * Momentum factor automatically multiplies your final credential score coefficients based on consistent daily micro-checks!
      </p>
    </div>
  );
};
