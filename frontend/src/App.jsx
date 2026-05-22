import React, { useState, useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { RoadmapProvider } from './context/RoadmapContext';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Wizard } from './pages/Wizard';
import { Dashboard } from './pages/Dashboard';

const AppContent = () => {
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState('landing');

  // Simple, ultra-stable state-based routing controller
  const navigate = (page) => {
    const isAuthenticated = user || localStorage.getItem('skillpath_token');
    
    // Session Guarding: Block dashboard/wizard if unauthenticated
    if ((page === 'dashboard' || page === 'wizard') && !isAuthenticated) {
      setCurrentPage('login');
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-bg text-gray-100 selection:bg-cyber-primary selection:text-cyber-dark">
      {currentPage === 'landing' && <Landing onNavigate={navigate} />}
      {currentPage === 'login' && <Login onNavigate={navigate} />}
      {currentPage === 'signup' && <Signup onNavigate={navigate} />}
      {currentPage === 'wizard' && <Wizard onNavigate={navigate} />}
      {currentPage === 'dashboard' && <Dashboard onNavigate={navigate} />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <RoadmapProvider>
        <AppContent />
      </RoadmapProvider>
    </AuthProvider>
  );
}

export default App;
