import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CustomizedButton as Button } from "../components/CustomizedButton";

const columns = [
  { field: "id", headerName: "ID", flex: 0.25, minWidth: 60 },
  { field: "firstName", headerName: "First name", flex: 0.75, minWidth: 90 },
  { field: "lastName", headerName: "Last name", flex: 0.75, minWidth: 90 },
  {
    field: "age",
    headerName: "Age",
    flex: 0.75,
    editable: true,
    minWidth: 60,
  },
  {
    field: "fullName",
    headerName: "Full name",
    // description: "This column has a value getter and is not sortable.",
    // sortable: false,
    flex: 1,

    minWidth: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 0.75,
    disableColumnSelector: false,
    sortable: false,
    minWidth: 60,
  },
];

const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    age: 35,
    action: <Button onClick={() => console.log("ok")}>Add New Resi</Button>,
  },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
const datagridSx = {
  borderRadius: 2,
};

export default function Table() {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <DataGrid
        // getRowId={(row) => row.internalId}
        rows={rows}
        columns={columns}
        sx={datagridSx}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
