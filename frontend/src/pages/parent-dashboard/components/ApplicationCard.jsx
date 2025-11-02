import React from 'react';
import moment from 'moment';
import Icon from '../../../components/AppIcon';
import { Button } from '../../../components/ui/Button';

const ApplicationCard = ({ application, onViewDetails, onDownloadCertificate, onEditApplication }) => {
  const getStatusClasses = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning-subtle text-warning';
      case 'in-review':
        return 'bg-info-subtle text-info';
      case 'approved':
        return 'bg-success-subtle text-success-confirm';
      case 'rejected':
        return 'bg-alerts-error-subtle text-alerts-error';
      default:
        return 'bg-secondary-subtle text-secondary-button-text';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'in-review':
        return 'Eye';
      case 'rejected':
        return 'XCircle';
      default:
        return 'FileText';
    }
  };

  const getProgressPercentage = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 100;
      case 'in-review':
        return 75;
      case 'pending':
        return 50;
      case 'rejected':
        return 25;
      default:
        return 0;
    }
  };

  return (
    <div className="dashboard-card h-100 shadow-lg rounded-4 overflow-hidden">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="flex-grow-1">
            <h5 className="card-title dashboard-text-primary mb-1">{application.childName}</h5>
            <p className="small text-muted mb-1">Application #{application.id}</p>
            <p className="small text-muted">Applied on {moment(application.submissionDate).format('MMMM D, YYYY')}</p>
          </div>
          <span className={`badge rounded-pill px-3 py-2 fw-bold d-inline-flex align-items-center ${getStatusClasses(application.status)}`}>
            <Icon name={getStatusIcon(application.status)} size={14} className="me-1" />
            {application.status.replace('-', ' ').toUpperCase()}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="small fw-medium dashboard-text-primary">Progress</span>
            <span className="small text-muted">{getProgressPercentage(application.status)}%</span>
          </div>
          <div className="w-100 bg-light rounded-pill" style={{ height: '8px' }}>
            <div
              className="bg-primary rounded-pill transition-all duration-300"
              style={{ width: `${getProgressPercentage(application.status)}%`, height: '8px' }}
            />
          </div>
        </div>

        {/* Application Details */}
        <div className="row g-3 mb-3 small">
          <div className="col-6">
            <span className="text-muted">Date of Birth:</span>
            <p className="fw-medium dashboard-text-primary">{moment(application.dateOfBirth).format('MMMM D, YYYY')}</p>
          </div>
          <div className="col-6">
            <span className="text-muted">Place of Birth:</span>
            <p className="fw-medium dashboard-text-primary">{application?.placeOfBirth}</p>
          </div>
        </div>

        {application.status === 'rejected' && application.reason && (
          <div className="alert alert-alerts-error-subtle text-alerts-error border-0 p-2 mt-2 mb-2 rounded-3 small">
            <div className="d-flex align-items-start">
              <Icon name="AlertCircle" size={16} className="text-alerts-error me-2 mt-1" />
              <div>
                <p className="small fw-medium text-alerts-error mb-1">Rejection Reason:</p>
                <p className="small text-alerts-error">{application.reason}</p>
              </div>
            </div>
          </div>
        )}

        {application.status === 'approved' && application.certificateId && (
          <p className="card-text text-text-general mb-2">
            <strong className="text-headings">Certificate ID:</strong> {application.certificateId}
          </p>
        )}

        {/* Action Buttons */}
        <div className="mt-auto d-flex flex-wrap gap-2 pt-3 border-top border-borders-cards">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(application)}
            className="d-flex align-items-center"
          >
            <Icon name="Eye" size={16} className="me-1" />
            View Details
          </Button>

          {application.status === 'approved' && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onDownloadCertificate(application)}
              className="d-flex align-items-center"
            >
              <Icon name="Download" size={16} className="me-1" />
              Download Certificate
            </Button>
          )}

          {(application.status === 'pending' || application.status === 'rejected') && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEditApplication(application)}
              className="d-flex align-items-center"
            >
              <Icon name="Edit" size={16} className="me-1" />
              Edit Application
            </Button>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <small className="text-muted">
            {application.docsUploaded}/{application.totalDocs} documents uploaded
          </small>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
