import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const sizeClasses = {
    sm: 'h-4 w-4 border-b-2',
    md: 'h-8 w-8 border-b-2',
    lg: 'h-12 w-12 border-b-3'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full ${sizeClasses[size]} ${
        isDark ? 'border-blue-400' : 'border-blue-500'
      }`}></div>
    </div>
  );
};