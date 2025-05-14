import React, { useState, useEffect } from 'react';
import styles from './Emergency.module.css'; // Import CSS module
import { FaExclamationTriangle, FaChevronRight, FaExternalLinkAlt } from 'react-icons/fa';
import { toast } from 'react-toastify'; // For notifications
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // For displaying the map
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import { Link } from 'react-router-dom'; // For routing
import NavBar from './Navbar';
import Footer from './Footer';


const EmergencyPage = () => {
  const [sosSent, setSosSent] = useState(false);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [nearestHospital, setNearestHospital] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const fetchUserDetails = async (username) => {
    try {
      const response = await fetch(`http://localhost:8080/userdetails/user?username=${username}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.length > 0) setUserDetails(data[0]);
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error('Error fetching user details.');
    }
  };

  const fetchAddress = async (loc) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.latitude}&lon=${loc.longitude}`);
      const data = await response.json();
      setAddress(data && data.display_name ? data.display_name : 'Address not found');
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Address not found');
    }
  };

  const fetchNearestHospital = async (loc) => {
    try {
      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="hospital"](around:5000,${loc.latitude},${loc.longitude});out;`
      );
      const data = await response.json();
      setNearestHospital(data.elements && data.elements.length > 0 ? data.elements[0].tags.name : 'No hospital found nearby.');
    } catch (error) {
      console.error('Error fetching nearest hospital:', error);
      setNearestHospital('Unable to retrieve hospital information.');
    }
  };

  const handleSendSOS = () => {
    const username = localStorage.getItem('username');
    if (!username) {
      alert('No username found in local storage.');
      return;
    }

    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const loc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(loc);
        setLoading(true); // Set loading state
        fetchAddress(loc);
        fetchNearestHospital(loc);
        fetchUserDetails(username);
      },
      error => {
        console.error('Geolocation error:', error.message);
        alert(`Unable to retrieve your location. Error: ${error.message}`);
      }
    );
  };

  useEffect(() => {
    if (location && userDetails) {
      sendSosNotification();
    }
  }, [location, userDetails]);

  const sendSosNotification = () => {
    if (userDetails) {
      console.log(`Sending SOS to ${userDetails.emergencyContact} with location: ${location.latitude}, ${location.longitude}`);
      console.log(`Notifying ${nearestHospital} with location: ${location.latitude}, ${location.longitude}`);
      toast.success('SOS sent successfully!');
    }
    setSosSent(true);
    setLoading(false);
  };

  return (
    <div>
      <NavBar />
      <div className={styles.emergencyPage}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.pageTitle}>Emergency Services</h1>

          {!sosSent ? (
            <>
              <div className={styles.emergencyActions}>
                <button className={`${styles.actionButton} ${styles.sosButton}`} onClick={handleSendSOS} disabled={loading}>
                  <FaExclamationTriangle className={styles.icon} /> {loading ? 'Sending SOS...' : 'Send SOS'}
                </button>
              </div>

              <div className={styles.emergencySteps}>
                <h2 className={styles.emergencyStepsTitle}>Key Emergency Actions</h2>
                <ul className={styles.emergencyStepsList}>
                  <li className={styles.emergencyStepsItem}>
                    <FaChevronRight className={styles.stepIcon} />
                    <span>Assess the situation to confirm it's an emergency.</span>
                  </li>
                  <li className={styles.emergencyStepsItem}>
                    <FaChevronRight className={styles.stepIcon} />
                    <span>Use the “Send SOS” button to alert emergency contacts.</span>
                  </li>
                  <li className={styles.emergencyStepsItem}>
                    <FaChevronRight className={styles.stepIcon} />
                    <span>Stay calm and gather critical information (location, condition).</span>
                  </li>
                  <li className={styles.emergencyStepsItem}>
                    <FaChevronRight className={styles.stepIcon} />
                    <span>Follow on-screen instructions and stay safe until help arrives.</span>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className={styles.sosConfirmation}>
              <h2 className={styles.sosConfirmationTitle}>SOS Sent Successfully!</h2>
              <p className={styles.sosConfirmationText}><strong>Address:</strong> {address}</p>
              <p className={styles.sosConfirmationText}><strong>Location:</strong> {location.latitude}, {location.longitude}</p>
              {userDetails && (
                <>
                  <p className={styles.sosConfirmationText}><strong>Patient Name:</strong> {userDetails.firstName} {userDetails.lastName}</p>
                  <p className={styles.sosConfirmationText}><strong>Age:</strong> {userDetails.age}</p>
                  <p className={styles.sosConfirmationText}><strong>Condition:</strong> {userDetails.selectedDisease}</p>
                  <p className={styles.sosConfirmationText}><strong>Contact:</strong> {userDetails.phone}</p>
                  <p className={styles.sosConfirmationText}><strong>Emergency Contact:</strong> {userDetails.emergencyContact}</p>
                  <p className={styles.sosConfirmationText}><strong>Hospital Contacted:</strong> {nearestHospital}</p>
                </>
              )}
              <div className={styles.mapContainer}>
                <MapContainer center={[location.latitude, location.longitude]} zoom={13} className={styles.map}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[location.latitude, location.longitude]}>
                    <Popup>
                      You are here. <br /> {address}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
              <button className={styles.backButton} onClick={() => setSosSent(false)}>Back to Emergency Page</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmergencyPage;
