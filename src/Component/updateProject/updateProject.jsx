import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "../../Actions/Project";
import { useParams } from "react-router-dom";
import { Card, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: '0 auto',
    padding: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '2rem',
  },
});

const UpdateProject = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const project = useSelector((state) =>
    state.projects.data.find((p) => p._id === projectId)
  );
  const classes = useStyles();

  useEffect(() => {
    if (project) {
      setName(project.name);
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(updateProject(name, projectId));
      setName("");
      window.location.href = "/getProject"
    }
  };

  if (!project) {
    return <h1>Project not found</h1>;
  }

  return (
    <div className={classes.root}>
      <Card>
        <div className={classes.root}>
          <h1>Update Project</h1>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              label="Project Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default UpdateProject;
