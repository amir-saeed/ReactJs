import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
    styleURL: string;
    token: string;
    geojsonData: GeoJSON.FeatureCollection;
    filteredFeatures: GeoJSON.Feature[];
    onFeatureClick?: (feature: GeoJSON.Feature, coordinates: { x: number; y: number }) => void;
}

const Map: React.FC<MapProps> = ({
    styleURL,
    token,
    geojsonData,
    filteredFeatures,
    onFeatureClick,
}) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);

    const getPinColors = (type: string) => {
        switch (type) {
            case "hotel":
                return { circle: "bg-red-500", tail: "border-red-500" };
            case "conference":
                return { circle: "bg-green-500", tail: "border-green-500" };
            case "resort":
                return { circle: "bg-blue-500", tail: "border-blue-500" };
            default:
                return { circle: "bg-gray-500", tail: "border-gray-500" };
        }
    };
    

    useEffect(() => {
        // Set token
        mapboxgl.accessToken = token;

        // Initialize map only once
        if (!mapInstance.current && mapContainer.current) {
            mapInstance.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: styleURL,
                center: [-0.118092, 51.509865], // London
                zoom: 9,
            });

            // On map load, add the source & layer
            mapInstance.current.on("load", () => {
                // Add a new source for the venues
                mapInstance.current?.addSource("venues", {
                    type: "geojson",
                    data: {
                        ...geojsonData,
                        features: filteredFeatures,
                    },
                });

                // Add a circle layer for markers with color-coding
                mapInstance.current?.addLayer({
                    id: "venues-layer",
                    type: "circle",
                    source: "venues",
                    paint: {
                        "circle-color": [
                            "match",
                            ["get", "type"],
                            "hotel",
                            "#FF0000",
                            "resort",
                            "#00FF00",
                            "conference",
                            "#0000FF",
                            /* else */ "#888888",
                        ],
                        "circle-radius": 8,
                    },
                });

                // Updated click handler to pass screen coordinates
                mapInstance.current?.on("click", "venues-layer", (e) => {
                    if (!e.features || e.features.length === 0 || !onFeatureClick) return;
                    
                    const feature = e.features[0] as GeoJSON.Feature;
                    
                    // Get the screen coordinates of the click
                    const screenCoordinates = {
                        x: e.point.x,
                        y: e.point.y
                    };
                    
                    onFeatureClick(feature, screenCoordinates);
                });

                // Cursor pointer on hover
                mapInstance.current?.on("mouseenter", "venues-layer", () => {
                    mapInstance.current?.getCanvas().style.setProperty("cursor", "pointer");
                });
                mapInstance.current?.on("mouseleave", "venues-layer", () => {
                    mapInstance.current?.getCanvas().style.setProperty("cursor", "");
                });
            });
        }
    }, [token, styleURL, geojsonData, filteredFeatures, onFeatureClick]);

    // Update map source when filteredFeatures changes
    useEffect(() => {
        if (mapInstance.current?.getSource("venues")) {
            const source = mapInstance.current.getSource("venues") as mapboxgl.GeoJSONSource;
            source.setData({
                ...geojsonData,
                features: filteredFeatures,
            });
        }
    }, [filteredFeatures, geojsonData]);

    return (
        <div
            ref={mapContainer}
            className="w-full h-[800px] border border-gray-300"
        />
    );
};

export default Map;