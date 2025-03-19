import { Box, CircularProgress } from "@mui/material";
import { useUserAuth } from "../../contexts/UserAuthContext";
import AuthorizedHeader from "./AuthorizedHeader";
import UnAuthorizedHeader from "./UnAuthorizedHeader";

const Header = () => {
  const { user, loading } = useUserAuth();
  console.log("🚀 ~ user:", user);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return <>{user ? <AuthorizedHeader /> : <UnAuthorizedHeader />}</>;
};

export default Header;
