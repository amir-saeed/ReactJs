import React from 'react';
import {
  Map as GoogleMap,
  AdvancedMarker,
  Pin
} from '@vis.gl/react-google-maps';
import { MapProps } from '../../types';
import './Map.scss';

const MapComponent: React.FC<MapProps> = ({ initialCenter, zoom, properties }) => {
  return (
    <div className="map">
      <GoogleMap
        defaultCenter={initialCenter}
        defaultZoom={zoom}
        mapId="4504f8b37365c3d0"
        style={{ width: '100%', height: '100%' }}
      >
        {properties.map((property) => (
          <AdvancedMarker
            key={property.id}
            position={property.position}
            title={property.description}
          >
            <Pin background="#FBBC04" glyphColor="#000" borderColor="#000" />
          </AdvancedMarker>
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
