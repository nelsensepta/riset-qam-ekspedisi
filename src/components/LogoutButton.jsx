import { useAuth0 } from "@auth0/auth0-react";
import { CustomizedButton as Button } from "./CustomizedButton";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button
      startIcon={<LogoutIcon />}
      onClick={() => {
        logout({
          returnTo: process.env.REACT_APP_BASE_URL,
        });
      }}
      color="secondary"
    >
      Log out
    </Button>
  );
};

export default LogoutButton;
