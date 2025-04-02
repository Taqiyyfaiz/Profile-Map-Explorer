import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, AlertTriangle } from 'lucide-react';
import { Profile } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { useTheme } from '../contexts/ThemeContext';

interface MapViewProps {
  profiles: Profile[];
  selectedProfile: Profile | null;
  onSelectProfile: (profile: Profile) => void;
}

export const MapView: React.FC<MapViewProps> = ({ profiles, selectedProfile, onSelectProfile }) => {
  // Initialize Mapbox token from environment variables
  const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Default center of the US
  const defaultViewState = {
    longitude: -98.5795,
    latitude: 39.8283,
    zoom: 3
  };

  // If a profile is selected, center the map on that profile
  const initialViewState = selectedProfile 
    ? {
        longitude: selectedProfile.address.coordinates[0],
        latitude: selectedProfile.address.coordinates[1],
        zoom: 5
      } 
    : defaultViewState;

  useEffect(() => {
    // Reset error state when props change
    setMapError(null);
  }, [profiles, selectedProfile]);

  if (!mapboxToken) {
    return (
      <div className={`w-full h-full flex items-center justify-center flex-col gap-4 ${
        isDark ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <AlertTriangle className="w-8 h-8 text-amber-500" />
        <p className={isDark ? "text-gray-300" : "text-gray-500"}>Error loading Mapbox</p>
        <p className={isDark ? "text-sm text-gray-400" : "text-sm text-gray-400"}>Please check your access token in the .env file and try again</p>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className={`w-full h-full flex items-center justify-center flex-col gap-4 ${
        isDark ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <p className={isDark ? "text-gray-300" : "text-gray-500"}>No profiles to display on the map</p>
      </div>
    );
  }

  const handleMapError = (error: any) => {
    console.error('Map error:', error);
    setMapError('There was an error loading the map. Please try again later.');
  };

  return (
    <>
      {!mapLoaded && !mapError && (
        <div className={`absolute inset-0 flex items-center justify-center z-10 ${
          isDark ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <LoadingSpinner />
          <p className={isDark ? "ml-2 text-gray-300" : "ml-2 text-gray-500"}>Loading map...</p>
        </div>
      )}

      {mapError && (
        <div className={`absolute inset-0 flex items-center justify-center z-10 flex-col gap-2 ${
          isDark ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <AlertTriangle className="w-8 h-8 text-amber-500" />
          <p className={isDark ? "text-gray-300" : "text-gray-700"}>{mapError}</p>
          <button 
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => setMapError(null)}
          >
            Try Again
          </button>
        </div>
      )}

      <ReactMapGL
        initialViewState={initialViewState}
        mapboxAccessToken={mapboxToken}
        mapStyle={isDark ? "mapbox://styles/mapbox/dark-v10" : "mapbox://styles/mapbox/light-v10"}
        style={{ width: '100%', height: '100%' }}
        onLoad={() => setMapLoaded(true)}
        onError={handleMapError}
      >
        <NavigationControl position="top-right" />

        {profiles.map((profile) => (
          <Marker
            key={profile.id}
            longitude={profile.address.coordinates[0]}
            latitude={profile.address.coordinates[1]}
            onClick={(e) => {
              // Prevent event propagation
              e.originalEvent.stopPropagation();
              onSelectProfile(profile);
            }}
            anchor="bottom"
          >
            <div className="cursor-pointer marker-pin">
              <MapPin 
                size={32} 
                className="transition-colors" 
                fill={selectedProfile?.id === profile.id ? '#3B82F6' : isDark ? '#6B7280' : '#374151'} 
                color="white" 
                strokeWidth={2}
              />
            </div>
          </Marker>
        ))}
      </ReactMapGL>
    </>
  );
};