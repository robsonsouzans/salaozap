
import React, { useState, useEffect } from 'react';
import { SplashScreen } from '@/components/SplashScreen';
import { AuthScreen } from '@/components/AuthScreen';
import { Dashboard } from '@/components/Dashboard';
import { MainLayout } from '@/layouts/MainLayout';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { isAuthenticated, user } = useAuth();

  // For demo purposes, show splash screen only on first visit
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setShowSplash(false);
    } else {
      sessionStorage.setItem('hasVisited', 'true');
      
      // Hide splash screen after 2.5 seconds
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  if (showSplash) {
    return <SplashScreen onFinished={() => setShowSplash(false)} />;
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <MainLayout>
      <Dashboard userName={user?.name?.split(' ')[0] || 'Usuário'} />
    </MainLayout>
  );
};

export default Index;
