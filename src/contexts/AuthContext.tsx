import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user types
export type UserRole = 'client' | 'salon';
export type ThemePreference = 'light' | 'dark';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  themePreference?: ThemePreference;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setThemeState] = useState<ThemePreference>('light');

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('salaozap-user');
    const storedTheme = localStorage.getItem('salaozap-theme') as ThemePreference;
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedTheme) {
      setThemeState(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
    
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    // Set theme preference from user data or default to light
    const userTheme = userData.themePreference || theme;
    setThemeState(userTheme);
    document.documentElement.classList.toggle('dark', userTheme === 'dark');
    
    // Save theme in localStorage
    localStorage.setItem('salaozap-theme', userTheme);
    
    // Save user in state and localStorage
    setUser(userData);
    localStorage.setItem('salaozap-user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('salaozap-user');
    // We keep the theme when logging out
  };

  const setTheme = (newTheme: ThemePreference) => {
    setThemeState(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('salaozap-theme', newTheme);
    
    // Update user preferences if logged in
    if (user) {
      const updatedUser = { ...user, themePreference: newTheme };
      setUser(updatedUser);
      localStorage.setItem('salaozap-user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading,
        login, 
        logout,
        theme,
        setTheme
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
