import React, { useState } from "react";
import { Typography, Button, TextField, Box } from "@mui/material";
import { forgotPassword } from "../../Actions/User";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email) {
      // If the email field is empty, display an error message
      alert("Please enter your email");
      return;
    }
    try {
      // Dispatch the forgotPassword action
      dispatch(forgotPassword(email));
      // If the dispatch is successful, redirect to the reset password page
      window.location.href = "/reset";
    } catch (error) {
      // If there's an error, display an error message
      alert("Invalid email. Please try again.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <form onSubmit={submitHandler}>
        <Typography variant="h5" mb={2}>
          Forgot Password
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button variant="contained" type="submit">
            Reset Password
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ForgotPassword;
