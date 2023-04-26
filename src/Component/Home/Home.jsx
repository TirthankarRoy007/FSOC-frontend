import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
  },
  heading: {
    marginBottom: theme.spacing(4),
  },
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
    '& > *:not(:last-child)': {
      marginRight: theme.spacing(3),
    },
  },
}));

function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.heading}>Welcome to the Home Page</h1>
      <div className={classes.buttonGroup}>
        <Link to='/createProject'>
          <Button variant="contained" color="primary">
            Create Project
          </Button>
        </Link>
        <Link to='/getProject'>
          <Button variant="contained" color="primary">
            Get Project
          </Button>
        </Link>
        <Link to='/logout'>
          <Button variant="contained" color="primary">
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
