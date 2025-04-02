
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

## Demo
# Landing Page
![Screenshot 2025-04-02 142304](https://github.com/user-attachments/assets/acbad7e6-29b6-4d26-b8f8-d8a0e8df455f)
# Profile Section 
Where it shows the Users Profile and By clicking Summary you can view their Location in Map
![Screenshot 2025-04-02 142325](https://github.com/user-attachments/assets/e1fcdbc9-9e17-47ff-81b4-f63176441b31)
# Profile Management 
Admin can able to do CRED operations like creating, Reading, Editing and Deleting the profile.
![Screenshot 2025-04-02 142338](https://github.com/user-attachments/assets/71c85b89-79e8-4f2b-9e0c-304af07602f3)



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

