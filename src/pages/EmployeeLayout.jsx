import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./employeeDashboard.css";

export default function EmployeeLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard-container">

      {/* ---------- SIDEBAR ---------- */}
      <aside className="sidebar">
        <div>
          <div className="logo">
            <i className="fas fa-cube"></i>
            <span>AssetCo</span>
          </div>

          <nav className="nav-menu">
            <Link className="nav-item" to="/employee/dashboard">Dashboard</Link>
            <Link className="nav-item" to="/employee/my-assets">My Assets</Link>
          </nav>
        </div>

        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
