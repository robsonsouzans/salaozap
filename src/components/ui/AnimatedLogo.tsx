
import React from 'react';
import { Scissors } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function AnimatedLogo({ 
  className, 
  variant = 'dark', 
  size = 'md', 
  animated = true 
}: AnimatedLogoProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };
  
  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32
  };

  return (
    <div className={cn(
      'flex items-center justify-center gap-2',
      animated && 'animate-logo-reveal',
      sizeClasses[size],
      variant === 'dark' ? 'text-primary' : 'text-white',
      className
    )}>
      <Scissors 
        size={iconSizes[size]} 
        className={cn(
          'inline-block',
          animated && 'animate-spin-slow'
        )} 
      />
      <span className="font-display font-semibold tracking-tight">
        Salão<span className="text-indigo-600 font-bold">Zap</span>
      </span>
    </div>
  );
}
