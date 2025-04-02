import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Mail, Phone, Globe, ArrowLeft, Bookmark } from 'lucide-react';
import { MapView } from './Map';
import { Profile } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { useTheme } from '../contexts/ThemeContext';

interface ProfileDetailsProps {
  profiles: Profile[];
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profiles }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Find profile by ID
  const profile = profiles.find(p => p.id === Number(id));
  
  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className={isDark 
              ? "flex items-center text-blue-400 hover:text-blue-300" 
              : "flex items-center text-blue-500 hover:text-blue-700"
            }
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>
        </div>
        <div className={isDark 
          ? "bg-red-900 border border-red-700 rounded-lg p-6 text-center" 
          : "bg-red-50 border border-red-200 rounded-lg p-6 text-center"
        }>
          <p className={isDark ? "text-red-400 font-medium" : "text-red-500 font-medium"}>Profile not found</p>
          <p className={isDark ? "text-gray-400 mt-2" : "text-gray-500 mt-2"}>
            The profile you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className={isDark 
            ? "flex items-center text-blue-400 hover:text-blue-300" 
            : "flex items-center text-blue-500 hover:text-blue-700"
          }
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>
      
      <div className={`rounded-lg shadow-md overflow-hidden ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/3">
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="h-48 w-full object-cover md:h-full"
            />
          </div>
          
          <div className="p-6 md:w-2/3">
            <div className="flex justify-between items-start">
              <h1 className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>{profile.name}</h1>
              <button className={isDark 
                ? "text-blue-400 hover:text-blue-300" 
                : "text-blue-500 hover:text-blue-700"
              }>
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className={`flex items-center ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <MapPin className="w-4 h-4 mr-2" />
                <span>{profile.address.street}, {profile.address.city}</span>
              </div>
              
              <div className={`flex items-center ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <Mail className="w-4 h-4 mr-2" />
                <span>{profile.email}</span>
              </div>
              
              {profile.phone && (
                <div className={`flex items-center ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{profile.phone}</span>
                </div>
              )}
              
              {profile.website && (
                <div className={`flex items-center ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <Globe className="w-4 h-4 mr-2" />
                  <a 
                    href={profile.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={isDark 
                      ? "text-blue-400 hover:text-blue-300" 
                      : "text-blue-500 hover:text-blue-700"
                    }
                  >
                    {profile.website}
                  </a>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <h2 className={`text-lg font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Bio</h2>
              <p className={`mt-2 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>{profile.bio}</p>
            </div>
            
            {profile.interests && profile.interests.length > 0 && (
              <div className="mt-6">
                <h2 className={`text-lg font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Interests</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.interests.map(interest => (
                    <span 
                      key={interest} 
                      className={isDark
                        ? "bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-sm"
                        : "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                      }
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {profile.social && Object.keys(profile.social).length > 0 && (
              <div className="mt-6">
                <h2 className={`text-lg font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Social</h2>
                <div className="mt-2 space-y-2">
                  {profile.social.twitter && (
                    <a 
                      href={`https://twitter.com/${profile.social.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={isDark 
                        ? "text-blue-400 hover:text-blue-300 block" 
                        : "text-blue-500 hover:text-blue-700 block"
                      }
                    >
                      Twitter: @{profile.social.twitter}
                    </a>
                  )}
                  
                  {profile.social.linkedin && (
                    <a 
                      href={`https://linkedin.com/in/${profile.social.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={isDark 
                        ? "text-blue-400 hover:text-blue-300 block" 
                        : "text-blue-500 hover:text-blue-700 block"
                      }
                    >
                      LinkedIn: {profile.social.linkedin}
                    </a>
                  )}
                  
                  {profile.social.github && (
                    <a 
                      href={`https://github.com/${profile.social.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={isDark 
                        ? "text-blue-400 hover:text-blue-300 block" 
                        : "text-blue-500 hover:text-blue-700 block"
                      }
                    >
                      GitHub: {profile.social.github}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="h-[400px] w-full">
          <h2 className={`text-lg font-semibold p-4 border-t ${
            isDark ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
          }`}>Location</h2>
          <MapView 
            profiles={[profile]} 
            selectedProfile={profile} 
            onSelectProfile={() => {}}
          />
        </div>
      </div>
    </div>
  );
}; 