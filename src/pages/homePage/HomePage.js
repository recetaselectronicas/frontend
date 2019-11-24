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
      <Grid item xs={12} component={Paper} square className={classes.image}>
        <div onClick={onClick('affiliate')} className="login-link">
          <Typography variant="overline">Soy Paciente</Typography>
        </div>
        <div onClick={onClick('doctor')} className="login-link">
          <Typography variant="overline">Soy Médico</Typography>
        </div>
        <div onClick={onClick('pharmacist')} className="login-link">
          <Typography variant="overline">Soy Farmacéutico</Typography>
        </div>
        <div onClick={onClick('medicalInsurance')} className="login-link">
          <Typography variant="overline">Soy Obra Social</Typography>
        </div>
      </Grid>
    </Grid>
  );

  // return (
  //   <Grid container style={{ height: '92vh', textAlign: 'center' }} justify="center" alignItems="center">
  //     <Grid item xs={12} sm={6}>
  //       <Paper onClick={onClick('affiliate')}>
  //         <Typography variant="overline">Soy Paciente</Typography>
  //       </Paper>
  //     </Grid>
  //     <Grid item xs={12} sm={6}>
  //       <Paper onClick={onClick('doctor')}>
  //         <Typography variant="overline">Soy Médico</Typography>
  //       </Paper>
  //     </Grid>
  //     <Grid item xs={12} sm={6}>
  //       <Paper onClick={onClick('doctor')}>
  //         <Typography variant="overline">Soy Médico</Typography>
  //       </Paper>
  //     </Grid>
  //     <Grid item xs={12} sm={6}>
  //       <Paper onClick={onClick('medicalInsurance')}>
  //         <Typography variant="overline">Soy Obra Social</Typography>
  //       </Paper>
  //     </Grid>
  //   </Grid>
  // );
}
