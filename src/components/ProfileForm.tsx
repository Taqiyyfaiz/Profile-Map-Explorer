import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Profile } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { useTheme } from '../contexts/ThemeContext';

interface ProfileFormProps {
  profile?: Profile | null;
  onSave: (profile: Profile) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onSave, onCancel, isLoading = false }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [formData, setFormData] = useState<Partial<Profile>>(
    profile || {
      name: '',
      email: '',
      avatar: '',
      bio: '',
      address: {
        street: '',
        city: '',
        coordinates: [0, 0]
      },
      interests: [],
      phone: '',
      website: '',
      social: {
        twitter: '',
        linkedin: '',
        github: ''
      }
    }
  );
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    // Basic validation rules
    if (!formData.name?.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.avatar?.trim()) {
      errors.avatar = 'Avatar URL is required';
    } else if (!formData.avatar.startsWith('http')) {
      errors.avatar = 'Avatar must be a valid URL';
    }
    
    if (!formData.bio?.trim()) {
      errors.bio = 'Bio is required';
    }
    
    if (!formData.address?.street?.trim()) {
      errors['address.street'] = 'Street address is required';
    }
    
    if (!formData.address?.city?.trim()) {
      errors['address.city'] = 'City is required';
    }
    
    if (formData.website && !formData.website.startsWith('http')) {
      errors.website = 'Website must be a valid URL';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData as Profile);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear the error for this field when it's changed
    setFormErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Profile] as object),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interests = e.target.value.split(',').map(i => i.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, interests }));
  };

  const handleCoordinatesChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const coordinates = [...(formData.address?.coordinates || [0, 0])];
    coordinates[index] = parseFloat(e.target.value);
    setFormData(prev => ({
      ...prev,
      address: {
        ...(prev.address || {}),
        coordinates
      }
    }));
  };

  const renderField = (
    label: string, 
    name: string, 
    type: string = 'text', 
    required: boolean = false,
    value: string = formData[name as keyof Profile] as string || ''
  ) => (
    <div>
      <label className={`block text-sm font-medium ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
          formErrors[name] 
            ? 'border-red-500' 
            : isDark 
              ? 'border-gray-700 bg-gray-700 text-white' 
              : 'border-gray-300 bg-white text-gray-900'
        }`}
        required={required}
        disabled={isLoading}
      />
      {formErrors[name] && (
        <p className="mt-1 text-sm text-red-500">{formErrors[name]}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className={`text-xl font-semibold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {profile ? 'Edit Profile' : 'Add New Profile'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className={isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}
          disabled={isLoading}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderField('Name', 'name', 'text', true)}
        {renderField('Email', 'email', 'email', true)}
        {renderField('Avatar URL', 'avatar', 'url', true)}
        {renderField('Phone', 'phone', 'tel')}
        {renderField('Website', 'website', 'url')}

        <div>
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Interests (comma-separated)
          </label>
          <input
            type="text"
            name="interests"
            value={formData.interests?.join(', ') || ''}
            onChange={handleInterestsChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              isDark 
                ? 'border-gray-700 bg-gray-700 text-white' 
                : 'border-gray-300 bg-white text-gray-900'
            }`}
            disabled={isLoading}
          />
        </div>

        <div className="col-span-2">
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Bio <span className="text-red-500">*</span>
          </label>
          <textarea
            name="bio"
            value={formData.bio || ''}
            onChange={handleChange}
            rows={3}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              formErrors.bio 
                ? 'border-red-500' 
                : isDark 
                  ? 'border-gray-700 bg-gray-700 text-white' 
                  : 'border-gray-300 bg-white text-gray-900'
            }`}
            required
            disabled={isLoading}
          />
          {formErrors.bio && (
            <p className="mt-1 text-sm text-red-500">{formErrors.bio}</p>
          )}
        </div>

        <div>
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address.street"
            value={formData.address?.street || ''}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              formErrors['address.street'] 
                ? 'border-red-500' 
                : isDark 
                  ? 'border-gray-700 bg-gray-700 text-white' 
                  : 'border-gray-300 bg-white text-gray-900'
            }`}
            required
            disabled={isLoading}
          />
          {formErrors['address.street'] && (
            <p className="mt-1 text-sm text-red-500">{formErrors['address.street']}</p>
          )}
        </div>

        <div>
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address.city"
            value={formData.address?.city || ''}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              formErrors['address.city'] 
                ? 'border-red-500' 
                : isDark 
                  ? 'border-gray-700 bg-gray-700 text-white' 
                  : 'border-gray-300 bg-white text-gray-900'
            }`}
            required
            disabled={isLoading}
          />
          {formErrors['address.city'] && (
            <p className="mt-1 text-sm text-red-500">{formErrors['address.city']}</p>
          )}
        </div>

        <div>
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Longitude <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.000001"
            value={formData.address?.coordinates?.[0] || 0}
            onChange={(e) => handleCoordinatesChange(e, 0)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              isDark 
                ? 'border-gray-700 bg-gray-700 text-white' 
                : 'border-gray-300 bg-white text-gray-900'
            }`}
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Latitude <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.000001"
            value={formData.address?.coordinates?.[1] || 0}
            onChange={(e) => handleCoordinatesChange(e, 1)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              isDark 
                ? 'border-gray-700 bg-gray-700 text-white' 
                : 'border-gray-300 bg-white text-gray-900'
            }`}
            required
            disabled={isLoading}
          />
        </div>

        <div className="col-span-2">
          <h3 className={`text-lg font-medium ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Social Links
          </h3>
        </div>

        <div>
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Twitter Handle
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className={`inline-flex items-center px-3 rounded-l-md border border-r-0 ${
              isDark 
                ? 'bg-gray-600 text-gray-300 border-gray-700' 
                : 'bg-gray-50 text-gray-500 border-gray-300'
            }`}>
              @
            </span>
            <input
              type="text"
              name="social.twitter"
              value={formData.social?.twitter || ''}
              onChange={handleChange}
              className={`flex-1 min-w-0 block rounded-none rounded-r-md ${
                isDark 
                  ? 'border-gray-700 bg-gray-700 text-white' 
                  : 'border-gray-300 bg-white text-gray-900'
              } focus:ring-blue-500 focus:border-blue-500`}
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            LinkedIn Username
          </label>
          <input
            type="text"
            name="social.linkedin"
            value={formData.social?.linkedin || ''}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              isDark 
                ? 'border-gray-700 bg-gray-700 text-white' 
                : 'border-gray-300 bg-white text-gray-900'
            }`}
            disabled={isLoading}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            GitHub Username
          </label>
          <input
            type="text"
            name="social.github"
            value={formData.social?.github || ''}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              isDark 
                ? 'border-gray-700 bg-gray-700 text-white' 
                : 'border-gray-300 bg-white text-gray-900'
            }`}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className={`px-4 py-2 rounded-md shadow-sm border text-sm font-medium ${
            isDark 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md shadow-sm border border-transparent text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner size="sm" /> : profile ? 'Update Profile' : 'Create Profile'}
        </button>
      </div>
    </form>
  );
};