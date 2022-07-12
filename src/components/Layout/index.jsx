import React from "react";
import { Container } from "@mui/material";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Container fixed sx={{ pt: 15 }}>
        {children}
      </Container>
    </>
  );
}
