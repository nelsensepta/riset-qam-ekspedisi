import { useState } from "react";
import { CustomizedButton as Button } from "../components/CustomizedButton";
import { TransitionsModal as Modal } from "../components/TransitionsModal";
import { TextField, Stack } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { gql, useMutation } from "@apollo/client";

export default function AddData() {
  const [data, setData] = useState("");
  const ADD_RESI = gql`
    mutation MyMutation($no_resi: String = "") {
      insert_cek_resi(objects: { no_resi: $no_resi }) {
        returning {
          id
          no_resi
        }
      }
    }
  `;
  const [insertMessage] = useMutation(ADD_RESI, {
    variables: {
      no_resi: data,
    },
  });
  const handleAdd = () => {
    // e.preventDefault();
    insertMessage();
    setData("");
  };
  return (
    <Modal>
      <Stack spacing={2}>
        <TextField
          label="No Resi"
          id="outlined-start-adornment"
          sx={{ width: "100%" }}
          type="number"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <Button sx={{ px: 1, py: 1.5 }} onClick={handleAdd}>
          Add New Resi
        </Button>
      </Stack>
    </Modal>
  );
}
