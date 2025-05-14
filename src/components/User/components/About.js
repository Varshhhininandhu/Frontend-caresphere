import React from 'react';
import './About.css';
import { Link } from "react-router-dom";
import logo from '../addons/image.png';
import NavBar from './Navbar';

const About = () => {
  const founderProfiles = [
    {
      name: 'Varshini N.',
      photoUrl: 'Photo1.jpg',
      profileUrl: 'https://example.com/founder-profile-varshini'
    },
    {
      name: 'Manosri G.',
      photoUrl: 'Photo2.jpg',
      profileUrl: 'https://example.com/founder-profile-manosri'
    },
    {
      name: 'Mohamed Ashik A.',
      photoUrl: 'Photo3.jpg',
      profileUrl: 'https://example.com/founder-profile-mohamed'
    }
  ];

  return (
    <div className="about-page">
      <NavBar />
      <div className="about-container">
        <div className="about-content">
          <header className="about-header">
            <img src={logo} alt="Health Pros Logo" className="about-logo" />
            <h1 className="about-title">Welcome to Health Pros</h1>
            <p className="about-subtitle">Your Trusted Healthcare Companion</p>
          </header>

          <section className="about-section">
            <div className="about-description">
              <p>
                Health Pros is a leading healthcare platform dedicated to making medical care more accessible and convenient for everyone. Our goal is to provide an effortless experience for booking appointments, finding medical professionals, and accessing emergency services.
              </p>
            </div>

            <div className="about-features">
              <h2>Our Features</h2>
              <ul>
                <li>
                  <i className="fas fa-calendar-check feature-icon"></i>
                  <div>
                    <strong>Book Appointments</strong>
                    <p>Schedule appointments easily with our network of healthcare providers.</p>
                  </div>
                </li>
                <li>
                  <i className="fas fa-user-md feature-icon"></i>
                  <div>
                    <strong>Find Doctors</strong>
                    <p>Search for doctors based on your specific medical needs and history.</p>
                  </div>
                </li>
                <li>
                  <i className="fas fa-ambulance feature-icon"></i>
                  <div>
                    <strong>Emergency Services</strong>
                    <p>Quickly call for ambulance services in case of emergencies with our emergency button.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mission-vision">
              <div className="mission">
                <h2>Our Mission</h2>
                <p>
                  Our mission is to empower individuals by providing accessible, reliable, and efficient healthcare services. We strive to enhance the quality of healthcare through innovative technology and compassionate care.
                </p>
              </div>

              <div className="vision">
                <h2>Our Vision</h2>
                <p>
                  At Health Pros, we envision a future where healthcare is universally accessible, affordable, and personalized. Our aim is to make a positive impact on people's lives by delivering high-quality medical care and innovative solutions.
                </p>
              </div>
            </div>

            <div className="founders">
              <h2>Meet the Team</h2>
              <div className="founder-photos">
                {founderProfiles.map((founder, index) => (
                  <div key={index} className="founder-photo-item">
                    <a href={founder.profileUrl} target="_blank" rel="noopener noreferrer">
                      <img src={founder.photoUrl} alt={`${founder.name}`} className="founder-photo" />
                    </a>
                    <p>{founder.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-us">
              <h2>Contact Us</h2>
              <p>If you have any questions or need further information, feel free to reach out to us!</p>
              <a href="mailto:contact@healthpros.com" className="contact-link">contact@healthpros.com</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
