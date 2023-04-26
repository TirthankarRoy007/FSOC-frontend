import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Actions/User";
import { Button, Typography, TextField, Box, Container } from "@mui/material";
import "../Login/Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false); // state variable to track login error

  const loginHandler = async (e) => {
    e.preventDefault();
    const success = await dispatch(loginUser(email, password));
    if (!success) {
      setLoginError(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box className="login-box" sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {loginError && (
          <Typography variant="subtitle1" color="error" sx={{ mt: 2 }}>
            Incorrect email or password. Please try again.
          </Typography>
        )}
        <Box component="form" noValidate sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{
              style: { borderBottom: "none" },
            }}
            sx={{ width: '100%' }}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: '100%' }}
          />
          <Link to="/forgot" className="forgot-link">
            <Typography variant="subtitle1"> Forgot Password? </Typography>
          </Link>
          <Button className="login-button" fullWidth variant="contained" onClick={loginHandler}>
            Sign In
          </Button>
          <Box sx={{ mt: 3 }}>
            <Link to="/register" className="register-link">
              <Typography variant="subtitle1"> New User? Create an account </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
