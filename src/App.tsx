import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { DoctorAuthPage } from './components/DoctorAuthPage';
import { Dashboard } from './components/Dashboard';
import { PatientsPage } from './components/PatientsPage';
import { RecordsPage } from './components/RecordsPage';
import { DietPage } from './components/DietPage';
import { ConsultationsPage } from './components/ConsultationsPage';
// import { AnalyticsPage } from './components/AnalyticsPage';
import { SettingsPage } from './components/SettingsPage';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('digieVaidya-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }

    // Check authentication status
    const authStatus = localStorage.getItem('digieVaidya-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('digieVaidya-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('digieVaidya-auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('digieVaidya-auth');
    setCurrentPage('dashboard');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <PatientsPage />;
      case 'records':
        return <RecordsPage />;
      case 'diets':
        return <DietPage />;
      case 'consultations':
        return <ConsultationsPage />;
      // case 'analytics':
      //   return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <DoctorAuthPage onLogin={handleLogin} />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onLogout={handleLogout}
      />
      
      <motion.main 
        key={currentPage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="pt-16 pb-20"
      >
        {renderCurrentPage()}
      </motion.main>

      <Footer />
      <Toaster />
    </div>
  );
}