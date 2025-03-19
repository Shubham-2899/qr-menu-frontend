import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: { xs: "16px", sm: "18px", md: "20px" },
          textAlign: "center",
          padding: "25px",
        }}
        className="footer"
      >
        ©{new Date().getFullYear()} made with ♥ in india  <br />
        {/* Get My Menu. All rights reserved. */}
      </Typography>
    </Box>
  );
};

export default Footer;
