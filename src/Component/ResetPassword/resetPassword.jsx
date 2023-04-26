import React, { useState, useEffect } from "react";
import "./resetPassword.css";
import { Button, Typography, TextField, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/User";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();

  const { secretQuestion, userEmail } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    setEmail(userEmail);
    setQuestion(secretQuestion);
  }, [userEmail, secretQuestion]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email, question, answer, newPassword));
  };

  const resetPasswordHandler = async () => {
    try {
      const response = await fetch(`http://localhost:4000/forgot`);
      const data = await response.json();
      if (response.ok) {
        setQuestion(data.secretQuestion);
        setEmail(data.email);
      } else {
        // display an error message if there's an issue fetching the data
        alert("Failed to fetch user data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box maxWidth={400} mx={3}>
        <form onSubmit={submitHandler}>
          <Typography variant="h4" gutterBottom>
            Reset Password
          </Typography>

          <TextField
            type="email"
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            type="text"
            label="Security Question"
            fullWidth
            margin="normal"
            variant="outlined"
            value={question}
            required
            onChange={(e) => setQuestion(e.target.value)}
          />

          <TextField
            type="text"
            label="Security Answer"
            fullWidth
            margin="normal"
            variant="outlined"
            value={answer}
            required
            onChange={(e) => setAnswer(e.target.value)}
          />

          <TextField
            type="password"
            label="New Password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={newPassword}
            required
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Box mt={2} textAlign="center">
            <Link to="/login">
              <Typography variant="body1">
                Go to Login
              </Typography>
            </Link>
          </Box>
        </form>
        <Box mt={2} textAlign="center">
          <Button variant="contained" onClick={resetPasswordHandler}>
            Reset Password
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
