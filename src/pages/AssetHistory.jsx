import React, { useEffect, useState } from "react";
import "./assetHistory.css";
import axios from "axios";

export default function AssetHistory() {
  const [histories, setHistories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState(""); // <-- NEW SEARCH STATE

  const [currentHistory, setCurrentHistory] = useState({
    assetName: "",
    employeeName: "",
    assignedDate: "",
    returnDate: ""
  });

  const fetchHistories = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/asset-history");
      setHistories(res.data);
    } catch (err) {
      console.error("Error loading asset history:", err);
    }
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  const handleChange = (e) => {
    setCurrentHistory({ ...currentHistory, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentHistory.id) {
        await axios.put(
          `http://localhost:8081/api/asset-history/${currentHistory.id}`,
          currentHistory
        );
      } else {
        await axios.post("http://localhost:8081/api/asset-history", currentHistory);
      }

      setModalOpen(false);
      setCurrentHistory({
        assetName: "",
        employeeName: "",
        assignedDate: "",
        returnDate: ""
      });

      fetchHistories();
    } catch (err) {
      console.error("Error saving asset history:", err);
    }
  };

  const handleEdit = (history) => {
    setCurrentHistory(history);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/asset-history/${id}`);
      fetchHistories();
    } catch (err) {
      console.error("Error deleting asset history:", err);
    }
  };

  // FILTERED DATA
  const filteredHistories = histories.filter((h) => {
    return (
      h.assetName.toLowerCase().includes(search.toLowerCase()) ||
      (h.employeeName && h.employeeName.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="page-box">
      <h1 className="page-title">Asset History</h1>
      <div className="history-header">
        <button className="primary-btn" onClick={() => setModalOpen(true)}>
          Add History
        </button>

        {/* SEARCH BAR */}
        <div className="search-wrapper">
          <input
            type="text"
            className="search-box"
            placeholder="Search by asset name or employee name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="search-icon" aria-hidden>
            {/* simple magnifier SVG */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Asset Name</th>
            <th>Assigned To</th>
            <th>Assigned Date</th>
            <th>Return Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredHistories.map((history) => (
            <tr key={history.id}>
              <td>{history.id}</td>
              <td>{history.assetName}</td>
              <td>{history.employeeName || "-"}</td>
              <td>{history.assignedDate}</td>
              <td>{history.returnDate || "-"}</td>

              <td>
                <button
                  className="small-btn"
                  onClick={() => handleEdit(history)}
                >
                  Edit
                </button>

                <button
                  className="small-btn danger"
                  onClick={() => handleDelete(history.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>{currentHistory.id ? "Edit History" : "Add History"}</h2>

            <form onSubmit={handleSubmit}>
              <label>Asset Name</label>
              <input
                name="assetName"
                value={currentHistory.assetName}
                onChange={handleChange}
                required
              />

              <label>Assigned To (Employee Name)</label>
              <input
                name="employeeName"
                value={currentHistory.employeeName}
                onChange={handleChange}
                required
              />

              <label>Assigned Date</label>
              <input
                type="date"
                name="assignedDate"
                value={currentHistory.assignedDate || ""}
                onChange={handleChange}
              />

              <label>Return Date</label>
              <input
                type="date"
                name="returnDate"
                value={currentHistory.returnDate || ""}
                onChange={handleChange}
              />

              <button type="submit" className="primary-btn">
                {currentHistory.id ? "Update" : "Add"}
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
