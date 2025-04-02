import React from 'react';
import { Search } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { SearchFilters } from '../types';

interface SearchBarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ filters, onFiltersChange }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          isDark ? 'text-gray-500' : 'text-gray-400'
        }`} />
        <input
          type="text"
          placeholder="Search by name or bio..."
          value={filters.query}
          onChange={(e) => onFiltersChange({ ...filters, query: e.target.value })}
          className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            isDark 
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
          }`}
        />
      </div>
      <div className="w-full md:w-64">
        <input
          type="text"
          placeholder="Filter by location..."
          value={filters.location}
          onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
          className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            isDark 
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
          }`}
        />
      </div>
    </div>
  );
};