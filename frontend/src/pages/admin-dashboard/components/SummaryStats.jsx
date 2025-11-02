import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Applications',
      value: stats?.totalApplications || 0,
      icon: 'FileText',
      color: 'text-primary bg-primary-subtle'
    },
    {
      label: 'Pending Reviews',
      value: stats?.pendingReviews || 0,
      icon: 'Clock',
      color: 'text-warning bg-warning-subtle'
    },
    {
      label: 'Approved',
      value: stats?.approved || 0,
      icon: 'CheckCircle',
      color: 'text-success bg-success-subtle'
    },
    {
      label: 'Completed Certificates',
      value: stats?.completedCertificates || 0,
      icon: 'Award',
      color: 'text-info bg-info-subtle'
    }
  ];

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4 bg-white">
      <h2 className="h5 fw-bold text-headings mb-4">Application Summary</h2>
      <div className="row g-3">
        {statItems?.map((item, index) => (
          <div key={index} className="col-md-6">
            <div className="d-flex align-items-center justify-content-between p-3 rounded bg-light">
              <div className="d-flex align-items-center">
                <div className={`p-2 rounded ${item?.color}`}>
                  <Icon name={item?.icon} size={20} />
                </div>
                <span className="ms-3 small fw-medium text-headings">{item?.label}</span>
              </div>
              <span className="h4 fw-bold text-headings">{item?.value}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="mt-4 pt-3 border-top border-borders-cards">
        <h3 className="small fw-medium text-headings mb-3">Quick Actions</h3>
        <div className="d-grid gap-2">
          <button className="btn btn-outline-secondary d-flex align-items-center justify-content-start p-2 small text-muted hover-bg-accent-color">
            <Icon name="Search" size={16} />
            <span className="ms-2">Search Applications</span>
          </button>
          <button className="btn btn-outline-secondary d-flex align-items-center justify-content-start p-2 small text-muted hover-bg-accent-color">
            <Icon name="Filter" size={16} />
            <span className="ms-2">Filter by Status</span>
          </button>
          <button className="btn btn-outline-secondary d-flex align-items-center justify-content-start p-2 small text-muted hover-bg-accent-color">
            <Icon name="Download" size={16} />
            <span className="ms-2">Download All Certificates</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryStats;
