/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../contexts/UserAuthContext";
import { validateEmail } from "../../utils/UserDataValidation";
import forgotPasswordIllustration from "../../assets/forgot-password1.svg";

export const ForgotPassword = () => {
  const { resetPassword } = useUserAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailRef?.current?.value) {
      const validationMessage = validateEmail(emailRef?.current?.value);
      if (!validationMessage.length) {
        try {
          setError("");
          setMessage("");
          setLoading(true);
          await resetPassword(emailRef?.current?.value);
          setMessage("Check your inbox for further instructions");
        } catch (error: any) {
          setError(error.message || "Failed to reset password");
        }
        setLoading(false);
      } else {
        setMessage("");
        setError(`${validationMessage} Please enter correct email `);
      }
    }
  };

  return (
    <Box className="forgot-password-container">
      {/* Left Side: SVG (Only visible on Desktop) */}
      <Box className="forgot-password-svg">
        <img src={forgotPasswordIllustration} alt="Forgot Password" />
      </Box>

      {/* Right Side: Form */}
      <Box className="forgot-password-form">
        <Typography variant="h4" align="center" sx={{ padding: "25px 0" }}>
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={submitHandler} noValidate>
          {error && <Alert severity="error">{error.toString()}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
          <Typography variant="body1" sx={{ paddingTop: "10px" }}>
            Enter your email address and we'll send you a link to reset your
            password.
          </Typography>
          <TextField
            sx={{ mb: 2 }}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
            inputRef={emailRef}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="formBtn"
            disabled={loading}
          >
            Submit
          </Button>
          <Link to="/login" className="links" style={{ marginTop: "10px" }}>
            {"Back to Sign in"}
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
