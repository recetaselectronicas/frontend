import React from 'react';
import { Dialog } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/core/SvgIcon/SvgIcon';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import DialogActions from '../dialog/dialogActions/DialogActions';
import DialogContent from '../dialog/dialogContent/DialogContent';
import DialogTitle from '../dialog/dialogTitle/DialogTitle';

const userTypes = {
  affiliate: 'affiliate',
  doctor: 'doctor',
  pharmacist: 'pharmacist',
};

const authenticationTypes = {
  userAndPass: 'userAndPass',
  twoFactor: 'twoFactor',
};

const authorizationTypes = {
  receive: 'receive',
  authorizeReceive: 'authorizeReceive',
  issue: 'issue',
  authorizeIssue: 'authorizeIssue',
};

export default function AuthorizationProvider(props) {
  const { authorizationType, authenticationType, userType, onConfirm, onCancel, data } = props;

  return (
    <>
      <Dialog open>
        <DialogTitle>
          <IconButton style={{ float: 'right', top: '-10px' }} onClick={onCancel}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {authenticationType === authenticationTypes.userAndPass && (

          <DialogContentText>Si creés que la foto es clara, confirmala!</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="secondary">Cancelar</Button>
          <Button onClick={onConfirm} color="primary">Autenticar</Button>
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
