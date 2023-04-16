import React, { useState, useEffect } from "react";
import "./resetPassword.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/User";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, secretQuestion, userEmail } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    axios
      .post("/forgot")
      .then((res) => {
        setEmail(res.data.email);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, dispatch]);

  useEffect(() => {
    setEmail(userEmail);
    setQuestion(secretQuestion);
  }, [userEmail, secretQuestion]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email, question, answer, newPassword));
  };

  return (
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Reset Password
        </Typography>

        <input
          type="email"
          value={email}
          className="resetPasswordInputs"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          value={question}
          className="resetPasswordInputs"
          required
          onChange={(e) => setQuestion(e.target.value)}
        />

        <input
          type="text"
          value={answer}
          className="resetPasswordInputs"
          placeholder="Enter Answer"
          required
          onChange={(e) => setAnswer(e.target.value)}
        />

        <input
          type="password"
          className="resetPasswordInputs"
          placeholder="Enter New Password"
          value={newPassword}
          required
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button type="submit">Reset</Button>
        <Link to="/login">
          <Typography>Go to Login</Typography>
        </Link>
      </form>
    </div>
  );
};

export default ResetPassword;
