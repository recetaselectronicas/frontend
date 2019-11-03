import React, { useState } from 'react';
import SnackbarWrapper from './snackbarWrapper/SnackbarWrapper';

const snackbarInitialState = { open: false, variant: 'error', message: '' };
const variants = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
};

export default function withSnackbar(Component) {
  return function (props) {
    const [snackbar, setSnackbar] = useState(snackbarInitialState);

    const handleCloseSnackbar = () => {
      setSnackbar({ ...snackbar, open: false });
    };

    const show = (message, variant) => {
      setSnackbar({ ...snackbar, open: true, message, variant });
    };

    const showSuccess = (message) => {
      show(message, variants.success);
    };

    const showInfo = (message) => {
      show(message, variants.info);
    };

    const showWarning = (message) => {
      show(message, variants.warning);
    };

    const showError = (message) => {
      show(message, variants.error);
    };

    return (
      <>
        <Component {...props} showSuccess={showSuccess} showInfo={showInfo} showWarning={showWarning} showError={showError} />
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
  };
}
