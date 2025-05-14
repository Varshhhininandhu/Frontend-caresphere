import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../Assets/logo.png';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');

    if (username) {
      axios.get(`https://backend-h6su.onrender.com/appointments/doctor?doctorusername=${username}&status=pending`)
        .then(response => {
          setAppointments(response.data);
        })
        .catch(err => {
          setError('Failed to fetch appointments');
          console.error(err);
        });
    } else {
      setError('No username found in local storage');
    }
  }, []);

  const handleAccept = (id) => {
    axios.patch(`https://backend-h6su.onrender.com/appointments/${id}/completed`)
      .then(() => {
        setAppointments(prevAppointments =>
          prevAppointments.map(appointment =>
            appointment.id === id ? { ...appointment, status: 'accepted' } : appointment
          )
        );
      })
      .catch(err => {
        setError('Failed to accept the appointment');
        console.error(err);
      });
  };

  const handleMarkCompleted = (id) => {
    axios.patch(`https://backend-h6su.onrender.com/appointments/${id}/completed`)
      .then(() => {
        setAppointments(prevAppointments =>
          prevAppointments.map(appointment =>
            appointment.id === id ? { ...appointment, status: 'completed' } : appointment
          )
        );
      })
      .catch(err => {
        setError('Failed to mark the appointment as completed');
        console.error(err);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://backend-h6su.onrender.com/appointments/${id}`)
          .then(() => {
            setAppointments(prevAppointments =>
              prevAppointments.filter(appointment => appointment.id !== id)
            );
            Swal.fire('Deleted!', 'The appointment has been deleted.', 'success');
          })
          .catch(err => {
            setError('Failed to delete the appointment');
            console.error(err);
            Swal.fire('Error!', 'Failed to delete the appointment.', 'error');
          });
      }
    }).catch(err => {
      console.error('SweetAlert2 Error:', err);
    });
  };

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
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        navigate('/');
      }
    }).catch(err => {
      console.error('SweetAlert2 Error:', err);
    });
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  return (
    <div style={styles.mainContent}>
      <div style={styles.topNav}>
        <div style={styles.logo}>
          <img src={logo} alt="Logo" style={styles.logoImage} />
          <h2 style={styles.logoText}>CARESPHERE</h2>
        </div>
        <div style={styles.navbar}>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <Link to="/doctor/home" style={styles.navLink}>Dashboard</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/doctor/pat" style={styles.navLink}>Patients</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/doctor/app" style={styles.navLink}>Appointments</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/doctor/his" style={styles.navLink}>Consultation History</Link>
            </li>
            <li style={styles.navItem}>
              <button onClick={handleLogout} style={styles.navButton}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
      <div style={styles.content}>
        <h1 style={styles.headerTitle}>Appointments</h1>
        <hr style={styles.separator} />
        {error && <p style={styles.errorText}>{error}</p>}
        <div style={styles.appointmentContainer}>
          <div style={styles.appointmentList}>
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                style={{
                  ...styles.appointmentCard,
                  backgroundColor: appointment.status === 'pending' ? '#fcefc7' : '#e0f7fa',
                }}
                onClick={() => handleAppointmentClick(appointment)}
              >
                <h3 style={styles.appointmentTitle}>Appointment {appointment.id}</h3>
                <p style={styles.infoText}><strong>Patient:</strong> {appointment.username}</p>
                <p style={styles.infoText}><strong>Date:</strong> {appointment.appointmentDate}</p>
                <p style={styles.infoText}><strong>Time:</strong> {appointment.appointmentTime}</p>
                <div style={styles.actions}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAccept(appointment.id);
                    }}
                    style={styles.actionButton}
                  >
                    Accept
                  </button>
                  {appointment.status === 'accepted' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkCompleted(appointment.id);
                      }}
                      style={styles.actionButton}
                    >
                      Mark as Completed
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(appointment.id);
                    }}
                    style={{ ...styles.actionButton, backgroundColor: '#dc3545' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          {selectedAppointment && (
            <div style={styles.detailsPanel}>
              <h2 style={styles.detailsTitle}>Appointment Details</h2>
              <p><strong>Patient:</strong> {selectedAppointment.username}</p>
              <p><strong>Doctor:</strong> {selectedAppointment.doctorname}</p>
              <p><strong>Date:</strong> {selectedAppointment.appointmentDate}</p>
              <p><strong>Time:</strong> {selectedAppointment.appointmentTime}</p>
              <p><strong>Status:</strong> {selectedAppointment.status}</p>
              <div style={styles.actions}>
                {selectedAppointment.status === 'pending' && (
                  <button
                    onClick={() => handleAccept(selectedAppointment.id)}
                    style={styles.actionButton}
                  >
                    Accept
                  </button>
                )}
                {selectedAppointment.status === 'accepted' && (
                  <button
                    onClick={() => handleMarkCompleted(selectedAppointment.id)}
                    style={styles.actionButton}
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainContent: {
    marginLeft: '0',
    padding: '30px',
    width: '100%',
    height: '100%',
    backgroundColor: '#f4f4f9',
  },
  topNav: {
    backgroundColor: '#003300',
    color: '#ffffff',
    padding: '20px',
    borderBottom: '4px solid #004d00',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  logoImage: {
    width: '50px',
    height: '50px',
    marginRight: '10px',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  navbar: {
    marginTop: '10px',
    borderBottom: '2px solid #004d00',
  },
  navList: {
    listStyleType: 'none',
    padding: '0',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#006600',
  },
  navItem: {
    marginBottom: '0',
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    padding: '15px 20px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    fontSize: '16px',
  },
  navButton: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    padding: '15px 20px',
    fontSize: '16px',
  },
  content: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
  },
  headerTitle: {
    margin: '0',
    fontSize: '28px',
    color: '#333',
  },
  separator: {
    margin: '10px 0',
    border: 'none',
    borderTop: '2px solid #ddd',
  },
  appointmentContainer: {
    display: 'flex',
    gap: '20px',
  },
  appointmentList: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  appointmentCard: {
    padding: '15px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  appointmentTitle: {
    margin: '0',
    fontSize: '18px',
    color: '#333',
  },
  infoText: {
    margin: '5px 0',
    fontSize: '14px',
    color: '#555',
  },
  detailsPanel: {
    flex: '2',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'opacity 0.3s ease',
  },
  detailsTitle: {
    margin: '0 0 15px 0',
    fontSize: '22px',
    color: '#333',
  },
  actions: {
    marginTop: '20px',
  },
  actionButton: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    fontSize: '14px',
    cursor: 'pointer',
    marginRight: '10px',
    transition: 'background-color 0.3s',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default Appointments;
