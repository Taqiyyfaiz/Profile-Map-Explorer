import { Profile } from './types';

export const profiles: Profile[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    email: "sarah.j@example.com",
    address: {
      street: "123 Tech Lane",
      city: "San Francisco, CA",
      coordinates: [-122.4194, 37.7749]
    },
    bio: "Full-stack developer passionate about creating intuitive user experiences"
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    email: "m.chen@example.com",
    address: {
      street: "456 Innovation Ave",
      city: "Seattle, WA",
      coordinates: [-122.3321, 47.6062]
    },
    bio: "UX designer with a focus on accessible design solutions"
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    email: "emma.w@example.com",
    address: {
      street: "789 Startup Blvd",
      city: "Austin, TX",
      coordinates: [-97.7431, 30.2672]
    },
    bio: "Product manager specializing in agile methodologies"
  }
];