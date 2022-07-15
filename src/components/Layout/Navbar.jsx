import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
// import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
// import { NavigateBefore } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { CustomizedButton as Button } from "../CustomizedButton";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
const drawerWidth = 240;

function Navbar(props) {
  const { logout, isAuthenticated, loginWithRedirect } = useAuth0();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navItems = [
    {
      name: "Cek Ongkir",
      slug: "cek-ongkir",
    },
    {
      name: "Cek Resi",
      slug: "cek-resi",
    },
  ];
  // React.useEffect(() => {
  //   return () => (isAuthenticated ? setNavItems([]) : setNavItems(navItems));
  // }, [isAuthenticated, navItems]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.slug} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Container fixed>
          <Toolbar style={{ padding: 0 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mz: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              QAM
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {isAuthenticated
                ? navItems.map((item) => (
                    <NavLink
                      key={item.slug}
                      to={`/home/${item.slug}`}
                      style={({ isActive }) => ({
                        color: isActive ? "greenyellow" : "white",
                        textDecoration: "none",
                        marginRight: "10px",
                      })}
                    >
                      {item.name}
                    </NavLink>
                  ))
                : null}
            </Box>
            {isAuthenticated ? <LogoutButton /> : null}
            {!isAuthenticated ? <LoginButton /> : null}
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
