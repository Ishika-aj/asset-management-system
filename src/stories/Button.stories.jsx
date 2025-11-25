import React from "react";
import { Button } from "@mui/material";

export default {
  title: "Example/Button",
  component: Button
};

export const Primary = () => <Button variant="contained">Primary</Button>;
export const Secondary = () => <Button variant="outlined">Secondary</Button>;
