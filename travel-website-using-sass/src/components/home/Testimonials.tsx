import React from 'react';
import { Testimonial } from '../../types';
import Container from '../shared/Container';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    quote: `Our trip to Bali was absolutely perfect! The accommodation, guides, and activities were all first-class. I can't recommend Wanderlust enough!`,
    avatar: 'https://i.pravatar.cc/100?img=1'
  },
  {
    id: 2,
    name: 'David Chen',
    location: 'Toronto, Canada',
    quote: 'The Paris tour exceeded all my expectations. The local knowledge of our guide made all the difference in experiencing the city like a local.',
    avatar: 'https://i.pravatar.cc/100?img=2'
  },
  {
    id: 3,
    name: 'Emma Williams',
    location: 'London, UK',
    quote: 'Santorini was a dream come true! Everything from the booking process to the return flight was seamless. Will definitely book with Wanderlust again!',
    avatar: 'https://i.pravatar.cc/100?img=3'
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="testimonials">
      <Container>
        <div className="section-title">
          <h2>What Our Travelers Say</h2>
          <p>Hear from our happy customers about their unforgettable travel experiences.</p>
        </div>
        
        <div className="testimonials__grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonials__item">
              <p className="testimonials__quote">"{testimonial.quote}"</p>
              <div className="testimonials__author">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="testimonials__avatar" 
                />
                <div>
                  <div className="testimonials__name">{testimonial.name}</div>
                  <div className="testimonials__location">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;