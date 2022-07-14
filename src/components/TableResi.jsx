import { useState } from "react";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";

import EnhancedTableHead from "./Table/EnhancedTableHead";
import TablePaginationActions from "./Table/TablePaginationActions";
import EnhancedTableToolbar from "./Table/EnhancedTableToolbar";
import getComparator from "../utils/getComparator";
import stableSort from "../utils/stableSort";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormDialog from "./Resi/FormDialog";
import { CustomizedButton as Button } from "./CustomizedButton";

import { gql, useMutation } from "@apollo/client";

const initialValue = { no_resi: "" };
export default function Tables({ data, headCells }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [id, setId] = useState("");

  // formDialog
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue);

  // AlertDialog
  const [alertOpen, setAlertOpen] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleUpdate = (oldData) => {
    setFormData(oldData);
    handleClickOpen();
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

  const UPDATE_RESI = gql`
    mutation MyMutation($id: uuid = "", $no_resi: String = "") {
      update_cek_resi_by_pk(
        pk_columns: { id: $id }
        _set: { no_resi: $no_resi }
      ) {
        no_resi
        id
      }
    }
  `;
  const ADD_RESI = gql`
    mutation MyMutation($no_resi: String = "") {
      insert_cek_resi_one(object: { no_resi: $no_resi }) {
        id
        no_resi
      }
    }
  `;

  const [updateResi] = useMutation(UPDATE_RESI, {
    variables: {
      id: formData?.id,
      no_resi: formData?.no_resi,
    },
  });
  const [addResi] = useMutation(ADD_RESI, {
    variables: {
      no_resi: formData?.no_resi,
    },
  });

  const handleDelete = (id) => {
    setAlertOpen(true);
    setId(id);
  };
  const handleFormSubmit = () => {
    if (formData.id) {
      // alert("update");
      updateResi();
      handleClose();
    } else {
      addResi();
      // alert("add");
      handleClose();
    }
  };

  return (
    <>
      <FormDialog
        open={open}
        handleClose={handleClose}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
      />
      <Button onClick={handleClickOpen} sx={{ px: 2, py: 1, mb: 4 }}>
        Add New Resi
      </Button>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
                headCells={headCells}
              />
              <TableBody>
                {stableSort(data, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => {
                    const isItemSelected = isSelected(item.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={item.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) => handleClick(event, item.id)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {item.id}
                        </TableCell>
                        <TableCell align="center">{item.no_resi}</TableCell>
                        <TableCell align="center">
                          <Tooltip title="Delete">
                            <IconButton onClick={() => handleDelete(item.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Update">
                            <IconButton onClick={() => handleUpdate(item)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            colSpan={3}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                "aria-label": "rows per page",
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </Paper>
      </Box>
    </>
  );
}
