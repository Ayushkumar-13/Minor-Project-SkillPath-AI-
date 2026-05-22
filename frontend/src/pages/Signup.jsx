import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Lock, Mail, User, Cpu, Eye, EyeOff, Loader2 } from 'lucide-react';

export const Signup = ({ onNavigate }) => {
  const { signup, isOfflineMode } = useContext(AuthContext);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrMessage('All fields are mandatory.');
      return;
    }
    if (password.length < 6) {
      setErrMessage('Password must be at least 6 characters.');
      return;
    }
    
    setLoading(true);
    setErrMessage('');
    
    try {
      await signup(name, email, password);
      onNavigate('wizard'); // Direct to wizard onboarding
    } catch (err) {
      setErrMessage(err.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen tech-grid flex items-center justify-center p-6 overflow-hidden">
      {/* Background radial cyan glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none"></div>
      
      {/* Card outer container */}
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyber-primary to-cyber-secondary opacity-20 blur-md"></div>
        <div className="relative glass-panel rounded-3xl p-8 border border-white/10">
          
          {/* Header logo */}
          <div className="flex flex-col items-center mb-6">
            <div 
              onClick={() => onNavigate('landing')}
              className="p-3 rounded-2xl bg-gradient-to-tr from-cyber-primary to-cyber-secondary border border-white/20 shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer hover:scale-105 transition-transform"
            >
              <Cpu className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-black mt-4 text-white tracking-wide">
              CREATE YOUR <span className="text-cyber-primary">ACCOUNT</span>
            </h2>
            <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">Join SkillPath AI and start your personalized journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isOfflineMode && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 leading-relaxed text-center">
                💡 Backend server offline. Simulating profile registration client-side.
              </div>
            )}

            {errMessage && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 text-center font-medium">
                ⚠️ {errMessage}
              </div>
            )}

            {/* Operator Name */}
            <div className="space-y-1">
              <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <User className="w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-cyber-dark/80 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-primary/70 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-cyber-dark/80 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-primary/70 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-cyber-dark/80 border border-white/10 rounded-xl py-3 pl-11 pr-11 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-primary/70 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Register button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyber-primary to-cyber-secondary hover:brightness-110 text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50 flex items-center justify-center gap-2 transition-all mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4.5 h-4.5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Redirection link */}
          <div className="mt-6 pt-5 border-t border-white/5 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <button 
              onClick={() => onNavigate('login')}
              className="text-cyber-primary font-bold hover:underline"
            >
              Sign In
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
