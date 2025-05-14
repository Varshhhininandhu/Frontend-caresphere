import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../Assets/logo.png';
import './DoctorsPage.css'; // Import the CSS file
import Navbar from './AdminNavbar';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate(); // useNavigate for programmatic navigation

  // Function to fetch doctor data
  const fetchDoctors = async () => {
    try {
      const response = await fetch('https://backend-h6su.onrender.com/doctors/all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  // Fetch doctors when component mounts
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Filter doctors based on search input
  const filteredDoctors = doctors.filter((doctor) => {
    return (
      doctor?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      doctor?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      doctor?.email?.toLowerCase().includes(search.toLowerCase()) ||
      doctor?.phone?.toLowerCase().includes(search.toLowerCase()) ||
      doctor?.specialty?.toLowerCase().includes(search.toLowerCase()) ||
      doctor?.hospital?.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Handle doctor removal
  const handleRemoveDoctor = async (doctorId, index) => {
    try {
      const response = await fetch(`https://backend-h6su.onrender.com/doctors/${doctorId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newDoctors = [...doctors];
      newDoctors.splice(index, 1);
      setDoctors(newDoctors);
    } catch (error) {
      console.error('Error removing doctor:', error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear local storage
        localStorage.removeItem('username');
        localStorage.removeItem('role');

        // Redirect to home page
        navigate('/');
      }
    });
  };

  return (
    <div>
      <Navbar />
    <div className="admin-dashboard">
      <div className="main-content">
        <div className="header">
          <h1>Doctors</h1>
        </div>
        <div className="content">
          <div className="searchArea">
            <input
              type="text"
              placeholder="Search..."
              className="doctorListSearch"
              onChange={handleSearch}
              value={search}
            />
          </div>
          <div className="doctorList">
            {filteredDoctors.map((doctor, index) => (
              <div className="doctor-card" key={doctor.id}>
                <div className="doctor-image">
                  {doctor?.imageUrl ? (
                    <img src={doctor.imageUrl} alt="Doctor" />
                  ) : (
                    <div className="placeholder-image" />
                  )}
                </div>
                <div className="doctor-info">
                  <h3 className="username">{doctor?.name}</h3>
                  <p className="email">
                    Email: <a href={`mailto:${doctor?.email}`}>{doctor?.email}</a>
                  </p>
                  <p className="phone">Phone: {doctor?.phone}</p>
                  <p className="specialty">Specialty: {doctor?.specialty}</p>
                  <p className="hospital">Hospital: {doctor?.hospital}</p>
                  <p className="yearsOfExperience">Years of Experience: {doctor?.yearsOfExperience}</p>
                  <p className="description">{doctor?.description}</p>
                  <div className="button-group">
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveDoctor(doctor.id, index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DoctorsPage;
