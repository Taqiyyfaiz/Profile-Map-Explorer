import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AlertTriangle } from 'lucide-react';
import { Profile } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { useTheme } from '../contexts/ThemeContext';

// Fix for Leaflet marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix the default icon issue
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to recenter map when selectedProfile changes
const RecenterOnSelect = ({ coords }: { coords: [number, number] | null }) => {
  const map = useMap();
  
  useEffect(() => {
    if (coords) {
      map.setView(coords, 8);
    }
  }, [coords, map]);
  
  return null;
};

interface MapViewProps {
  profiles: Profile[];
  selectedProfile: Profile | null;
  onSelectProfile: (profile: Profile) => void;
}

export const MapView: React.FC<MapViewProps> = ({ profiles, selectedProfile, onSelectProfile }) => {
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Default center of the US
  const defaultCenter: [number, number] = [39.8283, -98.5795];
  
  const selectedCoords = selectedProfile 
    ? [selectedProfile.address.coordinates[1], selectedProfile.address.coordinates[0]] as [number, number]
    : null;

  useEffect(() => {
    // Reset error state when props change
    setError(null);
  }, [profiles, selectedProfile]);

  if (profiles.length === 0) {
    return (
      <div className={`w-full h-full flex items-center justify-center flex-col gap-4 ${
        isDark ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <p className={isDark ? "text-gray-300" : "text-gray-500"}>No profiles to display on the map</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full h-full flex items-center justify-center flex-col gap-2 ${
        isDark ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <AlertTriangle className="w-8 h-8 text-amber-500" />
        <p className={isDark ? "text-gray-300" : "text-gray-700"}>{error}</p>
        <button 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => setError(null)}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Create custom marker icon for selected and unselected profiles
  const createCustomMarkerIcon = (isSelected: boolean) => {
    return L.divIcon({
      className: 'custom-marker-icon',
      html: `<svg width="32" height="42" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.4 0 0 5.4 0 12c0 6.6 12 24 12 24s12-17.4 12-24c0-6.6-5.4-12-12-12zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" 
        fill="${isSelected ? '#3B82F6' : isDark ? '#6B7280' : '#374151'}" stroke="white" stroke-width="1" />
      </svg>`,
      iconSize: [32, 42],
      iconAnchor: [16, 42],
      popupAnchor: [0, -36]
    });
  };

  return (
    <div className="w-full h-full">
      <MapContainer 
        style={{ width: '100%', height: '100%' }}
        zoom={4} 
        zoomControl={true}
        center={defaultCenter}
      >
        <TileLayer
          url={isDark 
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' 
            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          }
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {selectedCoords && <RecenterOnSelect coords={selectedCoords} />}
        
        {profiles.map((profile) => (
          <Marker
            key={profile.id}
            position={[profile.address.coordinates[1], profile.address.coordinates[0]]}
            icon={createCustomMarkerIcon(selectedProfile?.id === profile.id)}
            eventHandlers={{
              click: () => onSelectProfile(profile)
            }}
          >
            <Popup>
              <div className="text-center">
                <p className="font-semibold">{profile.name}</p>
                <p className="text-sm">{profile.address.city}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};