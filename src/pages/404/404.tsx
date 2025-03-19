import { Button, Typography, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Refresh as RefreshIcon,
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import PageNotFoundImage from "../../assets/404IMG.jpg";

const NotFound404 = () => {
  const navigate = useNavigate();

  const handleReloadPage = () => {
    window.location.reload(); // Reloads the current page
  };

  const handleGoBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  const handleGoHome = () => {
    navigate("/"); // Navigates to the home page
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
        color="#777"
      >
        <Grid item>
          <Typography variant="h3" align="center">
            Server Error
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={PageNotFoundImage}
              alt="Page Not Found"
              style={{ maxWidth: "250px" }}
            />
          </div>
          <Typography variant="body1" align="center">
            This page either doesn't exist or it has been moved elsewhere.
          </Typography>
        </Grid>
        <Grid item container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={handleReloadPage}
            >
              Reload Page
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={handleGoBack}
            >
              Back to Previous Page
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={handleGoHome}
            >
              Home Page
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound404;