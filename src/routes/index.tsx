import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";
import { ForgotPassword } from "../pages/auth/ForgotPassword";
import NotFound404 from "../pages/404/404";
import Home from "../pages/home/Home";

const GetMyMenuRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="login" element={<Signin />} />
      <Route path="register" element={<Signup />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="tasks" element={<div>tasks</div>} />
      <Route path="about" element={<div>About us</div>} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
};

export default GetMyMenuRoutes;
