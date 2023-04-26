import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../../Actions/Project";
import { useParams } from "react-router-dom";
import { Card, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: "0 auto",
    padding: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginTop: "2rem",
  },
});

const DeleteProject = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) =>
    state.projects.data.find((p) => p._id === projectId)
  );
  const classes = useStyles();

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${project.name}"?`)) {
      dispatch(deleteProject(projectId));
      window.location.href = "/getProject";
    }
  };

  if (!project) {
    return <h1>Project not found</h1>;
  }

  return (
    <div className={classes.root}>
      <Card>
        <div className={classes.root}>
          <h1>Delete Project</h1>
          <p>Are you sure you want to delete "{project.name}"?</p>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DeleteProject;
