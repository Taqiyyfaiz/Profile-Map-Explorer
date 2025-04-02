
# Profile Map Explorer

A React application for exploring and managing user profiles with Mapbox integration.


## Features

- **Profile Display**: Shows collection of profiles with essential information including name, photo, and bio.
- **Interactive Mapping**: Displays profile locations on a Mapbox map with custom markers
- **Summary Integration**: Each profile has a Summary button to view it on the map
- **Profile Details**: Detailed view for each profile with all information and map location.
-  **Profile Data Management**: Admin dashboard to add, edit, and delete profiles
- **Search and Filter Functionality**: Filter profiles by name, bio, or location
- **Responsive Design**: Mobile-friendly layout that works on various screen sizes
- **Error Handling**: Robust error handling for map loading and form validation
- **Loading Indicators**: Visual feedback during map loading and data operations
- **Form Validation**: Client-side validation for profile form fields

## Setup Instructions

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- Mapbox access token

### Configuration

1. Clone the repository
2. Install dependencies:

```bash
 npm Install
```
3. Configure environment variables:
   - Create or edit `.env` file and add your Mapbox access token:
     ```
     VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token_here
     ```

4. Start the development server:
   ```
   npm run dev
   ```

    ## Usage

- The home page displays a list of profiles and a map view
- Click on a profile to see its location on the map
- Use the search bar to filter profiles by name or location
- Click on a profile name to view detailed information
- Access the admin dashboard to add, edit, or delete profiles
## Tech Stack
- Frontend is built with React, TypeScript, and Vite
- Map integration uses Mapbox GL and react-map-gl
- Styling with Tailwind CSS
- Data is stored locally in React state #

