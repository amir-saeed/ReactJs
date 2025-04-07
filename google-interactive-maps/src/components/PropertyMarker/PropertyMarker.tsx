import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faBuilding, 
  faWarehouse, 
  faStore, 
  faBed, 
  faBath, 
  faRuler 
} from '@fortawesome/free-solid-svg-icons';
import { PropertyMarkerProps } from '../../types';
import './PropertyMarker.scss';

const PropertyMarker: React.FC<PropertyMarkerProps> = ({ 
  property, 
  isHighlighted, 
  onClick 
}) => {
  const markerRef = useRef<HTMLDivElement>(null);
  const markerContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!markerContainerRef.current) {
      markerContainerRef.current = document.createElement('div');
    }
    
    return () => {
      if (markerContainerRef.current) {
        markerContainerRef.current.remove();
      }
    };
  }, []);

  // Helper function to get the appropriate icon
  const getPropertyIcon = () => {
    switch (property.type) {
      case 'home':
        return faHome;
      case 'building':
        return faBuilding;
      case 'warehouse':
        return faWarehouse;
      case 'store-alt':
        return faStore;
      default:
        return faHome;
    }
  };

  // Prepare class names
  const propertyClasses = [
    'property',
    `property--${property.type}`,
    isHighlighted ? 'property--highlight' : ''
  ].filter(Boolean).join(' ');

  return createPortal(
    <div 
      ref={markerRef}
      className={propertyClasses}
      onClick={onClick}
      title={property.description}
    >
      <div className="property__icon">
        <FontAwesomeIcon icon={getPropertyIcon()} />
      </div>
      <div className="property__details">
        <div className="property__price">{property.price}</div>
        <div className="property__address">{property.address}</div>
        <div className="property__features">
          <div className="property__features-item">
            <FontAwesomeIcon icon={faBed} className="property__bed" />
            <span>{property.bed}</span>
          </div>
          <div className="property__features-item">
            <FontAwesomeIcon icon={faBath} className="property__bath" />
            <span>{property.bath}</span>
          </div>
          <div className="property__features-item">
            <FontAwesomeIcon icon={faRuler} className="property__size" />
            <span>{property.size} ft<sup>2</sup></span>
          </div>
        </div>
      </div>
    </div>,
    markerContainerRef.current as HTMLElement
  );
};

export default PropertyMarker;