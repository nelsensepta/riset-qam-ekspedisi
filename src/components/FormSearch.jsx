import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
export default function FormSearch() {
  const [search, setSearch] = useState("");
  return (
    <TextField
      size="small"
      sx={{ width: 300 }}
      id="input-with-icon-textfield"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
