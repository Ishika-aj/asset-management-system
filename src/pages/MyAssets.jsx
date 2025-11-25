import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyAssets() {
  const [assets, setAssets] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:8081/api/assets/employee/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAssets(res.data);
      } catch (err) {
        console.error("Error fetching assets:", err);
      }
    };

    fetchAssets();
  }, [username]);

  // Format ISO date string with microseconds safely
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";

    // Convert microseconds to milliseconds and ensure UTC
    const parts = dateStr.split(".");
    let ms = "000";
    if (parts[1]) {
      ms = parts[1].substring(0, 3); // first 3 digits for milliseconds
    }
    const iso = `${parts[0]}.${ms}Z`;
    const date = new Date(iso);

    return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
  };

  return (
    <div
      className="my-assets-page"
      style={{
        padding: "20px",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>My Assets</h2>
      {assets.length === 0 ? (
        <p>No assets assigned yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Asset ID</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Asset Name</th>
              
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id} style={{ backgroundColor: "#fff" }}>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{asset.id}</td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{asset.name}</td>
               
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{asset.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
