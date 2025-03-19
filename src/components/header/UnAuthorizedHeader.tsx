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
import { Link, useNavigate } from "react-router-dom";

const pages = [
  { name: "Products", path: "/products" },
  { name: "Pricing", path: "/pricing" },
  { name: "Our Clients", path: "/our-clients" },
  { name: "Login", path: "/login" },
  { name: "Get QR", path: "/register" },
];

const UnAuthorizedHeader: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navigate = useNavigate();

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
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Get My Menu
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
                component={Link}
                to={page.path}
                sx={{
                  color: "rgb(71, 83, 107)",
                  textTransform: "none",
                  fontSize: "16px",
                  "&:hover": { backgroundColor: "rgba(71, 83, 107, 0.1)" },
                }}
                variant={page.name === "Get QR" ? "outlined" : "text"}
              >
                {page.name}
              </Button>
            ))}
          </Stack>

          {/* Mobile Menu Icon (Hidden on Desktop) */}
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
            {pages.map((page, index) => (
              <ListItem
                component="button"
                key={index}
                onClick={() => handleMenuClick(page.path)}
                sx={{ color: "rgb(71, 83, 107)" }}
              >
                <ListItemText primary={page.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default UnAuthorizedHeader;
