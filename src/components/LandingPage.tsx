import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Map, Database, Globe, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { Footer } from './Footer';

export const LandingPage: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`shadow-sm py-4 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
              <h1 className="text-xl font-semibold">Profile Map Explorer</h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link 
                to="/explore" 
                className="text-sm font-medium px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors btn-grow"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className={`py-16 md:py-24 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-gradient-animate' 
          : 'bg-gradient-to-br from-blue-50 via-white to-blue-50 bg-gradient-animate'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="hero-fade-in">
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Discover and Explore Profiles on a Map
              </h1>
              <p className={`text-xl mb-8 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                An interactive application that helps you visualize and manage profile information with location data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/explore" 
                  className="px-6 py-3 text-center bg-blue-500 text-white rounded-md text-lg font-medium hover:bg-blue-600 transition-colors btn-pulse"
                >
                  Start Exploring
                </Link>
              </div>
            </div>
            <div className="relative p-4 hero-fade-in">
              <div className={`absolute inset-0 rounded-2xl transform rotate-3 ${
                isDark ? 'bg-blue-500 opacity-20' : 'bg-blue-200 opacity-50'
              }`}></div>
              <div className={`relative overflow-hidden rounded-2xl shadow-xl ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="p-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="aspect-[16/9] bg-gray-200 rounded-b-lg overflow-hidden">
                  <img 
                    src="https://img.freepik.com/free-vector/illustration-diverse-people_53876-28459.jpg?t=st=1743602824~exp=1743606424~hmac=95cb8ec633c6f021debe75292580a1b0574fa06d5367b7633391752e2e084077&w=900" 
                    alt="Application preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className={`py-16 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Key Features</h2>
            <p className={`max-w-3xl mx-auto text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Our platform provides powerful tools to help you visualize, manage and explore profile data with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 staggered-fade-in">
            <FeatureCard 
              icon={<Map />}
              title="Interactive Maps"
              description="Visualize profiles on an interactive map to easily see locations and distributions."
              isDark={isDark}
            />
            <FeatureCard 
              icon={<Users />}
              title="Profile Management"
              description="Create, edit, and organize profiles with comprehensive information fields."
              isDark={isDark}
            />
            <FeatureCard 
              icon={<Database />}
              title="Advanced Search"
              description="Filter and search profiles by name, location, interests, and more."
              isDark={isDark}
            />
            <FeatureCard 
              icon={<MapPin />}
              title="Location-Based Insights"
              description="Gain insights about geographical distribution of profiles."
              isDark={isDark}
            />
            <FeatureCard 
              icon={<Globe />}
              title="Social Integration"
              description="Connect with profiles on social platforms like Twitter, LinkedIn, and GitHub."
              isDark={isDark}
            />
            <FeatureCard 
              icon={<ThemeToggle />}
              title="Dark Mode Support"
              description="Enjoy a comfortable viewing experience in any lighting conditions."
              isDark={isDark}
            />
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className={`py-16 ${
        isDark 
          ? 'bg-gradient-to-r from-blue-900 to-purple-900 bg-gradient-animate' 
          : 'bg-gradient-to-r from-blue-500 to-indigo-600 bg-gradient-animate'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of users who are already exploring and managing profiles with our intuitive map-based interface.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-md text-lg font-medium shadow-lg hover:bg-gray-100 transition-colors btn-slide"
          >
            Explore the App <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isDark: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, isDark }) => (
  <div className={`p-6 rounded-lg transition-all ${
    isDark 
      ? 'bg-gray-900 hover:bg-gray-850 border border-gray-700' 
      : 'bg-gray-50 hover:bg-white border border-gray-200 hover:shadow-md'
  }`}>
    <div className={`p-3 rounded-full inline-block mb-4 ${
      isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'
    }`}>
      {React.cloneElement(icon as React.ReactElement, { 
        className: 'w-6 h-6'
      })}
    </div>
    <h3 className={`text-xl font-semibold mb-2 ${
      isDark ? 'text-white' : 'text-gray-900'
    }`}>{title}</h3>
    <p className={
      isDark ? 'text-gray-400' : 'text-gray-600'
    }>{description}</p>
  </div>
); 