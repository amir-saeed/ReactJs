export interface PropertyPosition {
    lat: number;
    lng: number;
}

export type PropertyType = 'home' | 'building' | 'warehouse' | 'store-alt';

export interface Property {
    id: string;
    address: string;
    description: string;
    price: string;
    type: PropertyType;
    bed: number;
    bath: number;
    size: number;
    position: PropertyPosition;
}

export interface MapProps {
    initialCenter?: PropertyPosition;
    zoom?: number;
    properties: Property[];
}

export interface PropertyMarkerProps {
    property: Property;
    isHighlighted: boolean;
    onClick: () => void;
}