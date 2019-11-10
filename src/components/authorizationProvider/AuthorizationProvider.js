import React, { useState } from 'react';
import { Dialog, Grid, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/core/SvgIcon/SvgIcon';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import DialogActions from '../dialog/dialogActions/DialogActions';
import DialogContent from '../dialog/dialogContent/DialogContent';
import DialogTitle from '../dialog/dialogTitle/DialogTitle';
import { askForAuthorization, authenticationTypes, userTypes, authorizationTypes } from './AuthorizationUtils';

const titleMap = {
  [authenticationTypes.userAndPass]: 'Ingrese usuario y contraseña',
  [authenticationTypes.twoFactor]: 'Ingrese autenticación en dos pasos',
};

export default function AuthorizationProvider(props) {
  const { authorizationType, authenticationType, userType, onConfirm, onCancel, data } = props;
  const [authenticationData, setAuthenticationData] = useState({ type: authenticationType, username: '', password: '', code: '' });

  const askAuthorization = () => {
    askForAuthorization(authenticationData, authorizationType, data);
  };

  return (
    <>
      <Dialog open>
        <DialogTitle>
          {titleMap[authenticationType]}
          <IconButton style={{ float: 'right', top: '-10px' }} onClick={onCancel}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <TextField margin="normal" fullWidth label="Usuario" onChange={event => setAuthenticationData({ ...authenticationData, username: event.target.value })} value={authenticationData.username} />
            </Grid>
            <Grid item xs={12}>
              <TextField margin="normal" fullWidth label="Contraseña" type="password" autoComplete="new-password" onChange={event => setAuthenticationData({ ...authenticationData, password: event.target.value })} value={authenticationData.password} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="secondary">Cancelar</Button>
          <Button onClick={askAuthorization} color="primary">Autenticar</Button>
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
