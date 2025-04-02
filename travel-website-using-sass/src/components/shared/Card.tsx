import React from 'react';
import { CardProps } from '../../types';
import Button from './Button';

const Card: React.FC<CardProps> = ({ destination }) => {
    const { title, location, description, image, price, duration } = destination;

    return (
        <div className="card">
            <img src={image} alt={title} className="card__image" />
            <div className="card__content">
                <h3 className="card__title">{title}</h3>
                <p className="card__description">
                    <strong>{location}</strong> • {duration}
                </p>
                <p className="card__description">{description}</p>
                <div className="card__price">${price.toLocaleString()} / person</div>
                <div className="card__footer">
                    <Button variant="primary" size="small">View Details</Button>
                </div>
            </div>
        </div>
    );
};

export default Card;