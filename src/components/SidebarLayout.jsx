import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SidebarLayout({ children }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems =
    role === "ADMIN"
      ? [
          { text: "Dashboard", path: "/admin/dashboard" },
          { text: "Asset Management", path: "/admin/assets" },
          { text: "Asset History", path: "/admin/history" },
        ]
      : [
          { text: "Dashboard", path: "/employee/dashboard" },
          { text: "My Assets", path: "/employee/assets" },
        ];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" sx={{ width: 220, flexShrink: 0 }}>
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                onClick={() => navigate(item.path)}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - 220px)`, ml: "220px" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">
              {role === "ADMIN" ? "Admin Dashboard" : "Employee Dashboard"}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
