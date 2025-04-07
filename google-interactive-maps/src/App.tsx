import React from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import Map from './components/Map/Map';
import { properties } from './data/properties';
import './App.scss';

const App: React.FC = () => {
  return (
    <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
      <Map
        properties={properties}
        initialCenter={{
          lat: parseFloat(import.meta.env.VITE_MAP_CENTER_LAT),
          lng: parseFloat(import.meta.env.VITE_MAP_CENTER_LNG),
        }}
        zoom={11}
      />
    </APIProvider>
  );
};

export default App;

