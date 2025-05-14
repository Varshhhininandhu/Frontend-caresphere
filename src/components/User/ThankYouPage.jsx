import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ThankYouPage.css'; // Import custom styles
import logo from './addons/image.png';
// Import specific icons from the react-icons library
import { FaCalendarAlt, FaClock, FaRegLaughBeam, FaCheckCircle } from 'react-icons/fa';
import NavBar from './components/Navbar';

const ThankYou = () => {
  const location = useLocation();
  const { doctorName, appointmentDate, appointmentTime } = location.state || {};

  return (
    <div>
      <NavBar />
      <div className="thank-you-container">
        <div className="thank-you-card">
          <div className="thank-you-header">
            <h1>
              <span className="icon-container">
                <FaRegLaughBeam className="thank-you-icon" />
              </span>
              Thank You!
            </h1>
            <p>
              Your appointment with <strong>{doctorName}</strong> has been successfully booked. We’re excited to see you on <strong>{appointmentDate}</strong> at <strong>{appointmentTime}</strong>!
            </p>
          </div>

          {/* Appointment Details Section */}
          <div className="appointment-details">
            <div className="appointment-info">
              <p>
                <FaCalendarAlt className="icon" /> <strong>Date:</strong> {appointmentDate}
              </p>
              <p>
                <FaClock className="icon" /> <strong>Time:</strong> {appointmentTime}
              </p>
            </div>
            <div className="appointment-image">
              <img src="thnks3.jpg" alt="Doctor" />
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="additional-info">
            <h3>🎯 Next Steps</h3>
            <ul>
              <li><FaCheckCircle className="icon" /> Review any pre-appointment instructions sent by our office.</li>
              <li><FaCheckCircle className="icon" /> Complete any necessary paperwork ahead of time.</li>
              <li><FaCheckCircle className="icon" /> Confirm your insurance details and coverage.</li>
            </ul>
          </div>

          {/* Tips Section */}
          <div className="tips">
            <h3>📝 Tips for a Smooth Visit</h3>
            <p>
              Arrive at least 10 minutes early to check in and relax before your appointment. Bring any relevant medical records or test results to help your doctor make informed decisions.
            </p>
          </div>

          {/* Feedback Submission Section */}
          <div className="feedback-section">
            <h3>📢 We Value Your Feedback</h3>
            <p>Help us improve by sharing your experience with us. Click the button below to provide your feedback.</p>
            <Link to="/feedback">
              <button className="feedback-btn">
                Submit Feedback
              </button>
            </Link>
          </div>

          {/* Back to Home Button */}
          <div className="back-to-home">
            <Link to="/">
              <button className="back-home-btn">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
