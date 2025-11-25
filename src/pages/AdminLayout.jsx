import React from "react";
import { Outlet } from "react-router-dom"; // renders child routes
import Sidebar from "../components/Sidebar"; // your sidebar component
import "../styles/dashboard.css";

export default function AdminLayout() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Outlet /> {/* Child routes (Dashboard, AssetManagement, AssetHistory) will render here */}
      </div>
    </div>
  );
}
