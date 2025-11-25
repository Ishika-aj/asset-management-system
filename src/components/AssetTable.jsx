import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import axios from "axios";

export default function AssetTable() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/assets");
        setAssets(res.data);
      } catch (err) {
        console.error("Failed to fetch assets", err);
      }
    };
    fetchAssets();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "assigned":
        return "primary";
      case "available":
        return "success";
      case "maintenance":
        return "warning";
      default:
        return "default";
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleString(); // e.g., 20/11/2025, 10:00:00
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Assigned</TableCell>
            <TableCell>Assigned To</TableCell>
            <TableCell>Assigned Date</TableCell>
            <TableCell>Return Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>{asset.id}</TableCell>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.department || "-"}</TableCell>
              <TableCell>{asset.category || "-"}</TableCell>
              <TableCell>
                <Chip label={asset.status || "-"} color={getStatusColor(asset.status)} />
              </TableCell>
              <TableCell>{asset.assigned ? "Yes" : "No"}</TableCell>
              <TableCell>{asset.assignedTo || "-"}</TableCell>
              <TableCell>{formatDate(asset.assignedDate)}</TableCell>
              <TableCell>{formatDate(asset.returnDate)}</TableCell>
              <TableCell>
                <button>Edit</button>
                <button>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
