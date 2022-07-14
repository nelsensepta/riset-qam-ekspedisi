import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useRecoilState } from "recoil";
import { openState } from "../../atoms";
import { useState, useEffect } from "react";
import { CustomizedButton as Button } from "../CustomizedButton";
import { TextField, Stack } from "@mui/material";
import { gql, useMutation } from "@apollo/client";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ id, resi }) {
  console.log(id);
  const [isOpen, setIsOpen] = useRecoilState(openState);
  const [data, setData] = useState();
  useEffect(() => {
    setData(resi);
  }, [resi]);
  const UPDATE_RESI = gql`
    mutation MyMutation($no_resi: String = "", $_eq: uuid = "") {
      update_cek_resi(
        where: { id: { _eq: $_eq } }
        _set: { no_resi: $no_resi }
      ) {
        returning {
          id
          no_resi
        }
      }
    }
  `;
  const [updateResi] = useMutation(UPDATE_RESI, {
    variables: {
      no_resi: data,
      _eq: id,
    },
  });
  const handleUpdate = () => {
    updateResi();
    setData("");
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <Stack spacing={2}>
            <TextField
              label="No Resi"
              id="outlined-start-adornment"
              sx={{ width: "100%" }}
              // type="number"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <Button sx={{ px: 1, py: 1.5 }} onClick={handleUpdate}>
              Update Resi
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
