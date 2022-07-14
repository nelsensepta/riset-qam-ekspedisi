import * as React from "react";

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

import { useRecoilState } from "recoil";
import { openState } from "../atoms";

import EnhancedTableHead from "./Table/EnhancedTableHead";
import TablePaginationActions from "./Table/TablePaginationActions";
import EnhancedTableToolbar from "./Table/EnhancedTableToolbar";
import getComparator from "../utils/getComparator";
import stableSort from "../utils/stableSort";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteData from "./DeleteData";
import UpdateData from "./UpdateData";
import { EditModal, DeleteModal } from "./Ongkir";
import FormDialog from "./Ongkir/FormDialog";

import { CustomizedButton as Button } from "./CustomizedButton";
import { gql, useMutation } from "@apollo/client";

const initialValue = { nama: "", harga_ongkir: "" };
export default function TableOngkir({ data, headCells }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isOpen, setIsOpen] = useRecoilState(openState);
  const [id, setId] = React.useState("");
  const [value, setValue] = React.useState();

  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState(initialValue);
  // console.log(value);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.id_kab);
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

  const handleDelete = (id) => {
    setIsOpen(true);
    setId(id);
  };
  const handleUpdate = (oldData) => {
    setFormData(oldData);
    handleClickOpen();
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    // console.log(value,id)
    setFormData({ ...formData, [name]: value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

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
  const ADD_ONGKIR = gql`
    mutation MyMutation(
      $harga_ongkir: String = ""
      $nama: String = ""
      $id_kab: uuid = ""
      $harga_ongkir1: String = ""
      $nama1: String = ""
    ) {
      insert_cek_ongkir_one(
        object: { harga_ongkir: $harga_ongkir, nama: $nama }
      ) {
        id_kab
        harga_ongkir
        id_prov
        nama
      }
    }
  `;

  const [updateOngkir] = useMutation(UPDATE_ONGKIR, {
    variables: {
      id_kab: formData?.id_kab,
      harga_ongkir: formData?.harga_ongkir,
      nama: formData?.nama,
    },
  });
  const [addOngkir] = useMutation(ADD_ONGKIR, {
    variables: {
      harga_ongkir: formData?.harga_ongkir,
      nama: formData?.nama,
    },
  });
  const handleFormSubmit = () => {
    if (formData.id_kab) {
      updateOngkir();
      handleClose();
    } else {
      addOngkir();
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
      <Button onClick={handleClickOpen}>add</Button>
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
                    const isItemSelected = isSelected(item.id_kab);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={item.id_kab}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) => handleClick(event, item.id_kab)}
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
                          {item.id_kab}
                        </TableCell>
                        <TableCell align="center">{item.id_prov}</TableCell>
                        <TableCell align="center">{item.nama}</TableCell>
                        <TableCell align="center">
                          {item.harga_ongkir}
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDelete(item.id_kab)}
                            >
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
      {isOpen && <EditModal items={value} />}
      {isOpen && <DeleteModal id={id} />}
      {/* <DeleteData id={id} /> */}
      {/* <UpdateData id={id} resi={value} /> */}
    </>
  );
}
