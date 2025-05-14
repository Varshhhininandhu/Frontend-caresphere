import React, { useState } from 'react';
import './Feedback.css';
import { FaSmile, FaMeh, FaFrown, FaThumbsUp, FaTrophy } from 'react-icons/fa';
import { Link } from "react-router-dom";
import logo from'./addons/image.png'
import NavBar from './components/Navbar';
const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [websiteExperience, setWebsiteExperience] = useState('');
  const [bugImage, setBugImage] = useState(null);
  const [likedFeatures, setLikedFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleWebsiteExperienceChange = (event) => {
    setWebsiteExperience(event.target.value);
  };

  const handleBugImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBugImage(URL.createObjectURL(file));
    }
  };

  const handleNewFeatureChange = (event) => {
    setNewFeature(event.target.value);
  };

  const addFeature = () => {
    if (newFeature) {
      setLikedFeatures([...likedFeatures, newFeature]);
      setNewFeature('');
    }
  };

  const removeFeature = (index) => {
    setLikedFeatures(likedFeatures.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can send feedback to a server or database
    console.log(`Rating: ${rating}, Feedback: ${feedback}, Website Experience: ${websiteExperience}`);
    console.log(`Liked Features: ${likedFeatures}`);
    console.log(`Bug Image: ${bugImage ? bugImage.name : 'No Image Uploaded'}`);
    
    // Show confirmation modal
    setShowModal(true);

    // Reset form
    setRating(0);
    setFeedback('');
    setWebsiteExperience('');
    setBugImage(null);
    setLikedFeatures([]);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <NavBar />
    <div className="feedback-container">
      <h2>We Value Your Feedback</h2>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="feedback-section">
          <h3>Rate Your Overall Experience</h3>
          <div className="emoji-rating">
            <label>
              <input
                type="radio"
                name="rating"
                value="1"
                checked={rating === 1}
                onChange={handleRatingChange}
              />
              <FaFrown className="rating-icon" />
              <span>Bad</span>
            </label>
            <label>
              <input
                type="radio"
                name="rating"
                value="2"
                checked={rating === 2}
                onChange={handleRatingChange}
              />
              <FaMeh className="rating-icon" />
              <span>Okay</span>
            </label>
            <label>
              <input
                type="radio"
                name="rating"
                value="3"
                checked={rating === 3}
                onChange={handleRatingChange}
              />
              <FaSmile className="rating-icon" />
              <span>Good</span>
            </label>
            <label>
              <input
                type="radio"
                name="rating"
                value="4"
                checked={rating === 4}
                onChange={handleRatingChange}
              />
              <FaThumbsUp className="rating-icon" />
              <span>Great</span>
            </label>
            <label>
              <input
                type="radio"
                name="rating"
                value="5"
                checked={rating === 5}
                onChange={handleRatingChange}
              />
              <FaTrophy className="rating-icon" />
              <span>Excellent</span>
            </label>
          </div>
        </div>

        <div className="feedback-section">
          <h3>What Did You Love About Our Website? (Optional)</h3>
          <textarea
            value={websiteExperience}
            onChange={handleWebsiteExperienceChange}
            placeholder="Tell us what you enjoyed about our website..."
          />
        </div>

        <div className="feedback-section">
          <h3>Features You Liked</h3>
          <div className="features-liked">
            <input
              type="text"
              value={newFeature}
              onChange={handleNewFeatureChange}
              placeholder="Add a feature you liked"
            />
            <button type="button" onClick={addFeature}>Add</button>
          </div>
          <ul className="feature-list">
            {likedFeatures.map((feature, index) => (
              <li key={index} className="feature-item">
                <span>{feature}</span>
                <button type="button" onClick={() => removeFeature(index)}>&times;</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="feedback-section">
          <h3>Upload an Image (Faced Any Bugs in Our Service)</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleBugImageChange}
          />
          {bugImage && (
            <div className="image-preview">
              <img src={bugImage} alt="Bug Preview" />
            </div>
          )}
        </div>

        <button type="submit">Submit Feedback</button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Thank You for Your Feedback!</h3>
            <p>Your feedback has been submitted successfully.</p>
            <Link to="/">
            <button onClick={closeModal} className="close-modal-btn">Close</button>
            </Link>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Feedback;
