export interface Location {
  lat: number;
  lng: number;
}

export interface MapMarker extends Location {
  id: string;
  title: string;
  description: string;
}

export const DEFAULT_CENTER: Location = {
  lat: 40.7128,
  lng: -74.006,
};

export const DEFAULT_ZOOM = 12;

export const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};
