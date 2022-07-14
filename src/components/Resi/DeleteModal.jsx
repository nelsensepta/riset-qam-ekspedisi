import { useState } from "react";
import { CustomizedButton as Button } from "../components/CustomizedButton";
import { TransitionsModal as Modal } from "../components/TransitionsModal";
import { TextField, Stack } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { gql, useMutation } from "@apollo/client";
import { useRecoilState } from "recoil";
import { openState } from "../atoms";

export default function DeleteModal({ id }) {
  const [isOpen, setIsOpen] = useRecoilState(openState);
  const ADD_RESI = gql`
    mutation MyMutation($_eq: uuid = "") {
      delete_cek_resi(where: { id: { _eq: $_eq } }) {
        affected_rows
      }
    }
  `;
  const [deleteData] = useMutation(ADD_RESI, {
    variables: {
      _eq: id,
    },
  });
  const handleAdd = () => {
    deleteData();
  };
  return (
    <Modal>
      <Stack spacing={2}>
        <Button sx={{ px: 1, py: 1.5 }} onClick={handleAdd}>
          Delete
        </Button>
        <Button sx={{ px: 1, py: 1.5 }} onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </Stack>
    </Modal>
  );
}
