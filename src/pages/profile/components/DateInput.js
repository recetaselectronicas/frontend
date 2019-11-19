import React from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


export default function DateInput(props) {
  const { field, disabled, onChange } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        fullWidth
        name={field.fieldName}
        value={field.value}
        helperText={field.error}
        error={!!field.error}
        format="dd/MM/yyyy"
        label={field.label}
        autoComplete="off"
        disabled={disabled}
        onChange={onChange}
      />
    </MuiPickersUtilsProvider>
  );
}

DateInput.propTypes = {
  field: PropTypes.shape({
    fieldName: PropTypes.string,
    value: PropTypes.instanceOf(Date),
    label: PropTypes.string,
    error: PropTypes.string,
    availableValues: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
