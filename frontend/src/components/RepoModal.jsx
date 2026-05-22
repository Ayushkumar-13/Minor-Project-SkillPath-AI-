import React from 'react';
import { Loader2, X, Github, CheckCircle2, AlertTriangle } from 'lucide-react';

export const RepoModal = ({
  isOpen,
  onClose,
  repoUrl,
  onChangeRepoUrl,
  gitLoading,
  gitMessage,
  gitStatus,
  onSubmitGit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-cyber-dark/85 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-md glass-panel border border-cyber-primary/20 rounded-3xl p-6 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-cyber-primary/10 border border-cyber-primary/20 text-cyber-primary">
            <Github className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-white">GitHub Code Verification</h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">
              Validate Project Deliverables
            </p>
          </div>
        </div>

        <form onSubmit={onSubmitGit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">
              Public Repository URL
            </label>
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => onChangeRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="w-full bg-cyber-dark/85 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyber-primary/70"
              required
            />
          </div>

          {/* Validation Logs */}
          {gitMessage && (
            <div className={`p-4 rounded-xl text-xs font-mono leading-relaxed border ${
              gitStatus === 'verified' 
                ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400' 
                : gitStatus === 'empty' 
                ? 'bg-amber-500/5 border-amber-500/10 text-amber-400'
                : 'bg-red-500/5 border-red-500/10 text-red-400'
            }`}>
              {gitStatus === 'verified' && <CheckCircle2 className="w-4 h-4 text-emerald-400 mb-1" />}
              {gitStatus === 'empty' && <AlertTriangle className="w-4 h-4 text-amber-400 mb-1" />}
              &gt; {gitMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={gitLoading}
            className="w-full bg-gradient-to-r from-cyber-primary to-cyber-secondary hover:brightness-110 text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.2)] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {gitLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Querying Codebase...
              </>
            ) : (
              'Synchronize & Verify Repository'
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
