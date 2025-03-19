import React from "react";
import { Box } from "@mui/material";
import Header from "./components/Header";
import GetMyMenuRoutes from "./routes";
import Footer from "./components/Footer";
import { UserAuthContextProvider } from "./contexts/UserAuthContext";

const App: React.FC = () => {
  return (
    <>
      <UserAuthContextProvider>
      <Box className="Container">
        <Header />
        <GetMyMenuRoutes />
        <Footer />
      </Box>
      </UserAuthContextProvider>
    </>
  );
};

export default App;
