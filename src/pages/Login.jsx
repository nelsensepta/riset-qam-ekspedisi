import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Button
        onClick={() => loginWithRedirect()}
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        color="primary"
      >
        Login
      </Button>
    )
  );
};

export default LoginButton;
