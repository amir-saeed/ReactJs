// googleMapsLoader.ts
import { Loader } from "@googlemaps/js-api-loader";

// Get API key from environment
const API_KEY = import.meta.env.VITE_API_KEY || "";

// Create a singleton loader instance
export const mapLoader = new Loader({
  apiKey: API_KEY,
  version: "weekly",
  libraries: ["marker"]
});

// Helper function to load all required libraries
export const loadMapLibraries = async () => {
  try {
    const mapsLibrary = await mapLoader.importLibrary('maps');
    const markerLibrary = await mapLoader.importLibrary('marker');
    return { maps: mapsLibrary, marker: markerLibrary };
  } catch (error) {
    console.error("Error loading Google Maps libraries:", error);
    throw error;
  }
};