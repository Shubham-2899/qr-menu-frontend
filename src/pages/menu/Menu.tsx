import { Box } from "@mui/material";

const Menu = () => {
  console.log("called menu page");
  return (
    <Box sx={{ pt: { sm: 10 }, height: "100vh" }}>
      <h1>Menu</h1>
      <p>Menu Page</p>
    </Box>
  );
};

export default Menu;
