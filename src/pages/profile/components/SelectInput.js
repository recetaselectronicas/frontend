import React from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@material-ui/core';

const getItems = values => values.map(option => (
  <MenuItem key={option.id} value={option.id}>
    {option.description}
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
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    error: PropTypes.string,
    availableValues: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      description: PropTypes.string.isRequired,
    })),
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
