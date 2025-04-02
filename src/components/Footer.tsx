import React from 'react';
import { Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  
  return (
    <footer className={`shadow-inner mt-auto py-8 ${
      isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className={`text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Profile Map Explorer</h3>
            <p className={`text-sm mt-1 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              An interactive application for exploring profiles and their locations.
            </p>
            <p className={`flex items-center text-sm mt-3 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" /> by Taqiyy Faiz
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className={`text-sm font-medium ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Connect with us</h4>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/Taqiyyfaiz" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${
                  isDark 
                    ? 'text-gray-300 hover:text-blue-400' 
                    : 'text-gray-600 hover:text-blue-500'
                } transition-colors`}
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/taqi_faiz_dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${
                  isDark 
                    ? 'text-gray-300 hover:text-blue-400' 
                    : 'text-gray-600 hover:text-blue-500'
                } transition-colors`}
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/taqiyy-faiz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${
                  isDark 
                    ? 'text-gray-300 hover:text-blue-400' 
                    : 'text-gray-600 hover:text-blue-500'
                } transition-colors`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:taqiyyfaiz.official@gmail.com" 
                className={`${
                  isDark 
                    ? 'text-gray-300 hover:text-blue-400' 
                    : 'text-gray-600 hover:text-blue-500'
                } transition-colors`}
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className={`mt-8 pt-4 border-t ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <p className={`text-center text-xs ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            &copy; {new Date().getFullYear()} Profile Map Explorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}; 