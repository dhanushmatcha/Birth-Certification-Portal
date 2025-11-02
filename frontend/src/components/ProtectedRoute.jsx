import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  let user = null;
  let userRole = null;

  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      user = JSON.parse(userStr);
      userRole = user?.role;
    }
  } catch (err) {
    console.error('Error parsing user from localStorage:', err);
  }

  if (!token) {
    // If no token, always redirect to authentication page
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // If user is authenticated but role is not allowed for this specific route,
    // redirect to their default dashboard based on their role.
    if (userRole === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else {
      // Default all non-admin users to parent dashboard
      return <Navigate to="/parent-dashboard" replace />;
    }
  }

  // If authenticated and role is allowed (or no specific roles required), render the outlet
  return <Outlet />;
};

export default ProtectedRoute;
