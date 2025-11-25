import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.clear();

        // Redirect to login page
         window.location.href = "/login";
    };

  return (
    <div className="sidebar">
      <h2>Admin</h2>

      <NavLink
        to="/admin"
        end  // ← add this for exact match
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/admin/asset-management"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Asset Management
      </NavLink>

      <NavLink
        to="/admin/asset-history"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Asset History
      </NavLink>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
