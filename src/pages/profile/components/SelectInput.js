import React from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@material-ui/core';

const getItems = values => values.map(option => (
  <MenuItem key={option} value={option}>
    {option}
  </MenuItem>
));

export default function SelectInput(props) {
  const { field, disabled, onChange } = props;

  return (
    <TextField
      select
      fullWidth
      name={field.fieldName}
      value={field.value}
      autoComplete="off"
      label={field.label}
      error={!!field.error}
      helperText={field.error}
      disabled={disabled}
      onChange={onChange}
    >
      {getItems(field.availableValues)}
    </TextField>
  );
}

SelectInput.propTypes = {
  field: PropTypes.shape({
    fieldName: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    availableValues: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
