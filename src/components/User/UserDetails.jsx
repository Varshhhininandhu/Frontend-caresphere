import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserDetails.css'; // External CSS file for styling
import NavBar from './components/Navbar';

const UserDetails = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '', // Add age to the form data
    email: '',
    phone: '',
    emergencyContact: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    isPregnant: false,
    monthOfPregnancy: '',
    expectedDeliveryDate: '',
    consultingDoctor: '',
    hadDiseaseBefore: false,
    selectedDisease: '',
    diseaseConsultingDoctor: '',
    medicalHistory: '',
    username: '',  // Add username to the form data
  });

  const navigate = useNavigate();

  // Fetch the username from local storage
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setFormData((prevData) => ({
        ...prevData,
        username: username, // Set the username in form data
      }));
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/userdetails', formData);
      console.log('User Details Saved:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  return (
    <div>
      <NavBar />
    <div className="user-details-container">
      <div className="user-details-card">
        <div className="user-details-header">
          <h2>User Details</h2>
        </div>
        <div className="user-details-body">
          <form onSubmit={handleSubmit}>
            {['firstName', 'lastName', 'age', 'email', 'phone', 'emergencyContact', 'address'].map((field) => (
              <div className="form-group" key={field}>
                <label className="form-label">{field.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
                <input
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                />
              </div>
            ))}
            <div className="form-group">
              <label className="form-label">Date of Birth:</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group checkbox-group">
              <label className="form-label">
                <input
                  type="checkbox"
                  name="isPregnant"
                  checked={formData.isPregnant}
                  onChange={handleInputChange}
                />
                Is Pregnant
              </label>
            </div>
            {formData.isPregnant && (
              <>
                <div className="form-group">
                  <label className="form-label">Month of Pregnancy:</label>
                  <input
                    type="number"
                    name="monthOfPregnancy"
                    value={formData.monthOfPregnancy}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter month"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Expected Delivery Date:</label>
                  <input
                    type="date"
                    name="expectedDeliveryDate"
                    value={formData.expectedDeliveryDate}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </>
            )}
            <div className="form-group">
              <label className="form-label">Consulting Doctor:</label>
              <input
                type="text"
                name="consultingDoctor"
                value={formData.consultingDoctor}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter consulting doctor name"
              />
            </div>
            <div className="form-group checkbox-group">
              <label className="form-label">
                <input
                  type="checkbox"
                  name="hadDiseaseBefore"
                  checked={formData.hadDiseaseBefore}
                  onChange={handleInputChange}
                />
                Had Disease Before
              </label>
            </div>
            {formData.hadDiseaseBefore && (
              <>
                <div className="form-group">
                  <label className="form-label">Selected Disease:</label>
                  <input
                    type="text"
                    name="selectedDisease"
                    value={formData.selectedDisease}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter selected disease"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Disease Consulting Doctor:</label>
                  <input
                    type="text"
                    name="diseaseConsultingDoctor"
                    value={formData.diseaseConsultingDoctor}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter consulting doctor name"
                  />
                </div>
              </>
            )}
            <div className="form-group">
              <label className="form-label">Medical History:</label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Enter medical history"
              />
            </div>
            <button type="submit" className="form-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserDetails;
