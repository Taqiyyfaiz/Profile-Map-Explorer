# Profile Map Explorer

A React application for exploring and managing user profiles with map integration.


## Features

- **Profile Display**: Shows collection of profiles with essential information including name, photo, and bio.
- **Interactive Mapping**: Displays profile locations on an interactive map with custom markers
- **Summary Integration**: Each profile has a Summary button to view it on the map
- **Profile Details**: Detailed view for each profile with all information and map location.
-  **Profile Data Management**: Admin dashboard to add, edit, and delete profiles
- **Search and Filter Functionality**: Filter profiles by name, bio, or location
- **Responsive Design**: Mobile-friendly layout that works on various screen sizes
- **Error Handling**: Robust error handling for map loading and form validation
- **Loading Indicators**: Visual feedback during map loading and data operations
- **Form Validation**: Client-side validation for profile form fields

## Demo
# Landing Page
![Screenshot 2025-04-02 142304](https://github.com/user-attachments/assets/acbad7e6-29b6-4d26-b8f8-d8a0e8df455f)
# Profile Section 
Where it shows the Users Profile and By clicking Summary you can view their Location in Map
![Screenshot 2025-04-02 142325](https://github.com/user-attachments/assets/e1fcdbc9-9e17-47ff-81b4-f63176441b31)
# Profile Management 
Admin can able to do CRED operations like creating, Reading, Editing and Deleting the profile.
![Screenshot 2025-04-02 142338](https://github.com/user-attachments/assets/71c85b89-79e8-4f2b-9e0c-304af07602f3)

## Libraries and Packages

### Core Dependencies
- **React**: Frontend UI library
- **TypeScript**: Static type-checking for JavaScript
- **Vite**: Fast and modern build tool and development server

### Mapping
- **Leaflet**: Open-source JavaScript library for interactive maps
- **React Leaflet**: React components for Leaflet maps
- **@types/leaflet**: TypeScript type definitions for Leaflet

### UI Components
- **Lucide React**: Beautifully crafted open-source icons
- **Tailwind CSS**: Utility-first CSS framework for styling

### State Management
- React Context API for theme and state management

### Development Tools
- **ESLint**: Code linting and static analysis
- **TypeScript**: Type checking and better developer experience

## Setup Instructions

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/profile-map-explorer.git
   cd profile-map-explorer
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```
   
   This will install all required packages including:
   - react
   - react-dom
   - leaflet
   - react-leaflet
   - @types/leaflet
   - lucide-react
   - tailwindcss
   - typescript
   - vite

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Troubleshooting

If you encounter any issues with missing dependencies, you can install them manually:

```bash
npm install react react-dom leaflet react-leaflet @types/leaflet lucide-react
```

For development dependencies:
```bash
npm install -D typescript tailwindcss postcss autoprefixer vite @types/react @types/react-dom
```

## Usage

- The home page displays a list of profiles and a map view
- Click on a profile to see its location on the map
- Use the search bar to filter profiles by name or location
- Click on a profile name to view detailed information
- Access the admin dashboard to add, edit, or delete profiles
## Tech Stack
- Frontend is built with React, TypeScript, and Vite
- Map integration uses Leaflet and React Leaflet
- Styling with Tailwind CSS
- Data is stored locally in React state #

