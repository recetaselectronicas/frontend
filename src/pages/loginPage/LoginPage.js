/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import loginBackground from './login_background.jpg';
import UserService from '../../services/UserService';
import SessionService from '../../services/SessionService';
import i18n from '../../utils/i18n';

const useStyles = makeStyles(theme => ({
  root: {
    height: '92vh',
  },
  image: {
    backgroundImage: `url(${loginBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: theme.palette.error.dark,
  },
}));

const initialStateUser = {
  username: '',
  password: '',
};

export default function LoginPage(props) {
  const classes = useStyles();
  const [user, setUserData] = useState(initialStateUser);
  const [error, setError] = useState('');
  const { type, setTitle } = props;


  useEffect(() => {
    setTitle(`Login de ${i18n.gettext(type)}`);
  }, [type]);

  const login = async (event) => {
    event.preventDefault();
    try {
      const userLogged = await UserService.login({ ...user, type });
      SessionService.saveSessionData(userLogged.token, type);
      props.setUserIsLogged(true);
      props.history.push('/recetas');
    } catch ({ message }) {
      setError(message);
    }
  };

  const onChangeInput = ({ target: { name, value } }) => {
    setUserData({ ...user, [name]: value });
  };

  const goToCreateAccount = (event) => {
    event.preventDefault();
    props.history.push('/create-account');
  };

  if (!type) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate onSubmit={login} data-testid="login-form">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuario"
              name="username"
              autoComplete="off"
              autoFocus
              value={user.username}
              onChange={onChangeInput}
              data-testid="user"

            />
            <TextField
              data-testid="password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={onChangeInput}
            />
            {error && <Typography className={classes.error}>{error}</Typography>}
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Recordarme" />
            <Button
              type="submit"
              onClick={login}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={user.password.length === 0 || user.username.length === 0}
            >
              Acceder
            </Button>

            {type !== 'medicalInsurance' && (
              <Grid container>
                <Grid item>
                  <Link onClick={goToCreateAccount} href="#" variant="inherit">No tenés cuenta? Registrate</Link>
                </Grid>
              </Grid>
            )}
            <Box mt={5} />
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
