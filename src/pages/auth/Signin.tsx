import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, TextField, Grid, Box, Typography, Alert } from '@mui/material';
import Loading from '../../components/Loading';
import './signup-signin-styles.css';
import { useUserAuth } from '../../contexts/UserAuthContext';
import { OAuthCredential } from 'firebase/auth';
import loginSvg from '../../assets/login1.svg';

const Signin = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { logIn, setLogin } = useUserAuth();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await logIn(email, password);
      const token = (res?.user as unknown as OAuthCredential).accessToken;
      if (token) sessionStorage.setItem('Auth Token', token);
      const userData = JSON.stringify(res?.user);
      if (userData) sessionStorage.setItem('user', userData);
      setLogin(true);
      navigate('/');
    } catch (err) {
      setError(err as string);
    }
    setLoading(false);
  }

  useEffect(() => {
    const authToken = sessionStorage.getItem('Auth Token');
    if (authToken) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box className="signin-container">
          {/* Left Side - SVG Image (Visible only on Desktop) */}
          <Box className="signin-svg">
            <img src={loginSvg} alt="Login Illustration" />
          </Box>

          {/* Right Side - Sign-in Box */}
          <Box className="signin-box">
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" fullWidth variant="contained" className="formBtn" disabled={loading} sx={{ mt: 2 }}>
                Sign In
              </Button>
              <Grid container sx={{ mt: 1 }}>
                <Grid item xs>
                  <Link to="/forgot-password" className="links">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item xs>
                  <Link to="/register" className="links">
                    {'Create New Account? Sign Up'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Signin;
