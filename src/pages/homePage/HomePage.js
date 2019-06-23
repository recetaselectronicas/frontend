/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import HomeBackground from './home_background.jpg';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${HomeBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  loginLink: {
    width: '100%',
    height: '200px',
    borderLeft: ' 1px solid black',
    borderRight: '1px solid black',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    cursor: 'pointer',
  },
}));

export default function HomePage(props) {
  const classes = useStyles();
  const onClick = () => {
    props.history.push('/login');
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} component={Paper} square className={classes.image}>
        <Paper className={classes.paper}>
          <div onClick={onClick} className={classes.loginLink}>
            Soy medico
          </div>
          <div onClick={onClick} className={classes.loginLink}>
            Soy os
          </div>
          <div onClick={onClick} className={classes.loginLink}>
            Soy paciente
          </div>
          <div onClick={onClick} className={classes.loginLink}>
            Soy farmaceutico
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
