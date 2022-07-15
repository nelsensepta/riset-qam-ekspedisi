import { gql, useSubscription } from "@apollo/client";
import { ThreeDots } from "react-loader-spinner";
import TableResi from "../components/TableResi";

export default function CekResi() {
  const GET_CEK_RESI = gql`
    subscription MySubscription($limit: Int = 10) {
      cek_resi(limit: $limit) {
        id
        no_resi
      }
    }
  `;
  // const loading = true;

  const { loading, error, data } = useSubscription(GET_CEK_RESI, {
    variables: {
      limit: 25,
    },
  });
  const headCells = [
    {
      id: "id",
      label: "No",
    },
    {
      id: "no_resi",
      label: "No Resi",
    },
    {
      id: "action",
      label: "Action",
    },
  ];

  if (error) {
    return <p>Error</p>;
  }
  return (
    <>
      {loading ? (
        <ThreeDots color="#00BFFF" height={100} width={100} />
      ) : (
        <TableResi data={data.cek_resi} headCells={headCells} />
      )}
    </>
  );
}
