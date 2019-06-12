import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';

import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import './FiltersSection.css';

const FiltersSection = (props) => {
  const [selectedStates, setSelectedStates] = useState([]);
  const { filters } = props;
  const {
    status, institution, id, issueDateRange, receivedDateRange,
  } = filters;
  const selectStatusFilter = (valueStatus) => {
    props.onSelectFilter({ property: 'status', id: valueStatus });
    setSelectedStates(valueStatus);
  };
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: '0.5em',
        }}
      >
        {id && (
          <div style={{ marginRight: '12px' }}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <Search />
              </Grid>
              <Grid item>
                <TextField id="input-with-icon-grid" label="Receta ID" />
              </Grid>
            </Grid>
          </div>
        )}
        {status && (
          <MultipleDropdown
            selectedValues={selectedStates}
            values={status.values}
            onSelect={selectStatusFilter}
            label="Estados"
            className="status-dropdown"
          />
        )}

        {institution && (
          <MultipleDropdown
            selectedValues={selectedStates}
            values={institution.values}
            onSelect={values => setSelectedStates(values)}
            label="Instituciones"
          />
        )}
      </div>
      <div className="range-filter-container">
        {issueDateRange && (
          <div>
            <div style={{ marginBottom: '0.5em' }}>Fecha de emision :</div>
            <div>
              <DateRangePickerWrapper />
            </div>
          </div>
        )}

        {receivedDateRange && (
          <div>
            <div style={{ marginBottom: '0.5em' }}>Fecha de recepcion :</div>
            <div>
              <DateRangePickerWrapper />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DateRangePickerWrapper = () => {
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <DateRangePicker
      startDateId="startDate"
      endDateId="endDate"
      startDate={dates.startDate} // momentPropTypes.momentObj or null,
      endDate={dates.endDate}
      onDatesChange={({ startDate, endDate }) => setDates({ startDate, endDate })} // PropTypes.func.isRequired,
      onFocusChange={value => setFocusedInput(value)} // PropTypes.func.isRequired,
      focusedInput={focusedInput}
    />
  );
};
const MultipleDropdown = (props) => {
  const {
    values, onSelect, selectedValues, label, className,
  } = props;
  return (
    <FormControl className={className}>
      <InputLabel htmlFor="select-multiple-chip">{label}</InputLabel>
      <Select
        multiple
        value={selectedValues}
        onChange={(event) => {
          onSelect(event.target.value);
        }}
        inputProps={{
          name: 'age',
          id: 'select-multiple-chip',
        }}
        style={{ minWidth: '120px' }}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div>
            {selected.map(value => (
              <Chip key={value} label={value} />
            ))}
          </div>
        )}
      >
        {values.map(state => (
          <MenuItem key={state.id} value={state.id}>
            {state.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default FiltersSection;
