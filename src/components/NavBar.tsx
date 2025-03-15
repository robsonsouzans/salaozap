
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Home,
  Calendar,
  User,
  Search,
  PlusCircle
} from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Início', path: '/' },
  { icon: Search, label: 'Explorar', path: '/explore' },
  { icon: PlusCircle, label: 'Agendar', path: '/services' },
  { icon: Calendar, label: 'Agenda', path: '/appointments' },
  { icon: User, label: 'Perfil', path: '/profile' }
];

export function NavBar() {
  const location = useLocation();
  
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t h-16 px-4 flex items-center justify-around"
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex flex-col items-center justify-center gap-1 w-16 text-xs font-medium transition-colors',
              isActive ? 'text-indigo-600' : 'text-muted-foreground hover:text-primary'
            )}
          >
            <div className="relative">
              <item.icon className={cn('h-6 w-6')} />
              {isActive && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-600 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </div>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </motion.div>
  );
}
