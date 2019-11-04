import React, { useState } from 'react';
import lang from 'lodash/lang';
import SnackbarWrapper from '../snackbarWrapper/SnackbarWrapper';

const snackbarInitialState = { open: false, variant: 'error', message: '' };
const variants = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
};

export default function withSnackbar(Component) {
  return function WrappedComponent(props) {
    const [snackbar, setSnackbar] = useState(snackbarInitialState);
    const [actions, setActions] = useState({ closeAction: () => {} });

    const handleCloseSnackbar = () => {
      setSnackbar({ ...snackbar, open: false });
      if (lang.isFunction(actions.closeAction)) {
        actions.closeAction();
      }
    };

    const show = (message, variant, closeAction) => {
      setActions({ ...actions, closeAction });
      setSnackbar({ ...snackbar, open: true, message, variant });
    };

    const showSuccess = (message, closeAction) => {
      show(message, variants.success, closeAction);
    };

    const showInfo = (message, closeAction) => {
      show(message, variants.info, closeAction);
    };

    const showWarning = (message, closeAction) => {
      show(message, variants.warning, closeAction);
    };

    const showError = (message, closeAction) => {
      show(message, variants.error, closeAction);
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
