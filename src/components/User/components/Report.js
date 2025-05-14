import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Report.css'; // Ensure you have this CSS file or update styles as needed
import NavBar from './Navbar';
import Footer from './Footer';

const Report = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      const username = localStorage.getItem('username');
      if (username) {
        try {
          const response = await axios.get(`https://backend-h6su.onrender.com/doctor/reports/${username}`);
          setReports(response.data);
        } catch (err) {
          setError('Failed to fetch reports.');
          console.error('Error fetching reports:', err);
        }
      } else {
        setError('No username found in local storage.');
      }
    };

    fetchReports();
  }, []);

  const handleReportClick = (report) => {
    setSelectedReport(report);
  };

  const handleDeleteReport = async (id) => {
    try {
      await axios.delete(`https://backend-h6su.onrender.com/doctor/${id}`);
      setReports(prevReports => prevReports.filter(report => report.id !== id));
      setSelectedReport(null);
    } catch (err) {
      setError('Failed to delete the report.');
      console.error('Error deleting report:', err);
    }
  };

  return (
    <div>
        <NavBar />
    <div className="report-container">
      <header className="report-header">
        <h1>Patient Reports</h1>
      </header>
      {error && <p className="error-text">{error}</p>}
      <div className="report-list">
        {reports.map((report) => (
          <div
            key={report.id}
            className={`report-card ${selectedReport && selectedReport.id === report.id ? 'selected' : ''}`}
            onClick={() => handleReportClick(report)}
          >
            <h3>{report.patientName}</h3>
            <p><strong>Doctor:</strong> {report.doctorName}</p>
            <p><strong>Diagnosis:</strong> {report.diagnosis}</p>
          </div>
        ))}
      </div>
      {selectedReport && (
        <div className="report-details">
          <h2>Report Details</h2>
          <p><strong>Patient Name:</strong> {selectedReport.patientName}</p>
          <p><strong>Doctor Name:</strong> {selectedReport.doctorName}</p>
          <p><strong>Diagnosis:</strong> {selectedReport.diagnosis}</p>
          <p><strong>Treatment:</strong> {selectedReport.treatment}</p>
          <p><strong>Prescription:</strong> {selectedReport.prescription}</p>
          <p><strong>Notes:</strong> {selectedReport.notes}</p>
          <button onClick={() => handleDeleteReport(selectedReport.id)} className="delete-button">
            Delete Report
          </button>
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
};

export default Report;
