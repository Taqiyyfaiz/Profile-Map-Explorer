import React from 'react';
import { Mail, MapPin, Phone, Globe, ExternalLink } from 'lucide-react';
import { Profile } from '../types';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

interface ProfileCardProps {
  profile: Profile;
  isSelected: boolean;
  onClick: () => void;
  isAdmin?: boolean;
  onEdit?: (profile: Profile) => void;
  onDelete?: (id: number) => void;
  onViewMap?: (profile: Profile) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ 
  profile, 
  isSelected, 
  onClick, 
  isAdmin,
  onEdit,
  onDelete,
  onViewMap 
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div 
      className={`p-4 rounded-lg shadow-md transition-all ${
        isSelected 
          ? isDark 
            ? 'bg-blue-900 border-2 border-blue-500' 
            : 'bg-blue-50 border-2 border-blue-500'
          : isDark 
            ? 'bg-gray-800 hover:bg-gray-700' 
            : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center space-x-4">
        <img 
          src={profile.avatar} 
          alt={profile.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              <Link 
                to={`/profile/${profile.id}`} 
                className={isDark ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-700'}
              >
                {profile.name}
              </Link>
            </h3>
            <div className="flex gap-2">
              <button
                onClick={onClick}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Summary
              </button>
              <button
                onClick={() => onViewMap ? onViewMap(profile) : null}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                View on Map
              </button>
            </div>
          </div>
          <div className={`flex items-center text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <Mail className="w-4 h-4 mr-1" />
            <span>{profile.email}</span>
          </div>
          <div className={`flex items-center text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <MapPin className="w-4 h-4 mr-1" />
            <span>{profile.address.street}, {profile.address.city}</span>
          </div>
          {profile.phone && (
            <div className={`flex items-center text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <Phone className="w-4 h-4 mr-1" />
              <span>{profile.phone}</span>
            </div>
          )}
          {profile.website && (
            <div className={`flex items-center text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <Globe className="w-4 h-4 mr-1" />
              <a 
                href={profile.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={isDark ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-700'}
              >
                {profile.website}
              </a>
            </div>
          )}
        </div>
      </div>
      <p className={`mt-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{profile.bio}</p>
      
      {profile.interests && profile.interests.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {profile.interests.map((interest, index) => (
            <span 
              key={index} 
              className={isDark 
                ? 'px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full'
                : 'px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full'
              }
            >
              {interest}
            </span>
          ))}
        </div>
      )}

      {isAdmin && (
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => onEdit?.(profile)}
            className="px-3 py-1 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete?.(profile.id)}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};