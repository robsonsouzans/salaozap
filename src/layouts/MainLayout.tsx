
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { NavBar } from '@/components/NavBar';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
  paddingBottom?: boolean;
}

export function MainLayout({ 
  children, 
  className, 
  paddingBottom = true 
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'container max-w-md mx-auto px-4 py-6',
          paddingBottom && 'pb-24',
          className
        )}
      >
        {children}
      </motion.main>
      <NavBar />
    </div>
  );
}
