// In App.tsx, modify the handleFeatureClick function and popupContent state

import { useState, useEffect } from "react";
import Map from "./Map";
import venuesData from './data/venues.json';
import { FeatureCollection } from 'geojson';

const initialVenueData = venuesData as FeatureCollection;

function App() {
  // For demonstration, we store the entire dataset in state
  const [venueData, setVenueData] = useState<GeoJSON.FeatureCollection>(initialVenueData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  // Update popupContent type to include position data
  const [popupContent, setPopupContent] = useState<{
    content: string;
    position: { x: number; y: number };
  } | null>(null);

  // Derived state: filter features based on search + type
  const filteredFeatures = venueData.features.filter((feature) => {
    const props = feature.properties as Record<string, any>;
    const name = props.name?.toLowerCase() ?? "";
    const address = props.address?.toLowerCase() ?? "";
    const type = props.type ?? "";

    const matchesSearch =
      name.includes(searchQuery.toLowerCase()) ||
      address.includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || type === selectedType;

    return matchesSearch && matchesType;
  });

  // Updated handler to receive both feature and click coordinates
  const handleFeatureClick = (feature: GeoJSON.Feature, coordinates: { x: number; y: number }) => {
    if (!feature.properties) return;
    const { name, address, type, link } = feature.properties as Record<string, any>;

    // Build a small HTML snippet for demonstration
    const content = `
      <h3 class="font-bold mb-1">${name}</h3>
      <p class="mb-1 text-sm">${address}</p>
      <p class="mb-1 text-xs">Type: ${type}</p>
      ${link
        ? `<a href="${link}" target="_blank" class="text-blue-600 underline text-xs">View Details</a>`
        : ""
      }
    `;
    setPopupContent({ content, position: coordinates });
  };

  useEffect(() => {
    setPopupContent(null);
  }, [searchQuery, selectedType]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold">My Mapbox Venue Map</h1>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2 items-center">
        <input
          type="text"
          placeholder="Search by name or address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="all">All Venues</option>
          <option value="hotel">Hotel</option>
          <option value="resort">Resort</option>
          <option value="conference">Conference Centre</option>
        </select>
      </div>

      <div className="relative max-w-4xl mx-auto space-y-4">
        {/* Map Component */}
        <Map
          styleURL={import.meta.env.VITE_STYLE_URL}
          token={import.meta.env.VITE_MAPBOX_TOKEN}
          geojsonData={venueData}
          filteredFeatures={filteredFeatures}
          onFeatureClick={handleFeatureClick}
        />

        {/* Updated popup overlay with positioning */}
        {popupContent && (
          <div 
            className="absolute bg-white border shadow-lg p-4 max-w-xs z-50 rounded backdrop-blur-sm"
            style={{
              left: `${popupContent.position.x}px`,
              top: `${popupContent.position.y - 10}px`,
              transform: 'translate(-50%, -100%)',
              backgroundColor: 'white',
              padding: '10px',
              borderRadius: '5px',
              textAlign: 'center',
            }}
          >
            <div
              className="text-gray-700 text-sm"
              dangerouslySetInnerHTML={{ __html: popupContent.content }}
            />
            <div 
              className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-white border-r border-b"
            ></div>
            <button
              onClick={() => setPopupContent(null)}
              className="mt-5 px-3 py-4 bg-gray-200 text-sm rounded"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;