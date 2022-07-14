import { CustomizedButton as Button } from "../../components/CustomizedButton";
import { Backdrop, Stack, Box, Modal, Fade } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { useRecoilState } from "recoil";
import { openState } from "../../atoms";

export default function DeleteModal({ id }) {
  const [isOpen, setIsOpen] = useRecoilState(openState);
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
  const handleDelete = () => {
    deleteData();
    setIsOpen(false);
  };

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
            <Button sx={{ px: 1, py: 1.5 }} onClick={handleDelete}>
              Delete
            </Button>
            <Button sx={{ px: 1, py: 1.5 }} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
