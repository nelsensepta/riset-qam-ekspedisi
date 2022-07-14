import { useState, useEffect } from "react";
import { CustomizedButton as Button } from "../../components/CustomizedButton";
import { TransitionsModal as Modal } from "../../components/TransitionsModal";
import { TextField, Stack } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { useRecoilState } from "recoil";
import { openState } from "../../atoms";

export default function EditModal({ items }) {
  const { id_kab, nama, harga_ongkir } = items;
  const [isOpen, setIsOpen] = useRecoilState(openState);
  const [data, setData] = useState({
    nama: "",
    harga_ongkir: "",
  });

  useEffect(() => {
    return () => setData({ harga_ongkir, nama });
  }, [harga_ongkir, nama]);

  const UPDATE_ONGKIR = gql`
    mutation MyMutation(
      $id_kab: uuid = ""
      $nama: String = ""
      $harga_ongkir: String = ""
    ) {
      update_cek_ongkir_by_pk(
        pk_columns: { id_kab: $id_kab }
        _set: { nama: $nama, harga_ongkir: $harga_ongkir }
      ) {
        id_kab
        id_prov
        harga_ongkir
        nama
      }
    }
  `;
  const [updateOngkir] = useMutation(UPDATE_ONGKIR, {
    variables: {
      id_kab: id_kab,
      harga_ongkir: data?.harga_ongkir,
      nama: data?.nama,
    },
  });
  const handleUpdate = () => {
    updateOngkir();
    setIsOpen(false);
    // setData({nama:});
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <Modal>
      <Stack spacing={2}>
        <TextField
          label="Nama"
          id="outlined-start-adornment"
          sx={{ width: "100%" }}
          value={data.nama}
          name="nama"
          onChange={handleChange}
        />
        <TextField
          label="Harga Ongkir"
          id="outlined-start-adornment"
          sx={{ width: "100%" }}
          type="number"
          name="harga_ongkir"
          value={data.harga_ongkir}
          onChange={handleChange}
        />
        <Button sx={{ px: 1, py: 1.5 }} onClick={handleUpdate}>
          Update Ongkir
        </Button>
      </Stack>
    </Modal>
  );
}
