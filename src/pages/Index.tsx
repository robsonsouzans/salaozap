
import React, { useState, useEffect } from 'react';
import { SplashScreen } from '@/components/SplashScreen';
import { AuthScreen } from '@/components/AuthScreen';
import { Dashboard } from '@/components/Dashboard';
import { MainLayout } from '@/layouts/MainLayout';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // For demo purposes, after splash screen, show auth screen
  // In a real app, you would check if the user is already authenticated
  const handleSplashFinished = () => {
    setShowSplash(false);
    
    // For demo purposes only - auto login after 10 seconds if not authenticated
    if (!isAuthenticated) {
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 10000);
    }
  };

  // Skip splash screen on subsequent visits (demo)
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setShowSplash(false);
    } else {
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  if (showSplash) {
    return <SplashScreen onFinished={handleSplashFinished} />;
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <MainLayout>
      <Dashboard userName="Maria" />
    </MainLayout>
  );
};

export default Index;
