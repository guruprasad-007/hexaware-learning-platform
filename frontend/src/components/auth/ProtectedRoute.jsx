// frontend/src/components/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Check for token existence
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check for admin role if the route is admin-only
  if (adminOnly && role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;