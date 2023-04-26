import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../../Actions/Project";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
} from "@material-ui/core";
import "./createProject.css";

const ProjectForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(createProject(name));
      setName("");
    }
  };

  return (
    <Card className="card-container" raised>
      <CardHeader title="Create Project" />
      <CardContent>
        <TextField
          label="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSubmit}
        >
          Create
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
