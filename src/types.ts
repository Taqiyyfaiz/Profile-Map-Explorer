export interface Profile {
  id: number;
  name: string;
  avatar: string;
  email: string;
  address: {
    street: string;
    city: string;
    coordinates: [number, number];
  };
  bio: string;
  interests?: string[];
  phone?: string;
  website?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface SearchFilters {
  query: string;
  location?: string;
}