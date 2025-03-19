import React from "react";
import { Box } from "@mui/material";
import GetMyMenuRoutes from "./routes";
import Footer from "./components/Footer";
import {
  UserAuthContextProvider
} from "./contexts/UserAuthContext";
import Header from "./components/header/Header";

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
