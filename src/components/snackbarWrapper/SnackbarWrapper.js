import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from '../snackbarContent/SnackbarContent';

const SnackbarWrapper = (props) => {
  const {
    horizontal, vertical, onClose, variant, message, open,
  } = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical,
        horizontal,
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <SnackbarContentWrapper onClose={onClose} variant={variant} message={message} />
    </Snackbar>
  );
};

export default SnackbarWrapper;
