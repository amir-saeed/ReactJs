# MapBox, React , TypeScript and Tailwind CSS

The my-mapbox-app project is a React application that integrates Mapbox to provide interactive mapping functionalities. Developed using TypeScript and Vite, this project offers a modern development environment with features like Hot Module Replacement (HMR) and an ESLint configuration for code quality assurance.​

Key Features:

React with TypeScript: Leverages the strengths of TypeScript for static typing, enhancing code reliability and maintainability.​

Vite as the Build Tool: Utilises Vite for rapid development and efficient build processes, ensuring a smooth developer experience.​

Mapbox Integration: Incorporates Mapbox GL JS to render dynamic and interactive maps, allowing for custom map styles and layers.​

Location Markers: Displays markers on the map to indicate specific locations of interest.​

Search Functionality: Enables users to search for hotels, resorts, and conference centres, displaying the results with corresponding markers on the map.​

Tailwind CSS for Styling: Employs Tailwind CSS to facilitate responsive and utility-first styling, streamlining the design process.​

Getting Started:

To set up and run the project locally:

Clone the Repository:

bash
Copy
Edit
git clone https://github.com/amir-saeed/ReactJs.git
Navigate to the Project Directory:

bash
Copy
Edit
cd ReactJs/my-mapbox-app
Install Dependencies:

bash
Copy
Edit
npm install
Set Up Environment Variables:

Create a .env file in the root directory and add your Mapbox access token:

ini
Copy
Edit
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
Start the Development Server:

bash
Copy
Edit
npm run dev
The application will be running at http://localhost:3000.

Project Structure:

public/: Contains static assets and the index.html file.​

src/: Houses the main application code, including components and styles.​

package.json: Lists project dependencies and scripts.​

vite.config.ts: Configuration file for Vite.​

tailwind.config.js: Configuration file for Tailwind CSS.​

Dependencies:

The project relies on several key packages:​

react: Library for building user interfaces.​

react-dom: Serves as the entry point to the DOM and server renderers for React.​

mapbox-gl: JavaScript library for interactive, customizable vector maps.​

tailwindcss: Utility-first CSS framework for rapid UI development.​

Available Scripts:

npm run dev: Starts the development server with HMR.​

npm run build: Bundles the application for production.​

npm run serve: Serves the production build locally.​

Contributing:

Contributions are welcome! If you have suggestions for improvements or encounter any issues, please open an issue or submit a pull request.​

License:

This project is licensed under the MIT License.