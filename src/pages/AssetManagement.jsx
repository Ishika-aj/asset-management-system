import React, { useEffect, useState } from "react";
import {
  getAssets,
  createAsset,
  updateAsset,
  deleteAsset
} from "../api/api";

import AssetModal from "../components/AssetModal";
import "../styles/dashboard.css";

export default function AssetManagement() {
  const [assets, setAssets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    status: "Available",
    assignedTo: "",
  });

  // Load assets from backend
  const loadAssets = async () => {
    try {
      const res = await getAssets();
      setAssets(res.data || []);
    } catch (err) {
      console.error("Error loading assets:", err);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const openModal = (asset = null) => {
    if (asset) {
      setEditingAsset(asset);
      setForm({
        name: asset.name || "",
        category: asset.category || "",
        status: asset.status || "Available",
        assignedTo: asset.assignedTo || "",
      });
    } else {
      setEditingAsset(null);
      setForm({
        name: "",
        category: "",
        status: "Available",
        assignedTo: "",
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.category.trim() || !form.status || !form.assignedTo.trim()) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (editingAsset) {
        // Update asset payload
        const payload = {
          id: editingAsset.id,
          name: form.name,
          category: form.category,
          status: form.status,
          assignedTo: form.assignedTo,
          assetId: editingAsset.id,
          employeeId: editingAsset.employeeId || null,
          assetName: form.name,
          employeeName: form.assignedTo
        };

        console.log("Updating asset payload:", payload); // debug log
        await updateAsset(editingAsset.id, payload);
      } else {
        // Add new asset payload
        const payload = {
          name: form.name,
          category: form.category,
          status: form.status,
          assignedTo: form.assignedTo,
          assetName: form.name,
          employeeName: form.assignedTo
        };

        console.log("Creating new asset payload:", payload); // debug log
        await createAsset(payload);
      }

      closeModal();
      loadAssets();
    } catch (err) {
      console.error("Error submitting asset:", err);
      alert("Failed to submit asset. Check console for details.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      try {
        await deleteAsset(id);
        loadAssets();
      } catch (err) {
        console.error("Error deleting asset:", err);
        alert("Failed to delete asset. Check console for details.");
      }
    }
  };

  return (
    <div className="page-box">
      <h2>Asset Management</h2>

      <button className="primary-btn" onClick={() => openModal()}>
        Add Asset
      </button>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {assets.length > 0 ? (
            assets.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.name || "-"}</td>
                <td>{a.category || "-"}</td>
                <td>{a.status || "-"}</td>
                <td>{a.assignedTo || "-"}</td>
                <td>
                  <button className="small-btn" onClick={() => openModal(a)}>
                    Edit
                  </button>
                  <button className="small-btn danger" onClick={() => handleDelete(a.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                No assets found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {modalOpen && (
        <AssetModal
          form={form}
          setForm={setForm}
          editingAsset={editingAsset}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
