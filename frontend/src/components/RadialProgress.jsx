import React from 'react';

export const RadialProgress = ({ progress, completedCount }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="glass-panel-glow-cyan rounded-2xl p-6 border border-cyber-primary/20 flex items-center gap-6 relative overflow-hidden">
      <div className="relative flex-shrink-0">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle cx="48" cy="48" r={radius} className="stroke-cyber-dark fill-transparent" strokeWidth="8" />
          <circle 
            cx="48" 
            cy="48" 
            r={radius} 
            className="stroke-cyber-primary fill-transparent transition-all duration-1000 ease-out" 
            strokeWidth="8" 
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-lg font-black text-white">{progress}%</span>
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-[10px] text-cyber-primary uppercase tracking-widest font-black">Completion Value</span>
        <h4 className="font-bold text-white text-base">Roadmap Progress</h4>
        <p className="text-xs text-gray-400 font-light leading-relaxed">{completedCount} Subtasks Complete</p>
      </div>
    </div>
  );
};
