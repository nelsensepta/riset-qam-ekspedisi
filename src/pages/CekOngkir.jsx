import { gql, useSubscription } from "@apollo/client";
import { ThreeDots } from "react-loader-spinner";
import TableOngkir from "../components/TableOngkir";
export default function CekOngkir() {
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

  if (error) {
    return <p>Error</p>;
  }

  return (
    <>
      {loading ? (
        <ThreeDots color="#00BFFF" height={100} width={100} />
      ) : (
        <TableOngkir headCells={headCells} data={data.cek_ongkir} />
      )}
    </>
  );
}
