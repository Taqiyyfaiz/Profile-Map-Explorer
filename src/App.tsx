import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useSearchParams, useLocation } from 'react-router-dom';
import { Users } from 'lucide-react';
import { ProfileCard } from './components/ProfileCard';
import { MapView } from './components/Map';
import { SearchBar } from './components/SearchBar';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AdminDashboard } from './components/AdminDashboard';
import { ProfileDetails } from './components/ProfileDetails';
import { Footer } from './components/Footer';
import { ThemeToggle } from './components/ThemeToggle';
import { LandingPage } from './components/LandingPage';
import { useTheme } from './contexts/ThemeContext';
import { profiles as initialProfiles } from './data';
import { Profile, SearchFilters } from './types';

// Explore component to handle the profileId query parameter
const Explore = ({ 
  profiles, 
  selectedProfile,
  setSelectedProfile, 
  filteredProfiles, 
  isLoading, 
  filters, 
  onFiltersChange 
}: {
  profiles: Profile[],
  selectedProfile: Profile | null,
  setSelectedProfile: React.Dispatch<React.SetStateAction<Profile | null>>,
  filteredProfiles: Profile[],
  isLoading: boolean,
  filters: SearchFilters,
  onFiltersChange: (filters: SearchFilters) => void
}) => {
  const [searchParams] = useSearchParams();
  const theme = useTheme().theme;
  
  // Handle profileId query parameter
  useEffect(() => {
    const profileIdParam = searchParams.get('profileId');
    if (profileIdParam) {
      const profileId = parseInt(profileIdParam, 10);
      const profile = profiles.find(p => p.id === profileId);
      if (profile) {
        setSelectedProfile(profile);
      }
    }
  }, [searchParams, profiles, setSelectedProfile]);

  return (
    <>
      <SearchBar filters={filters} onFiltersChange={onFiltersChange} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Profiles</h2>
            {isLoading && <LoadingSpinner />}
          </div>
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                isSelected={selectedProfile?.id === profile.id}
                onClick={() => setSelectedProfile(profile)}
                onViewMap={() => setSelectedProfile(profile)}
              />
            ))
          ) : (
            <div className={`rounded-lg shadow-md p-4 text-center ${
              theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'
            }`}>
              <p>No profiles match your search criteria.</p>
            </div>
          )}
        </div>
        
        <div className={`h-[600px] rounded-lg shadow-md overflow-hidden sticky top-24 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <MapView
            profiles={filteredProfiles}
            selectedProfile={selectedProfile}
            onSelectProfile={setSelectedProfile}
          />
        </div>
      </div>
    </>
  );
};

function App() {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({ query: '', location: '' });
  const { theme } = useTheme();

  const filteredProfiles = profiles.filter(profile => {
    const matchesQuery = profile.name.toLowerCase().includes(filters.query.toLowerCase()) ||
                        profile.bio.toLowerCase().includes(filters.query.toLowerCase());
    const matchesLocation = !filters.location ||
                          profile.address.city.toLowerCase().includes(filters.location.toLowerCase());
    return matchesQuery && matchesLocation;
  });

  const MainApp = () => {
    // Reset selected profile when navigating away from /explore
    const location = useLocation();
    useEffect(() => {
      if (!location.pathname.includes('/explore')) {
        setSelectedProfile(null);
      }
    }, [location]);
    
    return (
      <div className={`min-h-screen flex flex-col ${
        theme === 'dark' 
          ? 'bg-gray-900 text-white' 
          : 'bg-gray-100 text-gray-900'
      }`}>
        <header className={`shadow-sm sticky top-0 z-10 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}`} />
                <h1 className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Profile Map Explorer</h1>
              </div>
              <nav className="flex items-center space-x-4">
                <Link to="/" className={`${
                  theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-blue-500'
                }`}>
                  Home
                </Link>
                <Link to="/explore" className={`${
                  theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-blue-500'
                }`}>
                  Explore
                </Link>
                <Link to="/admin" className={`${
                  theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-blue-500'
                }`}>
                  Admin Dashboard
                </Link>
                <ThemeToggle />
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6 flex-grow w-full">
          <Routes>
            <Route path="/explore" element={
              <Explore
                profiles={profiles}
                selectedProfile={selectedProfile}
                setSelectedProfile={setSelectedProfile}
                filteredProfiles={filteredProfiles}
                isLoading={isLoading}
                filters={filters}
                onFiltersChange={setFilters}
              />
            } />
            <Route path="/profile/:id" element={<ProfileDetails profiles={profiles} />} />
            <Route 
              path="/admin" 
              element={<AdminDashboard 
                profiles={profiles} 
                setProfiles={setProfiles} 
              />} 
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;