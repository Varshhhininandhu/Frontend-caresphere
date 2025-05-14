import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Quote.css';
import backgroundImage from '../addons/doc3.jpg'; 

const Quote = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const username = localStorage.getItem('username');
    if (username) {
      navigate('/doctors');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="quote-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="quote-content">
        <h1>Welcome to Our Doctor Consultant Service</h1>
        <p>Your health is our priority. Get expert advice and personalized care from our experienced doctors.</p>
        <button className="appointment-button" onClick={handleButtonClick}>Book an Appointment</button>
      </div>
    </div>
  );
};

export default Quote;
