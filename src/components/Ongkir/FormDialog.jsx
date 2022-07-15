import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const { id_kab, nama, harga_ongkir } = data;
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {id_kab ? `Update Ongkir ${nama}` : "Add New Ongkir"}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="nama"
              value={nama}
              onChange={(e) => onChange(e)}
              label="Nama"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              name="harga_ongkir"
              value={harga_ongkir}
              onChange={(e) => onChange(e)}
              label="Harga Ongkir"
              variant="outlined"
              margin="dense"
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions
          sx={{
            mr: 2,
            mb: 2,
          }}
        >
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => handleFormSubmit()}
            variant="contained"
          >
            {id_kab ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
