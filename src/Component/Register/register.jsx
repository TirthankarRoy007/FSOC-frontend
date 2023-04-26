import React, { useEffect, useState } from "react";
import { Typography, Button, TextField, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Actions/User";

const Register = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [secretQuestion, setSecretQuestion] = useState({
    question: "",
    answer: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const secretQuestionObj = {
      question: secretQuestion.question,
      answer: secretQuestion.answer,
    };
    dispatch(registerUser(name, email, password, company, secretQuestionObj));
  };

  useEffect(() => {
    if (
      error &&
      error !== "TOKEN IS MISSING" &&
      error !== "Request failed with status code 401"
    ) {
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <form className="registerForm" onSubmit={submitHandler}>
          <Typography variant="h3" style={{ padding: "2vmax" }}>
            User SignUp
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            label="Company"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <TextField
            label="Secret Question"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={secretQuestion.question}
            onChange={(e) =>
              setSecretQuestion({
                ...secretQuestion,
                question: e.target.value,
              })
            }
          />

          <TextField
            label="Answer"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={secretQuestion.answer}
            onChange={(e) =>
              setSecretQuestion({
                ...secretQuestion,
                answer: e.target.value,
              })
            }
          />

          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography> Already Signed Up ? Login Now </Typography>
          </Link>

          <Button
            disabled={loading}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Sign Up
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Register;