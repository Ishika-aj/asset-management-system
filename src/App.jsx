import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AssetManagement from "./pages/AssetManagement";
import AssetHistory from "./pages/AssetHistory";
import EmployeeLayout from "./pages/EmployeeLayout";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import MyAssets from "./pages/MyAssets";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isAuthenticated = token && token !== "";

  return (
    <Routes>
      {/* Login route */}
      <Route
        path="/login"
        element={
          !isAuthenticated
            ? <Login />
            : role === "ADMIN"
            ? <Navigate to="/admin" replace />
            : <Navigate to="/employee/dashboard" replace />
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="asset-management" element={<AssetManagement />} />
        <Route path="asset-history" element={<AssetHistory />} />
      </Route>

      {/* Employee routes */}
      <Route
        path="/employee/*"
        element={
          <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
            <EmployeeLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<EmployeeDashboard />} />
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="my-assets" element={<MyAssets />} />
      </Route>

      {/* Catch-all redirect */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? (role === "ADMIN" ? "/admin" : "/employee/dashboard") : "/login"} replace />}
      />
    </Routes>
  );
}
