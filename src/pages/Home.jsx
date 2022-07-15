import { Box } from "@mui/material";
import React from "react";
import Profile from "../components/Profile";
export default function Home() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyItems: "center" }}>
      <Profile />
    </Box>
  );
}
