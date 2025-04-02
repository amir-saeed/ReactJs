import React from 'react';
import { Destination } from '../types';
import Container from '../components/shared/Container';
import Card from '../components/shared/Card';

const destinations: Destination[] = [
  {
    id: 1,
    title: 'Bali Paradise',
    location: 'Bali, Indonesia',
    description: 'Experience the perfect blend of stunning beaches, lush rice terraces, and vibrant culture.',
    image: '/images/destination-1.jpg',
    price: 1299,
    rating: 4.8,
    duration: '7 days'
  },
  {
    id: 2,
    title: 'Parisian Elegance',
    location: 'Paris, France',
    description: 'Discover the city of lights with its iconic landmarks, world-class cuisine, and romantic atmosphere.',
    image: '/images/destination-2.avif',
    price: 1499,
    rating: 4.7,
    duration: '5 days'
  },
  {
    id: 3,
    title: 'Aegean Serenity',
    location: 'Santorini, Greece',
    description: 'Relax in the stunning white-washed villages perched on volcanic cliffs overlooking the azure sea.',
    image: '/images/destination-3.avif',
    price: 1799,
    rating: 4.9,
    duration: '6 days'
  },
  {
    id: 4,
    title: 'Tokyo Adventure',
    location: 'Tokyo, Japan',
    description: 'Navigate the bustling streets of this ultramodern city while experiencing ancient Japanese traditions.',
    image: '/images/destination-1.jpg',
    price: 2199,
    rating: 4.8,
    duration: '8 days'
  },
  {
    id: 5,
    title: 'Tuscan Retreat',
    location: 'Tuscany, Italy',
    description: 'Indulge in the best of Italian cuisine, wine, and picturesque countryside views.',
    image: '/images/destination-44.avif',
    price: 1599,
    rating: 4.7,
    duration: '6 days'
  },
  {
    id: 6,
    title: 'Mayan Discovery',
    location: 'Yucatan, Mexico',
    description: 'Explore ancient ruins, swim in cenotes, and enjoy the beautiful beaches of the Riviera Maya.',
    image: '/images/04d75830.avif',
    price: 1399,
    rating: 4.6,
    duration: '7 days'
  }
];

const Destinations: React.FC = () => {
  return (
    <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
      <Container>
        <div className="section-title" style={{ marginTop: '2rem' }}>
          <h1>Our Destinations</h1>
          <p>Explore our curated selection of incredible travel destinations.</p>
        </div>
        
        <div className="featured__grid" style={{ marginBottom: '3rem' }}>
          {destinations.map((destination) => (
            <Card key={destination.id} destination={destination} />
          ))}
        </div>
      </Container>
    </main>
  );
};

export default Destinations;