import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { gql, useMutation } from "@apollo/client";

export default function AlertDialog({ alertHandleClose, alertOpen, id }) {
  const DELETE_ONGKIR = gql`
    mutation MyMutation($id_kab: uuid = "") {
      delete_cek_ongkir_by_pk(id_kab: $id_kab) {
        harga_ongkir
        id_kab
        id_prov
        nama
      }
    }
  `;
  const [deleteData] = useMutation(DELETE_ONGKIR, {
    variables: {
      id_kab: id,
    },
  });
  const handleAlert = () => {
    deleteData();
    alertHandleClose();
  };
  return (
    <div>
      <Dialog
        open={alertOpen}
        onClose={alertHandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={alertHandleClose}>Disagree</Button>
          <Button onClick={handleAlert} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
