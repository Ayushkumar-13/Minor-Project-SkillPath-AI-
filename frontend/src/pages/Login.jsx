import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Lock, Mail, Cpu, Eye, EyeOff, Loader2 } from 'lucide-react';

export const Login = ({ onNavigate }) => {
  const { login, isOfflineMode } = useContext(AuthContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrMessage('Please enter both email and password.');
      return;
    }
    
    setLoading(true);
    setErrMessage('');
    
    try {
      await login(email, password);
      onNavigate('dashboard');
    } catch (err) {
      setErrMessage(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen tech-grid flex items-center justify-center p-6 overflow-hidden">
      {/* Background ambient glow bubbles */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none"></div>
      
      {/* Card wrapper */}
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyber-primary to-cyber-secondary opacity-20 blur-md"></div>
        <div className="relative glass-panel rounded-3xl p-8 border border-white/10">
          
          {/* Logo header */}
          <div className="flex flex-col items-center mb-8">
            <div 
              onClick={() => onNavigate('landing')}
              className="p-3 rounded-2xl bg-gradient-to-tr from-cyber-primary to-cyber-secondary border border-white/20 shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer hover:scale-105 transition-transform"
            >
              <Cpu className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-black mt-4 text-white tracking-wide">
              WELCOME BACK <span className="text-cyber-primary">OPERATIVE</span>
            </h2>
            <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">Identify to synchronize profile</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {isOfflineMode && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 leading-relaxed text-center">
                💡 Backend server offline. Simulating validation locally. Enter any password.
              </div>
            )}

            {errMessage && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 text-center font-medium">
                ⚠️ {errMessage}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Email Address</label>
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

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Access Cipher</label>
              </div>
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyber-primary to-cyber-secondary hover:brightness-110 text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50 flex items-center justify-center gap-2 transition-all mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4.5 h-4.5 animate-spin" />
                  Verifying Identity...
                </>
              ) : (
                'Synchronize Session'
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center text-sm text-gray-500">
            Need an active license?{' '}
            <button 
              onClick={() => onNavigate('signup')}
              className="text-cyber-primary font-bold hover:underline"
            >
              Request Access
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
