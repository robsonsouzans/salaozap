
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { NavBar } from '@/components/NavBar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
  paddingBottom?: boolean;
  hideNavBar?: boolean;
}

export function MainLayout({ 
  children, 
  className, 
  paddingBottom = true,
  hideNavBar = false
}: MainLayoutProps) {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen bg-background">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'container mx-auto px-4 py-6',
          'sm:max-w-md md:max-w-lg lg:max-w-xl',
          paddingBottom && 'pb-24',
          className
        )}
      >
        {children}
      </motion.main>
      {isAuthenticated && !hideNavBar && <NavBar />}
    </div>
  );
}
