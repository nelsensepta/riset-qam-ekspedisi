import { Box } from "@mui/material";
import React from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { CustomizedButton as Button } from "../components/CustomizedButton";

import { styled } from "@mui/material/styles";
export default function CekOngkir() {
  const [open, setOpen] = React.useState(false);
  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1, 2),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  // }));
  return (
    <Layout>
      <Box sx={{ display: "flex", mb: 3 }}>
        <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Button onClick={() => setOpen(true)}>Add New Ongkir</Button>
        </Stack>
      </Box>
      <Table />
    </Layout>
  );
}
