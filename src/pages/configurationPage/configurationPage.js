import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, Container, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Divider, Button, ExpansionPanelActions, TextField, Link, Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CheckRounded, CloseRounded } from '@material-ui/icons';
import QRCode from 'qrcode.react';
import UserService from '../../services/UserService';
import SnackbarWrapper from '../../components/snackbarWrapper/SnackbarWrapper';

const useStyles = makeStyles(theme => ({
  root: {
  },
  paper: {
    height: '100%',
  },
  button: {
    //marginTop: theme.spacing(1),
  },
  paragraph: {
    marginTop: theme.spacing(1),
  },
  checkIcon: {
    color: 'green',
    marginRight: theme.spacing(1),
  },
  closeIcon: {
    color: 'red',
    marginRight: theme.spacing(1),
  },
  qr: {
    margin: theme.spacing(2),
  },
  twoFactorInstructions: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
  },
  code: {
    marginTop: theme.spacing(2),
  },
  codeInput: {
    margin: theme.spacing(2),
  },
  codeInputInput: {
    fontSize: theme.typography.h3.fontSize,
    textAlign: 'center',
  },
}));

const snackbarInitialState = { open: false, variant: 'error', message: '' };

export default function ConfigurationPage(props) {
  const classes = useStyles();
  const [configuration, setConfiguration] = React.useState({});
  const { userPass, twoFactor, dniPhoto } = configuration;
  const [snackbar, setSnackbar] = React.useState(snackbarInitialState);

  const getConfiguration = () => UserService.getConfiguration();

  const updateConfiguration = () => {
    getConfiguration().then((config) => {
      setConfiguration(config);
    });
  };

  React.useEffect(() => {
    updateConfiguration();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleVerifyTwoFactor = (data) => {
    UserService.verifyTwoFactor(data.twoFactorCode)
      .then(() => {
        setSnackbar({
          open: true,
          message: 'Autenticación en dos pasos configurada correctamente',
          variant: 'success',
        });
        updateConfiguration();
      })
      .catch((err) => {
        if (err.type === 'UNIFY' && err.status === 401 && err.message === 'invalid token') {
          setSnackbar({
            open: true,
            message: 'Al parecer el código es inválido. Intenta nuevamente',
            variant: 'error',
          });
        } else {
          setSnackbar({
            open: true,
            message: (err.response && err.response.data.message) || err.message,
            variant: 'error',
          });
        }
      });
  };

  return (
    <>
      <Container>
        {userPass
          && (
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="subtitle1">Usuario y Contraseña</Typography>
              </ExpansionPanelSummary>
              <Divider variant="middle" />
              <ExpansionPanelDetails>
                <Container>
                  <Typography variant="body2">
                    Usuario y Contraseña para autenticarse ante el sistema. Tiene la posibilidad de cambiar la contraseña cuando lo desee.
                  </Typography>
                  <TextField label="Usuario" value={userPass.username} />
                  <br />
                  <TextField label="Contraseña" value={''} />
                </Container>
              </ExpansionPanelDetails>
              <ExpansionPanelActions>
                <Button color="primary">Guardar</Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          )}
        {twoFactor
          && (
            <TwoFactor twoFactor={twoFactor} verifyTwoFactor={handleVerifyTwoFactor} reload={updateConfiguration} />
          )}
      </Container>
      <SnackbarWrapper
        vertical="bottom"
        horizontal="center"
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        variant={snackbar.variant}
        message={snackbar.message}
      />
    </>
  );
}

function TwoFactor(props) {
  const classes = useStyles();
  const { verifyTwoFactor, reload } = props;
  const { twoFactor } = props;
  const { keyGenerated, verified, isDefault } = twoFactor;
  const [isEnabling, setIsEnabling] = React.useState(false);
  const [qrData, setQrData] = React.useState('');
  const [isCodeComplete, setIsCodeComplete] = React.useState(false);
  const [code, setCode] = React.useState('');

  React.useEffect(() => {
    if (isEnabling) {
      UserService.getTwoFactorKey()
        .then((data) => {
          setQrData(data.qrData);
        });
    } else {
      setQrData('');
    }
  }, [isEnabling]);

  const reset = () => {
    setIsEnabling(false);
    setCode('');
    setIsCodeComplete(false);
    setQrData('');
    reload();
  };

  const handleCancel = () => {
    reset();
  };

  const hanldeCodeCompletition = (completition) => {
    setIsCodeComplete(completition);
  };

  const hanldeCodeChange = (_code) => {
    setCode(_code);
  };

  const sendCode = () => {
    verifyTwoFactor({ twoFactorCode: code });
  };

  const handleDisableTwoFactor = () => {
    UserService.getTwoFactorKey()
      .then(() => {
        reset();
      });
  };

  const handleRelinkTwoFactor = () => {
    UserService.getTwoFactorKey()
      .then(() => {
        reset();
        setIsEnabling(true);
      });
  };

  return (
    <>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="twoFactorContent"
          id="twoFactor"
        >
          {verified && <CheckRounded className={classes.checkIcon} />}
          {!verified && <CloseRounded className={classes.closeIcon} />}
          <Typography>Autenticación en dos pasos</Typography>
        </ExpansionPanelSummary>
        <Divider variant="middle" />
        <ExpansionPanelDetails>
          <Container>
            <Typography className={classes.paragraph} variant="body2">
              La autenticación en dos pasos es una capa adicional de seguridad para su cuenta. Le proveerá una forma de realizar
              agreditaciones de identidad más rápidas y sin el miedo de que su contraseña real quede expuesta ante cualquiera.
            </Typography>
            <Typography className={classes.paragraph} variant="body2">
              La forma en que funciona es muy sencilla. Vincula su cuenta de Unify con una aplicación de Google en el celular. Cuando se le
              solicite ingresar un código de autenticación, ingresa a la app, copia el código que haya generado y acepta. Eso es todo lo que require. La app
              no consume crédito ni datos, por lo que no hay problema si demora o precisa de varios códigos hasta hacerlo correctamente.
            </Typography>
            {verified && (
              <Typography className={classes.paragraph} variant="body2">
                Si quiere dejar de utilizarlo, deshabilite la autenticacion en dos pasos.
                <br />
                Si quiere reestablecer la autenticación en dos pasos por temas de seguridad, porque no recuerda como obtener los códigos, desinstaló la app de Google o cualquier otro motivo, haga click en revincular y siga las instrucciones.
              </Typography>
            )}
            {!verified && (
            <Typography className={classes.paragraph} variant="body2">
                Si quiere probarlo, habilite la autenticación en dos pasos y siga las instrucciones. (Podrá deshacer los cambios cuando lo desee)
            </Typography>
            )}
            {isEnabling && !twoFactor.verified && (
              <Container>
                <Paper className={classes.twoFactorInstructions} elevation={2}>
                  <Typography className={classes.paragraph} variant="subtitle1">
                    Que bueno que quieras intentarlo!
                  </Typography>
                  <Typography className={classes.paragraph} variant="body2">
                    Lo primero que hay que hacer es descargarse una app de Google llamada 
                    <Link href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=es_AR" target="_blank"> Google Authenticator</Link>
                  </Typography>
                  <Typography className={classes.paragraph} variant="body2">
                    Una vez descargada, abrirla y apretar el botón de abajo a la derecha que tiene un + (mas). Se presentarán dos opciones.
                    Selecciona la que diga &quot;Escanear códigos de barras&quot;
                  </Typography>
                  <Typography className={classes.paragraph} variant="body2">
                    A continuación, escanee el siguiente código:
                  </Typography>
                  <Grid container justify="center">
                    <QRCode className={classes.qr} value={qrData} size={300} level="H" />
                  </Grid>
                  <Typography className={classes.paragraph} variant="body2">
                    Una vez escaneado se generará un código. Este cógigo cambiará cada 30 segundos (puedes ver cuanto tiempo queda antes que cambie
                    mirando el reloj circular a la derecha). Son estos códigos los que tendrás que usar para acreditar su identidad en un futuro.
                  </Typography>
                  <Typography className={classes.paragraph} variant="body2">
                    Falta solo un paso que es ingresar uno de los códigos para verificar que la integración haya sido exitosa.
                  </Typography>
                  <Typography className={classes.paragraph} variant="body2">
                    Por favor ingresa un código a continuación y clickea en &quot;Enviar&quot; para terminar:
                  </Typography>
                  <CodeInput onCompletitionChange={hanldeCodeCompletition} onCodeChange={hanldeCodeChange} />
                  <Grid container justify="center">
                    <Typography className={classes.paragraph} variant="caption" align="center">
                      No hay problema si el tiempo se acabó, o el código ingresado no es el correcto.
                      <br />
                      Puedes intentarlo tantas veces como quieras &#128540;
                    </Typography>
                  </Grid>
                </Paper>
              </Container>
            )}
          </Container>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          {!verified && !isEnabling && <Button className={classes.button} color="primary" variant="contained" onClick={() => setIsEnabling(true)}>Habilitar</Button>}
          {!verified && isEnabling && <Button className={classes.button} color="secondary" variant="contained" onClick={handleCancel}>Cancelar</Button>}
          {!verified && isEnabling && <Button className={classes.button} color="primary" variant="contained" disabled={!isCodeComplete} onClick={sendCode}>Enviar</Button>}
          {verified && <Button className={classes.button} color="secondary" variant="contained" onClick={handleDisableTwoFactor}>Deshabilitar</Button>}
          {verified && <Button className={classes.button} color="primary" variant="contained" onClick={handleRelinkTwoFactor}>Revincular</Button>}
        </ExpansionPanelActions>
      </ExpansionPanel>
    </>
  );
}

function getCodeArray(code) {
  return '123456'.split('').map((_, index) => (code && code[index]) || '');
}

function CodeInput(props) {
  const classes = useStyles();
  const { code } = props;
  const { onCompletitionChange, onCodeChange } = props;
  const [isComplete, setIsComplete] = React.useState(false);
  const [codeArray, setCodeArray] = React.useState(getCodeArray(code));
  const code0Ref = React.useRef(null);
  const code1Ref = React.useRef(null);
  const code2Ref = React.useRef(null);
  const code3Ref = React.useRef(null);
  const code4Ref = React.useRef(null);
  const code5Ref = React.useRef(null);
  const nextInputArray = [code1Ref, code2Ref, code3Ref, code4Ref, code5Ref];

  const handleFocus = event => event.target.select();

  const handleChange = (event) => {
    if (!Number.isNaN(+event.target.value)) {
      const newValue = event.target.value.substr(0, 1);
      codeArray[event.target.name] = newValue;
      setCodeArray([...codeArray]);
      const nextInput = nextInputArray[event.target.name];
      if (newValue && nextInput && nextInput.current) {
        nextInput.current.focus();
      }
    }
  };

  React.useEffect(() => {
    if (codeArray.every(val => val)) {
      if (!isComplete) {
        setIsComplete(true);
        onCompletitionChange(true);
      }
    } else if (isComplete) {
      setIsComplete(false);
      onCompletitionChange(false);
    }
    onCodeChange(codeArray.join(''));
  }, [codeArray, isComplete, onCodeChange, onCompletitionChange]);

  return (
    <>
      <Grid className={classes.code} container justify="center">
        <Grid item xs={1}>
          <TextField
            inputRef={code0Ref}
            className={classes.codeInput}
            inputProps={{ className: classes.codeInputInput }}
            onFocus={handleFocus}
            onClick={handleFocus}
            onChange={handleChange}
            type="text"
            name="0"
            value={codeArray[0]}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
            inputRef={code1Ref}
            className={classes.codeInput}
            inputProps={{ className: classes.codeInputInput }}
            onFocus={handleFocus}
            onClick={handleFocus}
            onChange={handleChange}
            type="text"
            name="1"
            value={codeArray[1]}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
            inputRef={code2Ref}
            className={classes.codeInput}
            inputProps={{ className: classes.codeInputInput }}
            onFocus={handleFocus}
            onClick={handleFocus}
            onChange={handleChange}
            type="text"
            name="2"
            value={codeArray[2]}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
            inputRef={code3Ref}
            className={classes.codeInput}
            inputProps={{ className: classes.codeInputInput }}
            onFocus={handleFocus}
            onClick={handleFocus}
            onChange={handleChange}
            type="text"
            name="3"
            value={codeArray[3]}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
            inputRef={code4Ref}
            className={classes.codeInput}
            inputProps={{ className: classes.codeInputInput }}
            onFocus={handleFocus}
            onClick={handleFocus}
            onChange={handleChange}
            type="text"
            name="4"
            value={codeArray[4]}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
            inputRef={code5Ref}
            className={classes.codeInput}
            inputProps={{ className: classes.codeInputInput }}
            onFocus={handleFocus}
            onClick={handleFocus}
            onChange={handleChange}
            type="text"
            name="5"
            value={codeArray[5]}
          />
        </Grid>
      </Grid>
    </>
  );
}
