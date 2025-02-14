import {
  GoogleMap,
  MarkerClusterer,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  DrawingManager,
} from "@react-google-maps/api";
import { MapMarker, Location, mapContainerStyle, DEFAULT_ZOOM } from "../types";
import { useRef } from "react";

interface MapProps {
  center: Location;
  markers: MapMarker[];
  selectedMarker: MapMarker | null;
  onLoad: (map: google.maps.Map) => void;
  setSelectedMarker: (marker: MapMarker | null) => void;
  directions: google.maps.DirectionsResult | null;
}

const Map = ({
  center,
  markers,
  selectedMarker,
  onLoad,
  setSelectedMarker,
  directions,
}: MapProps) => {
  const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(
    null
  );

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={DEFAULT_ZOOM}
      onLoad={onLoad}
    >
      <DrawingManager
        onLoad={(dm) => (drawingManagerRef.current = dm)}
        options={{
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.POLYGON,
              google.maps.drawing.OverlayType.CIRCLE,
              google.maps.drawing.OverlayType.POLYLINE,
            ],
          },
        }}
      />

      <MarkerClusterer>
        {(clusterer) =>
          markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => setSelectedMarker(marker)}
              clusterer={clusterer}
            />
          ))
        }
      </MarkerClusterer>

      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>
            <h3 className="font-bold">{selectedMarker.title}</h3>
            <p>{selectedMarker.description}</p>
          </div>
        </InfoWindow>
      )}

      {directions && <DirectionsRenderer options={{ directions }} />}
    </GoogleMap>
  );
};

export default Map;
