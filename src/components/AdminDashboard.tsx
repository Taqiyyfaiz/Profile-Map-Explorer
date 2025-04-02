import React, { useState } from 'react';
import { Plus, AlertTriangle } from 'lucide-react';
import { ProfileCard } from './ProfileCard';
import { ProfileForm } from './ProfileForm';
import { Profile } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface AdminDashboardProps {
  profiles: Profile[];
  setProfiles: React.Dispatch<React.SetStateAction<Profile[]>>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ profiles, setProfiles }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  const handleSave = (profile: Profile) => {
    setIsLoading(true);
    setError(null);
    
    // Simulate a delay to show loading state
    setTimeout(() => {
      try {
        if (editingProfile) {
          // Update existing profile
          setProfiles(prev => prev.map(p => p.id === profile.id ? profile : p));
        } else {
          // Create new profile with a new ID
          const newId = profiles.length > 0 
            ? Math.max(...profiles.map(p => p.id)) + 1 
            : 1;
          
          setProfiles(prev => [...prev, { ...profile, id: newId }]);
        }
        
        setIsFormOpen(false);
        setEditingProfile(null);
      } catch (err) {
        setError('Failed to save profile. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 500); // 500ms delay to simulate network request
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      setIsLoading(true);
      setError(null);
      
      // Simulate a delay to show loading state
      setTimeout(() => {
        try {
          setProfiles(prev => prev.filter(p => p.id !== id));
        } catch (err) {
          setError('Failed to delete profile. Please try again.');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }, 500); // 500ms delay to simulate network request
    }
  };

  const handleEdit = (profile: Profile) => {
    setEditingProfile(profile);
    setIsFormOpen(true);
  };

  const handleViewSummary = (profile: Profile) => {
    setSelectedProfile(profile);
  };

  const handleViewOnMap = (profile: Profile) => {
    // Navigate to the map page with the profile ID as a query parameter
    navigate(`/explore?profileId=${profile.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Profile Management</h1>
        <button
          onClick={() => {
            setEditingProfile(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner size="sm" /> : <Plus className="w-4 h-4" />}
          Add Profile
        </button>
      </div>

      {error && (
        <div className={`mb-6 p-4 rounded flex items-center ${
          isDark 
            ? 'bg-red-900 border border-red-700 text-red-300' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          <AlertTriangle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {isLoading && !isFormOpen && (
        <div className="flex justify-center my-4">
          <LoadingSpinner />
          <span className={`ml-2 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Processing...</span>
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <ProfileForm
              profile={editingProfile}
              onSave={handleSave}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingProfile(null);
              }}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}

      {/* Profile Summary Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-lg p-6 w-full max-w-2xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Profile Summary</h2>
            
            <div className={`p-4 rounded-lg ${
              isDark ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <div className="flex items-center mb-4">
                <img 
                  src={selectedProfile.avatar} 
                  alt={selectedProfile.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className={`font-semibold text-lg ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>{selectedProfile.name}</h3>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {selectedProfile.email}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p><strong>Address:</strong> {selectedProfile.address.street}, {selectedProfile.address.city}, {selectedProfile.address.state}, {selectedProfile.address.zipCode}</p>
                <p><strong>Phone:</strong> {selectedProfile.phone || 'N/A'}</p>
                <p><strong>Website:</strong> {selectedProfile.website || 'N/A'}</p>
                <p><strong>Bio:</strong> {selectedProfile.bio}</p>
                <div>
                  <strong>Interests:</strong> 
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedProfile.interests?.map((interest, index) => (
                      <span 
                        key={index} 
                        className={isDark 
                          ? 'px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded-full'
                          : 'px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full'
                        }
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <button
                onClick={() => handleViewOnMap(selectedProfile)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                View on Map
              </button>
              <button
                onClick={() => setSelectedProfile(null)}
                className={`px-4 py-2 rounded-md ${
                  isDark 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {profiles.length === 0 ? (
        <div className={`rounded-lg shadow-md p-8 text-center ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <p className={isDark ? 'text-gray-300' : 'text-gray-500'}>
            No profiles added yet. Click "Add Profile" to create one.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {profiles.map(profile => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              isSelected={selectedProfile?.id === profile.id}
              onClick={() => handleViewSummary(profile)}
              isAdmin={true}
              onEdit={() => handleEdit(profile)}
              onDelete={() => handleDelete(profile.id)}
              onViewMap={handleViewOnMap}
            />
          ))}
        </div>
      )}
    </div>
  );
};