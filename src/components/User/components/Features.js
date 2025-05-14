import React from 'react';
import './Features.css';

const featuresData = [
  {
    imgSrc: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    heading: 'Patient Care',
    text: 'Enhanced patient care with detailed user information management.',
  },
  {
    imgSrc: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    heading: 'Doctor Recommendation',
    text: 'Recommendation of doctors based on specific diseases and conditions.',
  },
  {
    imgSrc: 'https://images.pexels.com/photos/7176317/pexels-photo-7176317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    heading: 'Appointment Booking',
    text: 'Efficient appointment booking connecting patients with suitable healthcare providers.',
  },
  {
    imgSrc: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    heading: 'Emergency Response',
    text: 'Advanced emergency feature sending geolocation to the nearest hospital.',
  }
];

const FeatureBox = ({ imgSrc, heading, text }) => (
  <div className="feature-box">
    <div className="feature-image" style={{ backgroundImage: `url(${imgSrc})` }}></div>
    <div className="feature-content">
      <h3 className="feature-heading">{heading}</h3>
      <p className="feature-text">{text}</p>
    </div>
  </div>
);

const Features = () => (
  <div className="features-wrapper">
    <h2 className="features-title">Features</h2>
    <div className="features-container">
      {featuresData.map((feature, index) => (
        <FeatureBox key={index} imgSrc={feature.imgSrc} heading={feature.heading} text={feature.text} />
      ))}
    </div>
  </div>
);

export default Features;
