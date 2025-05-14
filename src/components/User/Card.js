// Card.js
import React from 'react';
import './Card.css'; // Ensure you have appropriate styles in Card.css

const Card = ({ img, title, specialty, hospital, yearsOfExperience, children }) => {
  return (
    <div className="card">
      <img src={img} alt={title} className="card-img" />
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-specialty"><strong>Specialty:</strong> {specialty}</p>
        <p className="card-hospital"><strong>Hospital:</strong> {hospital}</p>
        <p className="card-experience"><strong>Years of Experience:</strong> {yearsOfExperience}</p>
        {children}
      </div>
    </div>
  );
};

export default Card;
