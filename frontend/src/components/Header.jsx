import React from 'react';
import { Cpu, Flame, LogOut } from 'lucide-react';

export const Header = ({ user, onLogout, onNavigate }) => {
  return (
    <header className="border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center glass-panel sticky top-0 z-40">
      <div 
        onClick={() => onNavigate('landing')} 
        className="flex items-center gap-2 cursor-pointer hover:opacity-90"
      >
        <div className="p-1.5 rounded-lg bg-gradient-to-tr from-cyber-primary to-cyber-secondary">
          <Cpu className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-sm tracking-wider text-white">
          SKILLPATH <span className="text-cyber-primary">AI</span>
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyber-card border border-white/5">
          <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
          <span className="text-xs font-bold text-white tracking-widest">
            {user?.streak || 0} STREAK
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-cyber-primary/20 border border-cyber-primary flex items-center justify-center text-xs font-extrabold text-cyber-primary">
            {user?.name?.charAt(0) || 'D'}
          </div>
          <span className="text-xs font-bold text-gray-300">{user?.name || 'Developer'}</span>
        </div>

        <button 
          onClick={onLogout}
          className="p-2.5 rounded-xl border border-white/5 hover:border-red-500/30 text-gray-400 hover:text-red-400 bg-cyber-dark/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all"
          title="Log Out Session"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
