import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../../Reducer/project";
import { Link } from "react-router-dom";
import {
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  list: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const ProjectsList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);

  if (state?.loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography variant="h4" align="center">
        Projects List
      </Typography>
      <List className={classes.list}>
        {state?.data &&
          state?.data.map((project) => (
            <ListItem key={project._id} className={classes.listItem}>
              <ListItemText primary={project.name} />
              <Typography variant="body1">
                Members: {JSON.stringify(project.members)}
              </Typography>
              <div>
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/updateProject/${project._id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  component={Link}
                  to={`/deleteProject/${project._id}`}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/addMember/${project._id}`}
                >
                  Add Member
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  component={Link}
                  to={`/removeMember/${project._id}`}
                >
                  Remove Member
                </Button>
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/createTicket/${project._id}`}
                >
                  Add Ticket
                </Button>
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/getTickets/${project._id}`}
                >
                  Get Ticket
                </Button>
              </div>
            </ListItem>
          ))}
      </List>
    </Container>
  );
};

export default ProjectsList;
