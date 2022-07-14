import { Box } from "@mui/material";
import React from "react";
import { gql, useSubscription } from "@apollo/client";
import Stack from "@mui/material/Stack";
import { ThreeDots } from "react-loader-spinner";
import { CustomizedButton as Button } from "../components/CustomizedButton";
import { TransitionsModal as Modal } from "../components/TransitionsModal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import TableOngkir from "../components/TableOngkir";
export default function CekOngkir() {
  const [open, setOpen] = React.useState(false);
  const GET_CEK_RESI = gql`
    subscription MySubscription($limit: Int = 10) {
      cek_ongkir(limit: $limit) {
        harga_ongkir
        id_kab
        id_prov
        nama
      }
    }
  `;

  const { loading, error, data } = useSubscription(GET_CEK_RESI, {
    variables: {
      limit: 25,
    },
  });
  const headCells = [
    {
      id: "id_kab",
      label: "Id Kab",
    },
    {
      id: "id_prov",
      label: "Id Prov",
    },
    {
      id: "nama",
      label: "Nama",
    },
    {
      id: "harga_ongkir",
      label: "Harga Ongkir",
    },
    { id: "action", label: "Action" },
  ];
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
  ];
  // console.log(data);
  return (
    <>
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
      {loading ? (
        <ThreeDots color="#00BFFF" height={100} width={100} />
      ) : (
        <TableOngkir headCells={headCells} data={data.cek_ongkir} />
      )}
    </>
  );
}
