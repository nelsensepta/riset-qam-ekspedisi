import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const MyButton = styled(Button)({
  textTransform: "none",
});

export function CustomizedButton({ children, ...rest }) {
  return (
    <MyButton variant="contained" {...rest}>
      {children}
    </MyButton>
  );
}
