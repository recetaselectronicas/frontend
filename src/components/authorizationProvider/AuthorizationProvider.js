import React, { useState } from 'react';
import { Dialog, DialogContentText, Grid, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '../dialog/dialogActions/DialogActions';
import DialogContent from '../dialog/dialogContent/DialogContent';
import DialogTitle from '../dialog/dialogTitle/DialogTitle';
import { askForAuthorization, isAuthorizationDataComplete, authenticationTypes, userTypes, authorizationTypes } from './AuthorizationUtils';

const descriptionMap = {
  [authenticationTypes.userAndPass]: 'Ingrese usuario y contraseña',
  [authenticationTypes.twoFactor]: 'Ingrese a el código de autenticación en dos pasos',
};

const userTypeMap = {
  [userTypes.affiliate]: 'Afiliado',
  [userTypes.doctor]: 'Médico',
  [userTypes.pharmacist]: 'Farmacéutico',
};

export default function AuthorizationProvider(props) {
  const { authorizationType, authenticationType, userType, onConfirm, onCancel, data } = props;
  const [authenticationData, setAuthenticationData] = useState({ type: authenticationType, username: '', password: '', code: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '', code: '' });

  const askAuthorization = () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const authorization = await askForAuthorization(authenticationData, authorizationType, data);
        console.log('authorization given ', authorization)
        setIsLoading(false);
        onConfirm(authorization);
      } catch (e) {
        setErrors({ username: 'Usuario inválido', password: 'Contraseña inválida', code: 'Código inválido' });
        setIsLoading(false);
      }
    }, 500);
  };

  const updateField = (event) => {
    const field = event.target.name;
    setAuthenticationData({ ...authenticationData, [field]: event.target.value });
    setErrors({ ...errors, [field]: '' });
  };

  const isDataComplete = () => isAuthorizationDataComplete(authenticationData);

  return (
    <>
      <Dialog open>
        <DialogTitle>
          {`Se requiere autenticación del ${userTypeMap[userType]}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {descriptionMap[authenticationType]}
          </DialogContentText>
          {authenticationType === authenticationTypes.userAndPass && (
            <Grid container>
              <Grid item xs={12}>
                <TextField name="username" helperText={errors.username} error={!!errors.username} fullWidth label="Usuario" onChange={updateField} value={authenticationData.username} />
              </Grid>
              <Grid item xs={12}>
                <TextField name="password" helperText={errors.password} error={!!errors.password} margin="normal" fullWidth label="Contraseña" type="password" autoComplete="new-password" onChange={updateField} value={authenticationData.password} />
              </Grid>
            </Grid>
          )}
          {authenticationType === authenticationTypes.twoFactor && (
            <Grid container>
              <Grid item xs={12}>
                <TextField name="code" helperText={errors.code} error={!!errors.code} fullWidth label="Código" autoComplete="one-time-code" onChange={updateField} value={authenticationData.code} />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="secondary" disabled={isLoading} variant="contained">Cancelar</Button>
          <Button onClick={askAuthorization} disabled={!isDataComplete() || isLoading} color="primary" variant="contained" style={{ minWidth: '120px' }}>
            {!isLoading && 'Autenticar'}
            {isLoading && (<CircularProgress size={24} />)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

AuthorizationProvider.defaultProps = {
  data: {},
};

AuthorizationProvider.propTypes = {
  authorizationType: PropTypes.oneOf([authorizationTypes.receive, authorizationTypes.authorizeReceive, authorizationTypes.issue, authorizationTypes.authorizeIssue]).isRequired,
  authenticationType: PropTypes.oneOf([authenticationTypes.twoFactor, authenticationTypes.userAndPass]).isRequired,
  userType: PropTypes.oneOf([userTypes.affiliate, userTypes.doctor, userTypes.pharmacist]).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  data: PropTypes.shape({}),
};
