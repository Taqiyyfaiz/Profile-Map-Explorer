import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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

  const MainApp = () => (
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
            <>
              <SearchBar filters={filters} onFiltersChange={setFilters} />
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