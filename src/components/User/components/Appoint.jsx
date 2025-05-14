import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Appoint.css';
import NavBar from './Navbar';
import Footer from './Footer';

const Appoint = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedAppointment, setExpandedAppointment] = useState(null);
  const appointmentsPerPage = 5;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const username = localStorage.getItem('username');
        if (username) {
          const response = await axios.get(`https://backend-h6su.onrender.com/appointments/user`, {
            params: {
              username: username,
              'statuses[]': ['pending', 'accepted'],
            },
            paramsSerializer: (params) => {
              return Object.keys(params)
                .map((key) => {
                  const value = params[key];
                  if (Array.isArray(value)) {
                    return value.map((val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&');
                  }
                  return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
                })
                .join('&');
            },
          });
          setAppointments(response.data);
        } else {
          setError('Username not found in local storage.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Failed to load appointments.');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (appointmentId) => {
    try {
      await axios.delete(`https://backend-h6su.onrender.com/appointments/${appointmentId}`);
      setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
    } catch (error) {
      console.error('Error deleting appointment:', error);
      setError('Failed to delete appointment.');
    }
  };

  const handleAppointmentClick = (appointmentId) => {
    setExpandedAppointment(expandedAppointment === appointmentId ? null : appointmentId);
  };

  const sortedAppointments = appointments
    .filter((appointment) => statusFilter === 'all' || appointment.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.appointmentDate) - new Date(b.appointmentDate);
      } else if (sortBy === 'time') {
        return a.appointmentTime.localeCompare(b.appointmentTime);
      } else {
        return 0;
      }
    });

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = sortedAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const totalPages = Math.ceil(sortedAppointments.length / appointmentsPerPage);

  return (
    <div className="appointments-container">
      <NavBar />
      <h2 className="appointments-header">Your Appointments</h2>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <div className="controls">
            <select className="sort-select" value={sortBy} onChange={handleSortChange}>
              <option value="date">Sort by Date</option>
              <option value="time">Sort by Time</option>
            </select>
            <select className="status-filter" value={statusFilter} onChange={handleStatusFilterChange}>
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
          <ul className="appointments-list">
            {currentAppointments.map((appointment) => (
              <li
                key={appointment.id}
                className={`appointment-card ${appointment.status === 'accepted' ? 'accepted' : 'pending'}`}
                onClick={() => handleAppointmentClick(appointment.id)}
              >
                <div className="appointment-info">
                  <img src={appointment.doctorImageUrl} alt="Doctor" className="doctor-image" />
                  <div className="appointment-details">
                    <span className="doctor-name">{appointment.doctorname}</span>
                    <span className="appointment-date">{appointment.appointmentDate}</span>
                  </div>
                </div>
                <div className="appointment-controls">
                  <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(appointment.id); }}>Delete</button>
                </div>
                {expandedAppointment === appointment.id && (
                  <div className="appointment-details-expanded">
                    <p><strong>Email:</strong> {appointment.doctorEmail}</p>
                    <p><strong>Phone:</strong> {appointment.doctorPhone}</p>
                    <p><strong>Specialty:</strong> {appointment.doctorSpecialty}</p>
                    <p><strong>Location:</strong> {appointment.doctorHospital}</p>
                    <p><strong>Time:</strong> {appointment.appointmentTime}</p>
                    <p><strong>Status:</strong> {appointment.status}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="pagination-controls">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Appoint;
