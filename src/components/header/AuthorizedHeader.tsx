import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Stack,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../contexts/UserAuthContext";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const pages = [
  { name: "Edit Menu", path: "/menu" },
  { name: "My QR", path: "/menu" },
  { name: "Profile", path: "/profile" },
  { name: "logout", path: "/login" },
];

const AuthorizedHeader: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      sessionStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          mt: { xs: 1, sm: 0 },
          position: { sm: "fixed" },
          top: { sm: 0 },
          left: { sm: 0 },
          backgroundColor: "rgba(252, 252, 252, 0.4)",
          color: "rgb(71, 83, 107)",
          //   borderRadius: "10px",
          borderRadius: { xs: "10px", sm: "0" },
        }}
      >
        <Toolbar>
          <RestaurantMenuIcon />
          <Typography variant="h5" sx={{ flexGrow: 1, borderRadius: 2, pl: 1 }}>
            {user?.displayName ?? "Get My Menu"}
          </Typography>

          {/* Desktop Menu (Hidden on Mobile) */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={
                  page.name === "logout"
                    ? handleLogout
                    : () => handleMenuClick(page.path)
                }
                sx={{
                  color: "rgb(71, 83, 107)",
                  textTransform: "none",
                  fontSize: "16px",
                  "&:hover": { backgroundColor: "rgba(71, 83, 107, 0.1)" },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Stack>

          {/* Mobile Menu Icon (Hidden on Desktop) */}
          <Button
            sx={{ display: { sm: "none" }, mr: 1.5 }}
            variant="outlined"
            onClick={() => handleMenuClick("/menu")}
            size="small"
          >
            Edit Menu
          </Button>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            backgroundColor: "rgba(252, 252, 252, 0.4)",
            color: "rgb(71, 83, 107)",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            <List>
              {pages.map((page, index) => (
                <ListItem
                  component="button"
                  key={index}
                  onClick={
                    page.name === "logout"
                      ? handleLogout
                      : () => handleMenuClick(page.path)
                  }
                >
                  <ListItemText primary={page.name} />
                </ListItem>
              ))}
            </List>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default AuthorizedHeader;
