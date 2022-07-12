import { Box } from "@mui/material";
import React from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
// import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { ThreeDots } from "react-loader-spinner";
import { CustomizedButton as Button } from "../components/CustomizedButton";
import { TransitionsModal as Modal } from "../components/TransitionsModal";
// import { Typography } from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function CekResi() {
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
  ];
  return (
    <Layout>
      <Box sx={{ display: "flex", mb: 3 }}>
        <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Button onClick={() => console.log("ok")}>Add New Resi</Button>
        </Stack>
      </Box>
      <Modal>
        <Stack spacing={2} direction="row">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Prov" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Kab" />}
          />
          {/* <TextField
            sx={{ width: 300 }}
            id="outlined-basic"
            label="Nama"
            variant="outlined"
          />
          <TextField
            label="Harga"
            id="outlined-start-adornment"
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
          /> */}
          <TextField
            label="Harga"
            id="outlined-start-adornment"
            sx={{ width: 300 }}
            type="number"
          />
        </Stack>
      </Modal>
      <ThreeDots color="#00BFFF" height={100} width={100} />
      <Table />
    </Layout>
  );
}
