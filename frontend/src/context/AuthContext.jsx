import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('skillpath_user');
    const storedToken = localStorage.getItem('skillpath_token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    
    // Quick test if API backend is available
    const checkBackend = async () => {
      try {
        const res = await fetch(`${API_BASE.replace('/api', '')}/`);
        if (res.ok) {
          console.log('🚀 Backend API server is online. Integration mode activated.');
          setIsOfflineMode(false);
        } else {
          throw new Error('Offline status');
        }
      } catch (err) {
        console.log('💡 Backend API server offline or unreachable. Activating local simulator fallback mode.');
        setIsOfflineMode(true);
      } finally {
        setLoading(false);
      }
    };

    checkBackend();
  }, []);

  // @desc    Register a new user
  const signup = async (name, email, password) => {
    setError(null);
    setLoading(true);

    if (isOfflineMode) {
      // Simulate client registration
      return new Promise((resolve) => {
        setTimeout(() => {
          const simulatedUser = {
            _id: 'mock_usr_' + Math.random().toString(36).substr(2, 9),
            name,
            email: email.toLowerCase(),
            streak: 1,
            lastActive: new Date().toISOString()
          };
          
          localStorage.setItem('skillpath_user', JSON.stringify(simulatedUser));
          localStorage.setItem('skillpath_token', 'mock_jwt_token_12345');
          setUser(simulatedUser);
          setLoading(false);
          resolve(simulatedUser);
        }, 1000);
      });
    }

    try {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      localStorage.setItem('skillpath_user', JSON.stringify(data));
      localStorage.setItem('skillpath_token', data.token);
      setUser(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // @desc    Authenticate and Login user
  const login = async (email, password) => {
    setError(null);
    setLoading(true);

    if (isOfflineMode) {
      // Simulate client verification
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Check local simulated store or create an instant mock user
          const mockUser = {
            _id: 'mock_usr_developer',
            name: 'Professional Developer',
            email: email.toLowerCase(),
            streak: 3,
            lastActive: new Date().toISOString()
          };

          localStorage.setItem('skillpath_user', JSON.stringify(mockUser));
          localStorage.setItem('skillpath_token', 'mock_jwt_token_12345');
          setUser(mockUser);
          setLoading(false);
          resolve(mockUser);
        }, 800);
      });
    }

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('skillpath_user', JSON.stringify(data));
      localStorage.setItem('skillpath_token', data.token);
      setUser(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // @desc    Logout user
  const logout = () => {
    localStorage.removeItem('skillpath_user');
    localStorage.removeItem('skillpath_token');
    setUser(null);
    setError(null);
  };

  // Refresh profile details (e.g. to pull updated streaks)
  const refreshProfile = async () => {
    if (isOfflineMode || !user) return;
    try {
      const token = localStorage.getItem('skillpath_token');
      const response = await fetch(`${API_BASE}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        localStorage.setItem('skillpath_user', JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.log('Could not update live user profile state');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, isOfflineMode, signup, login, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
