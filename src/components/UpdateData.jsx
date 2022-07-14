import { useState } from "react";
import { CustomizedButton as Button } from "../components/CustomizedButton";
import { TransitionsModal as Modal } from "../components/TransitionsModal";
import { TextField, Stack } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { gql, useMutation } from "@apollo/client";

export default function UpdateData({ id, value }) {
  // console.log(value);
  const [data, setData] = useState(value);
  console.log(data);
  const UPDATE_RESI = gql`
    mutation MyMutation($no_resi: String = "", $id: uuid = "") {
      update_cek_resi(where: { id: { id: $id } }, _set: { no_resi: $no_resi }) {
        returning {
          id
          no_resi
        }
      }
    }
  `;
  const [updateResi] = useMutation(UPDATE_RESI, {
    variables: {
      no_resi: "10",
      id: id,
    },
  });
  const handleUpdate = () => {
    // e.preventDefault();
    updateResi();
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
        <Button sx={{ px: 1, py: 1.5 }} onClick={handleUpdate}>
          Update Resi
        </Button>
      </Stack>
    </Modal>
  );
}
