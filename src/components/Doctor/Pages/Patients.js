import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../Assets/logo.png';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editPatient, setEditPatient] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [reportData, setReportData] = useState({
    patientName: '',
    patientusername: '',
    doctorName: '',
    diagnosis: '',
    treatment: '',
    prescription: '',
    notes: '',
  });
  const [reportForPatient, setReportForPatient] = useState(null); // Track patient for report
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      const username = localStorage.getItem('username');
      if (!username) {
        console.error('Username not found in local storage');
        setError('Username not found. Please login again.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://backend-h6su.onrender.com/doctor/ongoing?doctor=${username}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
        setError('Failed to fetch patients. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

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
    });
  };

  const handleMarkCompleted = async (id) => {
    try {
      const response = await fetch(`https://backend-h6su.onrender.com/doctor/mark-completed/${id}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to mark patient as completed');
      }
      setPatients(patients.map(patient => 
        patient.id === id ? { ...patient, status: 'completed' } : patient
      ));
      Swal.fire('Success!', 'Patient marked as completed.', 'success');
    } catch (error) {
      console.error('Error updating patient status:', error);
      Swal.fire('Error', 'Failed to mark patient as completed.', 'error');
    }
  };
  
  const handleEdit = (patient) => {
    setEditPatient(patient);
    setUpdatedDetails({
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      illness: patient.illness,
      treatment: patient.treatment,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails(prevState => ({
      ...prevState, [name]: value
    }));
  };

  const handleSubmitEdit = async () => {
    if (!editPatient) {
      console.error('No patient selected for editing.');
      return;
    }
  
    try {
      const response = await fetch(`https://backend-h6su.onrender.com/doctor/edit-patient/${editPatient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDetails),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update patient');
      }
  
      const updatedPatient = await response.json();
      setPatients(patients.map(patient =>
        patient.id === updatedPatient.id ? updatedPatient : patient
      ));
      setEditPatient(null);
      Swal.fire('Success!', 'Patient details updated successfully.', 'success');
    } catch (error) {
      console.error('Error updating patient:', error);
      Swal.fire('Error', 'Failed to update patient.', 'error');
    }
  };
  
  const handleCancelEdit = () => {
    setEditPatient(null);
  };

  const handleReportButtonClick = (patient) => {
    setReportForPatient(patient);
    setReportData({
      ...reportData,
      patientName: patient.name,
      patientusername: patient.patientusername,
    });
  };

  const handleReportInputChange = (e) => {
    const { name, value } = e.target;
    setReportData(prevState => ({
      ...prevState, [name]: value
    }));
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backend-h6su.onrender.com/doctor/add-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit report');
      }

      Swal.fire('Success!', 'Report submitted successfully.', 'success');
      setReportForPatient(null);
      setReportData({
        patientName: '',
        patientusername: '',
        doctorName: '',
        diagnosis: '',
        treatment: '',
        prescription: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error submitting report:', error);
      Swal.fire('Error', 'Failed to submit report.', 'error');
    }
  };

  const handleCancelReport = () => {
    setReportForPatient(null);
    setReportData({
      patientName: '',
      patientusername: '',
      doctorName: '',
      diagnosis: '',
      treatment: '',
      prescription: '',
      notes: '',
    });
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
        <h1 style={styles.headerTitle}>Patients</h1>
        <hr style={styles.separator} />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            {reportForPatient && (
              <div style={styles.reportForm}>
                <h2>Report for {reportForPatient.name}</h2>
                <form onSubmit={handleSubmitReport}>
                  <input 
                    type="hidden" 
                    name="patientusername" 
                    value={reportData.patientusername} 
                  />
                  <div style={styles.formGroup}>
                    <label>Patient Name:</label>
                    <input 
                      type="text" 
                      name="patientName" 
                      value={reportData.patientName} 
                      onChange={handleReportInputChange} 
                      style={styles.input} 
                      readOnly
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Doctor Name:</label>
                    <input 
                      type="text" 
                      name="doctorName" 
                      value={reportData.doctorName} 
                      onChange={handleReportInputChange} 
                      style={styles.input} 
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Diagnosis:</label>
                    <input 
                      type="text" 
                      name="diagnosis" 
                      value={reportData.diagnosis} 
                      onChange={handleReportInputChange} 
                      style={styles.input} 
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Treatment:</label>
                    <input 
                      type="text" 
                      name="treatment" 
                      value={reportData.treatment} 
                      onChange={handleReportInputChange} 
                      style={styles.input} 
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Prescription:</label>
                    <input 
                      type="text" 
                      name="prescription" 
                      value={reportData.prescription} 
                      onChange={handleReportInputChange} 
                      style={styles.input} 
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Notes:</label>
                    <textarea 
                      name="notes" 
                      value={reportData.notes} 
                      onChange={handleReportInputChange} 
                      style={styles.textarea} 
                    />
                  </div>
                  <button type="submit" style={styles.actionButton}>Submit Report</button>
                  <button type="button" onClick={handleCancelReport} style={styles.editButton}>Cancel</button>
                </form>
              </div>
            )}
            {editPatient ? (
              <div>
                <h2>Edit Patient Details</h2>
                <form onSubmit={handleSubmitEdit}>
                  <div style={styles.formGroup}>
                    <label>Name:</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={updatedDetails.name} 
                      onChange={handleInputChange} 
                      style={styles.input} 
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Email:</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={updatedDetails.email} 
                      onChange={handleInputChange} 
                      style={styles.input} 
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Phone:</label>
                    <input 
                      type="text" 
                      name="phone" 
                      value={updatedDetails.phone} 
                      onChange={handleInputChange} 
                      style={styles.input} 
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Illness:</label>
                    <input 
                      type="text" 
                      name="illness" 
                      value={updatedDetails.illness} 
                      onChange={handleInputChange} 
                      style={styles.input} 
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Treatment:</label>
                    <input 
                      type="text" 
                      name="treatment" 
                      value={updatedDetails.treatment} 
                      onChange={handleInputChange} 
                      style={styles.input} 
                    />
                  </div>
                  <button type="submit" style={styles.actionButton}>Save</button>
                  <button type="button" onClick={handleCancelEdit} style={styles.editButton}>Cancel</button>
                </form>
              </div>
            ) : (
              <table style={styles.patientsTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Appointment ID</th>
                    <th style={styles.tableHeader}>Name</th>
                    <th style={styles.tableHeader}>Email</th>
                    <th style={styles.tableHeader}>Phone</th>
                    <th style={styles.tableHeader}>Illness</th>
                    <th style={styles.tableHeader}>Treatment</th>
                    <th style={styles.tableHeader}>Doctor</th>
                    <th style={styles.tableHeader}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.appointmentid} style={styles.tableRow}>
                      <td style={styles.tableCell}>{patient.appointmentid}</td>
                      <td style={styles.tableCell}>{patient.name}</td>
                      <td style={styles.tableCell}>{patient.email}</td>
                      <td style={styles.tableCell}>{patient.phone}</td>
                      <td style={styles.tableCell}>{patient.illness}</td>
                      <td style={styles.tableCell}>{patient.treatment}</td>
                      <td style={styles.tableCell}>{patient.doctor}</td>
                      <td style={styles.tableCell}>
                        {patient.status !== 'completed' && (
                          <div style={styles.actionButtons}>
                            <button
                              onClick={() => handleMarkCompleted(patient.id)}
                              style={styles.actionButton}
                            >
                              Mark as Completed
                            </button>
                            <button
                              onClick={() => handleEdit(patient)}
                              style={styles.editButton}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleReportButtonClick(patient)}
                              style={styles.actionButton}
                            >
                              Report
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
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
    overflowY: 'auto',
    backgroundColor: '#f4f4f9',
  },
  topNav: {
    backgroundColor: '#003300', // Dark green
    color: '#ffffff',
    padding: '20px',
    borderBottom: '4px solid #004d00', // Slightly lighter green
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
    color: '#4CAF50', // Light green
  },
  navbar: {
    marginTop: '10px',
    borderBottom: '2px solid #004d00', // Slightly lighter green
  },
  navList: {
    listStyleType: 'none',
    padding: '0',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center', // Align items in the center
    backgroundColor: '#006600', // Dark green
  },
  navItem: {
    marginBottom: '0',
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    padding: '15px 20px', // Added more padding to space out links
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    fontSize: '16px',
  },
  navButton: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    padding: '15px 20px', // Added more padding to space out button
    fontSize: '16px',
  },
  content: {
    marginTop: '20px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '5px',
  },
  headerTitle: {
    fontSize: '32px',
    marginBottom: '20px',
  },
  separator: {
    marginBottom: '20px',
  },
  reportForm: {
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '5px',
    backgroundColor: '#e9ecef',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  actionButton: {
    padding: '10px 20px',
    backgroundColor: '#003300',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px',
    transition: 'background-color 0.3s',
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  patientsTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    borderBottom: '2px solid #003300',
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#003300',
    color: '#ffffff',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
  },
};

export default Patients;
