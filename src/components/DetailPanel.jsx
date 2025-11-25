// src/components/DetailPanel.jsx
import React, { useEffect, useState } from "react";
import { useAssetsStore } from "../store/useAssetsStore";

/*
 This behaves like a modal but implemented as a slide-in panel.
*/

export default function DetailPanel({ asset, onClose }) {
  const { fetchHistory } = useAssetsStore();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const load = async () => {
      await fetchHistory();
      // get history from store (direct import leading to circular can be avoided by calling api directly)
      const res = await fetch("/api/asset-history");
      const json = await res.json();
      setHistory(json || []);
    };
    load();
  }, [asset, fetchHistory]);

  const assetHistory = history.filter(h => h.assetId === asset.id);

  return (
    <div style={{
      position: 'fixed', right: 20, top: 80, width: 420, height: '70vh', background: '#fff', borderRadius: 10, boxShadow: '0 20px 50px rgba(0,0,0,0.12)', padding: 16, overflow: 'auto', zIndex: 9999
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>{asset.name} — details</h3>
        <button onClick={onClose} className="btn small ghost">Close</button>
      </div>

      <div style={{ marginTop: 12 }}>
        <p><strong>Category:</strong> {asset.category}</p>
        <p><strong>Department:</strong> {asset.department || "-"}</p>
        <p><strong>Status:</strong> {asset.status}</p>
        <p><strong>Assigned To:</strong> {asset.assignedTo || "-"}</p>
        <p><strong>Assigned Date:</strong> {asset.assignedDate || "-"}</p>
        <p><strong>Return Date:</strong> {asset.returnDate || "-"}</p>
      </div>

      <hr />

      <h4>History</h4>
      <ul>
        {assetHistory.length === 0 && <li>No history</li>}
        {assetHistory.map(h => (
          <li key={h.id}>
            <div><strong>{h.action}</strong> — {h.assignedTo || "-"} <span style={{ color: '#777' }}>({h.assignedDate || '-'}/{h.returnDate || '-'})</span></div>
            <div style={{ fontSize: 12, color: '#666' }}>{h.timestamp}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
