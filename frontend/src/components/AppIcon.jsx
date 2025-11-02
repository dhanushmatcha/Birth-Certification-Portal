import React from 'react';

const AppIcon = ({ name, size = 24, className = '' }) => {
  const iconMap = {
    FileText: 'bi-file-earmark-text',
    Clock: 'bi-clock',
    CheckCircle: 'bi-check-circle',
    Award: 'bi-award',
    Search: 'bi-search',
    Filter: 'bi-filter',
    Download: 'bi-download',
    // Add more icons as needed
  };

  const iconClass = iconMap[name] || 'bi-question-circle';

  return (
    <i className={`bi ${iconClass} ${className}`} style={{ fontSize: size }}></i>
  );
};

export default AppIcon;
