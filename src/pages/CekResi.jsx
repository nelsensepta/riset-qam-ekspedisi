import { Box } from "@mui/material";
import React from "react";
import { gql, useSubscription } from "@apollo/client";
// import gql from "graphql-ws";
import Stack from "@mui/material/Stack";
import { ThreeDots } from "react-loader-spinner";
import { CustomizedButton as Button } from "../components/CustomizedButton";
import { TransitionsModal as Modal } from "../components/TransitionsModal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Tables from "../components/Tables";
import { useRecoilState } from "recoil";
import { openState } from "../atoms";
import AddData from "../components/AddData";

export default function CekResi() {
  const [isOpen, setIsOpen] = useRecoilState(openState);
  const GET_CEK_RESI = gql`
    subscription MySubscription($limit: Int = 10) {
      cek_resi(limit: $limit) {
        id
        no_resi
      }
    }
  `;

  // const gqlVariables = {
  //   limit: 2,
  //   offset: 1,
  // };
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
  ];
  const { loading, error, data } = useSubscription(GET_CEK_RESI, {
    variables: {
      limit: 25,
    },
  });
  // const { loading, error, data } = useQuery(ADD_RESI);
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
  return (
    <>
      <Box sx={{ display: "flex", mb: 3 }}>
        <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Button onClick={() => setIsOpen(true)}>Add New Resi</Button>
        </Stack>
      </Box>
      <AddData />

      {loading ? (
        <ThreeDots color="#00BFFF" height={100} width={100} />
      ) : (
        <Tables data={data.cek_resi} headCells={headCells} />
      )}
    </>
  );
}
