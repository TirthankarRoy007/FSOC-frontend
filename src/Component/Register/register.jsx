import React, { useEffect, useState } from "react";
import { Typography, Button,Alert } from "@mui/material";
import "./register.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { registerUser } from "../../Actions/User";

const Register = () => {
  const alert = useAlert();
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
    dispatch(
      registerUser(name, email, password, company, secretQuestionObj)
    );
  };

  useEffect(() => {
    if (error && error !== "TOKEN IS MISSING" && error !== "Request failed with status code 401") {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [alert, dispatch, error]);

  return (
    <div className="register">
      {error && !error.includes("TOKEN IS MISSING") && (
        <Alert severity="error" onClose={() => dispatch({ type: "clearErrors" })}>
          {error}
        </Alert>
      )}
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          User SignUp
        </Typography>

        <input
          type="text"
          className="registerInputs"
          placeholder="Enter name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          className="registerInputs"
          placeholder="Enter email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="registerInputs"
          placeholder="Enter Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="text"
          className="registerInputs"
          placeholder="Enter company"
          value={company}
          required
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="text"
          className="registerInputs"
          placeholder="Enter Secret Question"
          value={secretQuestion.question}
          required
          onChange={(e) =>
            setSecretQuestion({
              ...secretQuestion,
              question: e.target.value,
            })
          }
        />

        <input
          type="text"
          className="registerInputs"
          placeholder="Enter answer"
          value={secretQuestion.answer}
          required
          onChange={(e) =>
            setSecretQuestion({
              ...secretQuestion,
              answer: e.target.value,
            })
          }
        />

        <Link to="/">
          <Typography> Already Signed Up ? Login Now </Typography>
        </Link>
          
        <Button disabled={loading} type="submit">
          {" "}
          Sign Up{" "}
        </Button>
      </form>
    </div>
  );
};

export default Register;
