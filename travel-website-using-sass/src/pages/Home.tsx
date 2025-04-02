import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedDestinations from '../components/home/FeaturedDestinations';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <FeaturedDestinations />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;