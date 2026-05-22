import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Sparkles, Compass, Cpu, Target, ArrowRight } from 'lucide-react';

export const Landing = ({ onNavigate }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="relative min-h-screen tech-grid overflow-hidden flex flex-col items-center">
      {/* Absolute floating cyber glowing particles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px] animate-pulse-slow"></div>

      {/* Main Container */}
      <div className="w-full max-w-6xl px-6 py-8 flex-1 flex flex-col justify-between z-10">
        
        {/* Navigation Bar */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyber-primary to-cyber-secondary border border-white/20 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-wider text-white">
              SKILLPATH <span className="text-cyber-primary font-black">AI</span>
            </span>
          </div>
          <div className="flex gap-4">
            {user ? (
              <button 
                onClick={() => onNavigate('dashboard')} 
                className="px-5 py-2.5 rounded-xl border border-cyber-primary/40 text-cyber-primary font-medium glass-panel hover:bg-cyber-primary/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button 
                  onClick={() => onNavigate('login')}
                  className="px-5 py-2.5 rounded-xl text-gray-400 font-medium hover:text-white transition-colors"
                >
                  Log In
                </button>
                <button 
                  onClick={() => onNavigate('signup')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95 transition-transform"
                >
                  Get Started Free
                </button>
              </>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col lg:flex-row items-center gap-12 my-12">
          
          {/* Left Text content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-primary/30 bg-cyber-primary/5 text-cyber-primary text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" /> Next-Gen AI Learning Platforms
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white">
              Forge Your Career Path <br />
              With <span className="bg-gradient-to-r from-cyber-primary via-violet-400 to-cyber-secondary bg-clip-text text-transparent text-glow-cyan">Adaptive AI</span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Don't study generic courses. Generate fully structured, hyper-personalized learning roadmaps based on your skill levels, study times, interests, and career goals.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
              <button 
                onClick={() => onNavigate(user ? 'wizard' : 'signup')}
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white font-black shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-3"
              >
                Generate Roadmap Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => {
                  const target = document.getElementById('features');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-2xl border border-white/10 glass-panel hover:bg-white/5 text-gray-300 font-bold hover:text-white transition-all"
              >
                Learn How It Works
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="flex justify-center lg:justify-start gap-12 pt-8 border-t border-white/5">
              <div>
                <p className="text-3xl font-black text-white">98%</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mt-1">Goal Success Rate</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">5+</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mt-1">Core Tech Domains</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">20K+</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mt-1">Roadmaps Created</p>
              </div>
            </div>
          </div>

          {/* Right Preview Card */}
          <div className="flex-1 relative w-full max-w-lg">
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-cyber-primary to-cyber-secondary opacity-30 blur-lg animate-pulse"></div>
            <div className="relative glass-panel rounded-3xl p-6 border border-white/15 overflow-hidden">
              {/* Header inside Preview */}
              <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">Active Schema</span>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-cyber-primary" /> MERN AI Career Blueprint
                  </h4>
                </div>
                <div className="px-2.5 py-1 rounded bg-cyber-primary/10 text-cyber-primary border border-cyber-primary/20 text-xs font-bold">
                  Intermediate
                </div>
              </div>

              {/* Progress visual */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-400">Roadmap Completion</span>
                  <span className="text-cyber-primary">64%</span>
                </div>
                <div className="w-full bg-cyber-dark/80 h-2.5 rounded-full overflow-hidden border border-white/5">
                  <div className="bg-gradient-to-r from-cyber-primary to-cyber-secondary h-full rounded-full w-[64%] shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                </div>
              </div>

              {/* Simulated timeline items */}
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-cyber-primary/20 border border-cyber-primary flex items-center justify-center text-xs font-bold text-cyber-primary mt-1 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Frontend Foundations</h5>
                    <p className="text-xs text-gray-500 mt-0.5">Semantic markup, responsive Flexbox layouts</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-cyber-secondary/20 border border-cyber-secondary flex items-center justify-center text-xs font-bold text-cyber-secondary mt-1 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">React.js Single Page Applications</h5>
                    <p className="text-xs text-gray-500 mt-0.5">Functional components, states, useState Hooks</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-cyber-dark border border-white/20 flex items-center justify-center text-xs font-bold text-gray-500 mt-1">
                    3
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-400">Node/Express Backend API</h5>
                    <p className="text-xs text-gray-600 mt-0.5">REST architectures, custom Express middleware</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Feature section */}
        <section id="features" className="py-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 glass-panel rounded-2xl border border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyber-primary/10 flex items-center justify-center text-cyber-primary border border-cyber-primary/20">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Rule-based AI roadmaps</h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              We compile highly complex learning trees tailored by skill tiers, available study hours, specific goals, and personal interests.
            </p>
          </div>
          <div className="p-6 glass-panel rounded-2xl border border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyber-secondary/10 flex items-center justify-center text-cyber-secondary border border-cyber-secondary/20">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Adaptive Quiz Engine</h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Take 5 dynamic multiple-choice timed quizzes. Scoring low dynamically alters your roadmap tree to append diagnostic study tasks.
            </p>
          </div>
          <div className="p-6 glass-panel rounded-2xl border border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyber-accent/10 flex items-center justify-center text-cyber-accent border border-cyber-accent/20">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">GitHub Project Verification</h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Submit your GitHub repository. The application parses existence, scans for code presence, validates details, and updates your checklist as rewards.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};
