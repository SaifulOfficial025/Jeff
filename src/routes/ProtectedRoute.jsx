import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check for admin access token in localStorage
  const token = localStorage.getItem("access_token");
  // You can add more checks here if needed (e.g., is_staff, is_superuser)
  if (!token) {
    // Not authenticated, redirect to admin login
    return <Navigate to="/admin_login" replace />;
  }
  // Authenticated, render children
  return children;
};

export default ProtectedRoute;
