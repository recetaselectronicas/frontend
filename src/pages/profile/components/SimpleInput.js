import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

export default function SimpleInput(props) {
  const { field, disabled, onChange, inputProps } = props;

  return (
    <TextField
      fullWidth
      name={field.fieldName}
      value={field.value}
      autoComplete="off"
      label={field.label}
      error={!!field.error}
      helperText={field.error}
      disabled={disabled}
      onChange={onChange}
      InputProps={inputProps && inputProps}
    />
  );
}

SimpleInput.defaultProps = {
  inputProps: null,
};

SimpleInput.propTypes = {
  field: PropTypes.shape({
    fieldName: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
  }).isRequired,
  inputProps: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
