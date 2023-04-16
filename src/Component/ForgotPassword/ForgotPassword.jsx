import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import "./ForgotPassword.css";
import { forgotPassword } from "../../Actions/User";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { successMessage, errorMessage } = useSelector((state) => state.user);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword(email));
  };

  return (
    <div className="forgotPassword">
      {successMessage && (
        <Alert severity="success" onClose={() => {}}>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" onClose={() => {}}>
          {errorMessage}
        </Alert>
      )}
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Forgot Password
        </Typography>

        <input
          className="forgotPasswordInputs"
          type="email"
          placeholder="Enter email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Link to="/reset">
          <Button type="submit">Reset Password</Button>
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
