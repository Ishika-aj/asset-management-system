import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />; // Not logged in
  if (allowedRoles && !allowedRoles.includes(userRole)) return <Navigate to="/login" replace />; // Role not allowed

  return children;
};

export default ProtectedRoute;
