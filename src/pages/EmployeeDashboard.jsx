import React from "react";
import { Link } from "react-router-dom";
import "./employeeDashboard.css";
import profileImg from "../assets/admin.png";

export default function EmployeeDashboard() {
  const username = localStorage.getItem("username") || "Employee";

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <i className="fas fa-cube"></i>
          <span>AssetCo</span>
        </div>

        <nav className="nav-menu">
          <Link className="nav-item active" to="/employee/dashboard">
            <i className="fas fa-th-large"></i> Dashboard
          </Link>
          <Link className="nav-item" to="/employee/my-assets">
            <i className="fas fa-folder-open"></i> My Assets
          </Link>
        </nav>

        <div className="sidebar-logout">
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content employee-bg">
        <header className="top-header">
          <div className="header-icons">
            <i className="fas fa-bell"></i>
            <i className="fas fa-user-circle"></i>
          </div>
        </header>

       
          <div className="card welcome-card">
            <div className="image-container">
            <img src={profileImg} alt="Employee" className="profile-image" />

            </div>
            <div className="welcome-text">
              <h2 className="welcome-title">Welcome, {username}</h2>
              <p className="welcome-subtitle">Here is your asset summary.</p>
            </div>
          </div>

        </main>
    </div>
  );
}
