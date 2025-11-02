import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';

const SearchAndFilters = ({ onSearch, onFilterChange, onClearFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-review', label: 'Under Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const dateOptions = [
    { value: '', label: 'All Time' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' },
    { value: 'lastyear', label: 'Last Year' }
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    onFilterChange({ status: value, date: dateFilter });
  };

  const handleDateFilter = (value) => {
    setDateFilter(value);
    onFilterChange({ status: statusFilter, date: value });
  };

  const handleClearAll = () => {
    setSearchTerm('');
    setStatusFilter('');
    setDateFilter('');
    onClearFilters();
  };

  const hasActiveFilters = searchTerm || statusFilter || dateFilter;

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4 mb-4 bg-white">
      <h3 className="h5 text-headings mb-3">Filter Applications</h3>
      <div className="row g-3">
        {/* Search Input */}
        <div className="col-lg-6">
          <div className="position-relative">
            <Icon
              name="Search"
              size={20}
              className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted"
            />
            <Input
              type="text"
              placeholder="Search by child name or application number..."
              value={searchTerm}
              onChange={(e) => handleSearch(e?.target?.value)}
              className="ps-5"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="col-lg-3">
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={statusFilter}
            onChange={handleStatusFilter}
          />
        </div>

        {/* Date Filter */}
        <div className="col-lg-3">
          <Select
            placeholder="Filter by date"
            options={dateOptions}
            value={dateFilter}
            onChange={handleDateFilter}
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="d-flex align-items-center"
          >
            <Icon name="X" size={16} className="me-1" />
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-3 pt-3 border-top border-borders-cards">
          <div className="d-flex flex-wrap gap-2">
            <span className="small text-muted">Active filters:</span>
            {searchTerm && (
              <span className="badge bg-primary-subtle text-primary d-inline-flex align-items-center px-2 py-1 small">
                Search: "{searchTerm}"
                <button
                  onClick={() => handleSearch('')}
                  className="btn-close btn-close-sm ms-1"
                  aria-label="Remove filter"
                ></button>
              </span>
            )}
            {statusFilter && (
              <span className="badge bg-primary-subtle text-primary d-inline-flex align-items-center px-2 py-1 small">
                Status: {statusOptions?.find(opt => opt?.value === statusFilter)?.label}
                <button
                  onClick={() => handleStatusFilter('')}
                  className="btn-close btn-close-sm ms-1"
                  aria-label="Remove filter"
                ></button>
              </span>
            )}
            {dateFilter && (
              <span className="badge bg-primary-subtle text-primary d-inline-flex align-items-center px-2 py-1 small">
                Date: {dateOptions?.find(opt => opt?.value === dateFilter)?.label}
                <button
                  onClick={() => handleDateFilter('')}
                  className="btn-close btn-close-sm ms-1"
                  aria-label="Remove filter"
                ></button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;
