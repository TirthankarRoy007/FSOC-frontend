import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { loginUser } from "../../Actions/User";
import { Button, Typography, Alert } from "@mui/material";
import "./Login.css"

const Login = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (error && error !== "TOKEN IS MISSING" && error !== "Request failed with status code 401") {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [alert, dispatch, error]);
  
  

  return (
    <div className="login">
      {error && !error.includes("TOKEN IS MISSING") && (
        <Alert severity="error" onClose={() => dispatch({ type: "clearErrors" })}>
          {error}
        </Alert>
      )}
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Login Page
        </Typography>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/forgot">
          <Typography> Forgot Password </Typography>
        </Link>

        <Button type="submit"> Login </Button>

        <Link to="/register">
          <Typography> new User? </Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
