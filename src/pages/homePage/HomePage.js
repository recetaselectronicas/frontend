/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import HomeBackground from './home_background.jpg';
import './home.css';

const useStyles = makeStyles(() => ({
  root: {
    height: '92vh',
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
      <Grid item xs={12} component={Paper} square className={`${classes.image} image`}>
        <div data-testid="affiliate" onClick={onClick('affiliate')} className="login-link">
          <Typography variant="overline">Soy Paciente</Typography>
        </div>
        <div data-testid="doctor" onClick={onClick('doctor')} className="login-link">
          <Typography variant="overline">Soy Médico</Typography>
        </div>
        <div data-testid="pharmacist" onClick={onClick('pharmacist')} className="login-link">
          <Typography variant="overline">Soy Farmacéutico</Typography>
        </div>
        <div data-testid="medicalInsurance" onClick={onClick('medicalInsurance')} className="login-link">
          <Typography variant="overline">Soy Obra Social</Typography>
        </div>
      </Grid>
    </Grid>
  );
}
