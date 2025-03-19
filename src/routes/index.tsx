import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";
import { ForgotPassword } from "../pages/auth/ForgotPassword";
import NotFound404 from "../pages/404/404";
import Home from "../pages/home/Home";
import Products from "../pages/Products";
import Pricing from "../pages/Pricing";
import OurClients from "../pages/OurClients";
import Menu from "../pages/menu/Menu";
import { ProtectedRoute } from "./ProtectedRoute";
import Profile from "../pages/profile/Profile";

const GetMyMenuRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="login" element={<Signin />} />
      <Route path="register" element={<Signup />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="products" element={<Products />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="our-clients" element={<OurClients />} />

      <Route element={<ProtectedRoute />}>
        <Route path="menu" element={<Menu />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
};

export default GetMyMenuRoutes;
