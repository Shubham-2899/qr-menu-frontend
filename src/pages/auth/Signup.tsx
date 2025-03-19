import * as React from "react";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { Errors, IUserData } from "../../interfaces";
import { ChangeEvent, useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { auth } from "../../../firebase";
import { updateProfile } from "firebase/auth";
import { useUserAuth } from "../../contexts/UserAuthContext";
import {
  hasErrorsInUserData,
  userDataValidation,
} from "../../utils/UserDataValidation";
import "./signup-signin-styles.css";
import AccessAccount from "../../assets/access-account.svg";
import QrCode2Icon from '@mui/icons-material/QrCode2';

const Signup = () => {
  const userDefault: IUserData = {
    username: "",
    email: "",
    password: "",
    contact_number: "",
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<IUserData>(userDefault);
  const [formErrors, setFormErrors] = useState<Errors>({} as Errors);

  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validateData: Errors = userDataValidation(
      userData.email,
      userData.password,
      confirmPassword,
      userData.username
      // userData.contact_number
    );

    if (!hasErrorsInUserData(validateData)) {
      try {
        setLoading(true);
        await signUp(userData.email, userData.password, userData.username);
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: userData.username,
          });
        }
        navigate("/login");
      } catch (err: unknown) {
        console.log(err);
        setError("Email Already in Use");
      }
    } else {
      setFormErrors(validateData);
    }
    setLoading(false);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <Box className="auth-container">
      {/* Left Side - SVG (Desktop Only) */}
      <Box className="auth-svg">
        <img src={AccessAccount} alt="Signup Illustration" />
      </Box>

      {/* Right Side - Form */}
      <Box className="auth-box">
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <QrCode2Icon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Register
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {error.length ? <span>{error}</span> : null}
            <Grid item xs={12}>
              <TextField
                name="username"
                required
                fullWidth
                id="username"
                label="Restaurant/Cafe Name"
                autoFocus
                onChange={onChangeHandler}
                size="small"
              />
            </Grid>
            {formErrors.nameError && <span>{formErrors.nameError}</span>}
            {/* <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="contact_number"
                label="Contact Number"
                name="contact_number"
                onChange={onChangeHandler}
                size="small"
              />
            </Grid>
            {formErrors.contactError && <span>{formErrors.contactError}</span>} */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                onChange={onChangeHandler}
                size="small"
              />
            </Grid>
            {formErrors.emailError && <span>{formErrors.emailError}</span>}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={onChangeHandler}
                size="small"
              />
            </Grid>
            {formErrors.passwordError && (
              <span>{formErrors.passwordError}</span>
            )}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirm_password"
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                size="small"
              />
            </Grid>
            {formErrors.confirmPassError && (
              <span>{formErrors.confirmPassError}</span>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="formBtn"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end" sx={{ mt: 1 }}>
            <Grid item>
              <Link to="/login" className="links">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
