import { useAuth0 } from "@auth0/auth0-react";
import { CustomizedButton as Button } from "./CustomizedButton";
import LoginIcon from "@mui/icons-material/Login";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      startIcon={<LoginIcon />}
      onClick={() => {
        return loginWithRedirect();
      }}
      color="secondary"
    >
      Login
    </Button>
  );
};

export default LoginButton;
