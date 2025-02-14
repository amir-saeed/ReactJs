import { Marker, InfoWindow, MarkerClusterer } from "@react-google-maps/api";
import { MapMarker } from "../types";

interface MarkerListProps {
  markers: MapMarker[];
  selectedMarker: MapMarker | null;
  setSelectedMarker: (marker: MapMarker | null) => void;
}

const MarkerList = ({ markers, selectedMarker, setSelectedMarker }: MarkerListProps) => {
  console.log("Rendering markers:", markers); // ✅ Debugging

  return (
    <>
      <MarkerClusterer>
        {(clusterer) =>
          markers.map((marker) => {
            // Assign colors based on location (e.g., Hackney = blue, Luton = red)
            const iconColor =
              marker.title.includes("Hackney") ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              : marker.title.includes("Luton") ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
              : "http://maps.google.com/mapfiles/ms/icons/green-dot.png"; // Default

            return (
              <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={{ url: iconColor }}
                onClick={() => {
                  console.log("Marker Clicked:", marker); // ✅ Debugging
                  setSelectedMarker(marker);
                }}
                clusterer={clusterer}
              />
            );
          })
        }
      </MarkerClusterer>

      {selectedMarker && (
        <InfoWindow
          key={selectedMarker.id} // ✅ Ensures full re-render
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>
            <h3 className="font-bold">{selectedMarker.title}</h3>
            <p>{selectedMarker.description}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${selectedMarker.lat},${selectedMarker.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View on Google Maps
            </a>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default MarkerList;
