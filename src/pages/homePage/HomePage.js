/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import HomeBackground from './home_background.jpg';
import './home.css';

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
}));

export default function HomePage(props) {
  const classes = useStyles();
  const onClick = type => () => {
    props.setType(type);
    props.history.push('/login');
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} component={Paper} square className={classes.image}>
        <div onClick={onClick('doctor')} className="login-link">
          Soy un medico
        </div>
        <div onClick={onClick('medicalInsurance')} className="login-link">
          Soy una obra social
        </div>
        <div onClick={onClick('affiliate')} className="login-link">
          Soy un paciente
        </div>
        <div onClick={onClick('pharmacist')} className="login-link">
          Soy un farmaceutico
        </div>
      </Grid>
    </Grid>
  );
}