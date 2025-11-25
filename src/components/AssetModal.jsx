import React from "react";

export default function AssetModal({ form, setForm, editingAsset, onSubmit, onClose }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{editingAsset ? "Edit Asset" : "Add Asset"}</h2>

        <form onSubmit={handleFormSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <label>Category</label>
          <input
            type="text"
            value={form.category || ""}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />

          <label>Status</label>
          <select
            value={form.status || "Available"}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            required
          >
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
          </select>

          <label>Assigned To</label>
          <input
            type="text"
            value={form.assignedTo || ""}
            onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
            required
          />

          <button type="submit" className="primary-btn">
            {editingAsset ? "Update" : "Add"}
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={onClose}
            style={{ marginTop: "10px" }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
