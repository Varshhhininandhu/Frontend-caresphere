import React from 'react';
import './AboutUs.css';
import aboutimg from '../addons/aboutimg.png'
const AboutUs = () => {
  return (
    <div className="about-us-wrapper">
      <div className="about-us-text">
        <h2>About Us</h2>
        <p>
          At HEALTH PROS, we are dedicated to enhancing patient care and optimizing medical service delivery. Our platform connects patients with healthcare providers in a streamlined, efficient manner.
        </p>
        <p>
          Our mission is to leverage technology to improve healthcare access and quality. We aim to empower patients and healthcare professionals with tools that enhance communication, reduce inefficiencies, and improve overall outcomes.
        </p>
      </div>
      <div className="about-us-image-container">
        <img src={aboutimg} alt="About Us" className="about-us-image" />
      </div>
    </div>
  );
};

export default AboutUs;
