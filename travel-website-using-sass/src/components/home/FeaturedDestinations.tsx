import React from 'react';
import { Destination } from '../../types';
import Container from '../shared/Container';
import Card from '../shared/Card';
import Button from '../shared/Button';

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
  }
];

const FeaturedDestinations: React.FC = () => {
  return (
    <section className="featured">
      <Container>
        <div className="section-title">
          <h2>Featured Destinations</h2>
          <p>Explore our handpicked selection of the most popular travel experiences around the world.</p>
        </div>
        
        <div className="featured__grid">
          {destinations.map((destination) => (
            <Card key={destination.id} destination={destination} />
          ))}
        </div>
        
        <div className="text-center" style={{ marginTop: '2rem' }}>
          <Button variant="primary" href="/destinations">View All Destinations</Button>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedDestinations;