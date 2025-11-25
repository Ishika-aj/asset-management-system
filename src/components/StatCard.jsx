import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const StatCard = ({ title, value, iconColor = "#1976d2" }) => {
  return (
    <Card sx={{ minWidth: 200, flex: 1, backgroundColor: "#fff", boxShadow: "0 6px 18px rgba(0,0,0,0.04)" }}>
      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: iconColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mr: 2,
            color: "white",
            fontWeight: "bold",
          }}
        >
          {title[0]}
        </Box>
        <Box>
          <Typography variant="h6">{value}</Typography>
          <Typography color="text.secondary">{title}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
