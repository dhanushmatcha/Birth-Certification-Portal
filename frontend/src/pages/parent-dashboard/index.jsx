import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryStats from './components/SummaryStats';
import SearchAndFilter from './components/SearchAndFilter';
import ApplicationCard from './components/ApplicationCard';
import ApplicationDetailsModal from './components/ApplicationDetailsModal';
// Import child components here as they are created
import { Link } from 'react-router-dom';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [currentStatusFilter, setCurrentStatusFilter] = useState('all');
  const [currentDateFilter, setCurrentDateFilter] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Function to apply filters
  const applyFilters = useCallback((search = currentSearchTerm, status = currentStatusFilter, date = currentDateFilter) => {
    let updatedList = [...applications];

    // Search filter
    if (search) {
      updatedList = updatedList.filter(
        (app) =>
          app.childName.toLowerCase().includes(search.toLowerCase()) ||
          app.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Status filter
    if (status !== 'all') {
      updatedList = updatedList.filter((app) => app.status === status);
    }

    // Date filter (e.g., submission date)
    if (date) {
      updatedList = updatedList.filter((app) => app.submissionDate === date);
    }

    setFilteredApplications(updatedList);
  }, [applications, currentSearchTerm, currentStatusFilter, currentDateFilter]);

  useEffect(() => {
    // Simulate fetching data
    const fetchApplications = async () => {
      try {
        setLoading(true);
        // In a real application, this would be an API call
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found.');
        }

        const response = await fetch('/api/applications/my', {
          headers: {
            'x-auth-token': token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }

        const data = await response.json();
        setApplications(data);
        setFilteredApplications(data); // Initialize filtered applications
      } catch (err) {
        setError(err.message || 'Failed to load applications.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []); // Empty dependency array means this runs once on mount

  // Re-apply filters whenever applications or filter criteria change
  useEffect(() => {
    applyFilters();
  }, [applications, currentSearchTerm, currentStatusFilter, currentDateFilter, applyFilters]);

  const handleSearch = (term) => {
    setCurrentSearchTerm(term);
  };

  const handleFilterChange = ({ status, date }) => {
    if (status !== undefined) {
      setCurrentStatusFilter(status);
    }
    if (date !== undefined) {
      setCurrentDateFilter(date);
    }
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedApplication(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/authentication');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-background">
        <div className="spinner-border text-primary-button" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-alerts-error text-center mt-5" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-dashboard">
      <main className="container px-4 py-5">
        <h1 className="display-5 fw-bold dashboard-text-primary mb-4">My Applications</h1>

        {/* Summary Stats */}
        <SummaryStats applications={filteredApplications} />

        {/* Search and Filters */}
        <SearchAndFilter onSearch={handleSearch} onFilterChange={handleFilterChange} />

        {/* Application List */}
        <div className="row g-4 mt-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map(app => (
              <div className="col-md-6 col-lg-4" key={app.id}>
                <ApplicationCard application={app} onViewDetails={handleViewDetails} />
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="alert alert-info bg-widget dashboard-text-secondary border-0 rounded-4" role="alert">
                No applications found. <Link to="/apply" className="alert-link dashboard-text-accent fw-bold">Start a new application</Link>
              </div>
            </div>
          )}
        </div>

        {/* Application Details Modal */}
        {showDetailsModal && (
          <ApplicationDetailsModal 
            show={showDetailsModal}
            onClose={handleCloseDetailsModal}
            application={selectedApplication}
          />
        )}
      </main>
    </div>
  );
};

export default ParentDashboard;
