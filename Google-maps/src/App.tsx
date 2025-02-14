import { useState, useCallback, useRef, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import Map from "./components/Map";
import SearchBox from "./components/SearchBox";
import Controls from "./components/Controls";
import { getUserLocation } from "./services/mapService";
import { MapMarker, Location, DEFAULT_CENTER } from "./types";

const App = () => {
  // State
  const [center, setCenter] = useState<Location>(DEFAULT_CENTER);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [searchBox, setSearchBox] =
    useState<google.maps.places.Autocomplete | null>(null);

  // Refs
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    if (typeof window !== "undefined" && window.google) {
      console.log("✅ Google Maps is now available!");
      mapRef.current = map;
    } else {
      console.error("❌ Google Maps API is still not available.");
    }
  }, []);

  const onSearchBoxLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setSearchBox(autocomplete);
  };

  const fetchHackneyData = async () => {
    try {
      // Hardcoded JSON data for Hackney, London
      const hackneyData = [
        {
          id: "hackney-1",
          latitude: 51.5465,
          longitude: -0.0611,
          name: "Hackney Town Hall",
          description: "Historic municipal building in Hackney, London.",
        },
        {
          id: "hackney-2",
          latitude: 51.5438,
          longitude: -0.0576,
          name: "Hackney Empire",
          description: "Famous theatre known for music, comedy, and drama.",
        },
        {
          id: "hackney-3",
          latitude: 51.5481,
          longitude: -0.0558,
          name: "London Fields Park",
          description: "A popular park with green space, swimming, and events.",
        },
        {
          id: "hackney-4",
          latitude: 51.5557,
          longitude: -0.0481,
          name: "Hackney Marshes",
          description:
            "Large open space with football pitches and nature walks.",
        },
        {
          id: "hackney-5",
          latitude: 51.5386,
          longitude: -0.0506,
          name: "Broadway Market",
          description:
            "Bustling market with food stalls, cafes, and unique shops.",
        },
      ];

      // Convert data to marker format
      const hackneyMarkers = hackneyData.map((item, index) => ({
        id: `hackney-${index}`,
        lat: item.latitude,
        lng: item.longitude,
        title: item.name,
        description: item.description,
      }));

      // Update state with new Hackney markers
      setMarkers((prev) => [...prev, ...hackneyMarkers]);
      console.log("✅ Hackney markers added:", hackneyMarkers);
    } catch (error) {
      console.error("❌ Failed to load Hackney data:", error);
    }
  };

  const onPlaceChanged = () => {
    if (searchBox) {
      const place = searchBox.getPlace();
      if (place.geometry?.location) {
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        console.log("New location found:", newLocation); // ✅ Debugging

        setCenter(newLocation);
        setMarkers((prev) => [
          ...prev,
          {
            ...newLocation,
            id: Date.now().toString(),
            title: place.name || "Location",
            description: place.formatted_address || "",
          },
        ]);

        // If "London" is selected, fetch Hackney data
        if (place.name.toLowerCase().includes("london")) {
          fetchHackneyData();
        }
      }
    }
  };

  useEffect(() => {
    setMarkers((prev) => {
      // Check if the Luton marker already exists
      if (prev.some((marker) => marker.id === "luton-marker")) {
        console.warn("Luton marker already exists, skipping duplicate.");
        return prev; // Return the same array, no duplicates
      }

      // Add Luton marker if it's not in the list
      const lutonMarker = {
        id: "luton-marker",
        lat: 51.8787, // Luton latitude
        lng: -0.42, // Luton longitude
        title: "Luton",
        description: "This is Luton",
      };

      console.log("✅ Luton marker added:", lutonMarker);
      return [...prev, lutonMarker];
    });
  }, []);

  return (
    <div className="h-screen w-full">
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}
        libraries={["places", "drawing", "geometry"]}
        onLoad={() => console.log("✅ Google Maps API is fully loaded!")}
        onError={() => console.error("❌ Failed to load Google Maps API")}
      >
        <SearchBox onLoad={onSearchBoxLoad} onPlaceChanged={onPlaceChanged} />
        <Map
          center={center}
          markers={markers}
          selectedMarker={selectedMarker}
          onLoad={onLoad}
          setSelectedMarker={setSelectedMarker}
          directions={directions}
        />
        <Controls
          getUserLocation={() =>
            getUserLocation(setCenter, (marker) =>
              setMarkers((prev) => [...prev, marker])
            )
          }
        />
      </LoadScript>
    </div>
  );
};

export default App;
