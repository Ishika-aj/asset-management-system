import React, { useEffect, useState } from "react";
import dashboardImg from "../assets/bg.png";
import "../styles/adminDashboard.css";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalAssets: 0, totalUsers: 0 });

   useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token"); // must be stored on login
      if (!token) {
        console.error("No token found. Please login first.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Fetch assets
      const assetRes = await axios.get("http://localhost:8081/api/assets", config);

      // Fetch users
      const userRes = await axios.get("http://localhost:8081/api/users", config);

      setStats({
        totalAssets: Array.isArray(assetRes.data) ? assetRes.data.length : 0,
        totalUsers: Array.isArray(userRes.data.data) ? userRes.data.data.length : 0,
      });
    } catch (error) {
      console.error("Dashboard stats error:", error.response || error.message);
      setStats({ totalAssets: 0, totalUsers: 0 });
    }
  };


  return (
    <div className="dashboard-page">
      <img src={dashboardImg} alt="Dashboard" className="dashboard-img" />

      <div className="welcome-box">
        <h1 className="welcome-text">Welcome Admin</h1>
        <p className="subtitle gradient-text">Manage your assets efficiently</p>

        <div className="stats-row">
          <div className="stat-card">
            <h2 className="stat-title">Total Assets</h2>
            <p className="stat-number">{stats.totalAssets}</p>
          </div>

          <div className="stat-card">
            <h2 className="stat-title">Total Users</h2>
            <p className="stat-number">{stats.totalUsers}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
