import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If allowedRoles is empty, allow any authenticated user
  if (allowedRoles.length === 0) {
    return children;
  }

  // Check if user has the required role
  if (user && allowedRoles.includes(user.role)) {
    return children;
  }

  // Redirect to dashboard if user doesn't have the required role
  return <Navigate to="/dashboard" />;
};

export default ProtectedRoute;
