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
import moment from 'moment';

const FiltersSection = (props) => {
  const [idPrescription, setIdPrescription] = useState('');
  const { filters, selectedFilters } = props;
  const {
    status, institution, id, issueDateRange,
  } = filters;
  const statusSelectedFilters = selectedFilters
    .filter(selectedFilter => selectedFilter.property === 'status')
    .map(sf => sf.value);

  const institutionSelectedFilters = selectedFilters
    .filter(selectedFilter => selectedFilter.property === 'institution')
    .map(sf => sf.value);

  const selectStatusFilter = (valuesStatus) => {
    const [valueToSend] = valuesStatus.filter(valueStatus => !statusSelectedFilters.includes(valueStatus.id));
    props.onSelectFilter({ property: 'status', value: valueToSend.id, label: valueToSend.value });
  };
  const selectInstitutionFilter = (valuesStatus) => {
    const [valueToSend] = valuesStatus.filter(valueStatus => !institutionSelectedFilters.includes(valueStatus));
    props.onSelectFilter({ property: 'institution', value: valueToSend.id, label: valueToSend.value });
  };
  // TODO: que pasa cuando me clickean para deseleccionar
  const onChangeTexfieldPrescriptionId = (event) => {
    const { value } = event.target;
    setIdPrescription(value);
  };
  const searchById = (event) => {
    event.preventDefault();
    props.onSelectFilter({ property: 'id', value: idPrescription, label: `id: ${idPrescription}` });
    setIdPrescription('');
  };
  const onSelectRange = ({ startDate, endDate }) => {
    if (startDate && endDate) {
      const formatedStart = moment(startDate).format('DD/MM/YYYY HH:mm');
      const formattedFinish = moment(endDate).format('DD/MM/YYYY HH:mm');
      props.onSelectDateFilter([
        {
          property: 'fromIssueDate', value: formatedStart, label: `fecha emision desde: ${formatedStart}`, dontShow: true,
        },
        {
          property: 'toIssueDate', value: formattedFinish, label: `fecha emision hasta: ${formattedFinish}`, dontShow: true,
        },
      ]);
    }
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
                <form onSubmit={searchById}>
                  <TextField
                    id="input-with-icon-grid"
                    label="Receta ID"
                    autoComplete="off"
                    onChange={onChangeTexfieldPrescriptionId}
                    value={idPrescription}
                  />
                </form>
              </Grid>
            </Grid>
          </div>
        )}
        {status && (
          <MultipleDropdown
            selectedValues={statusSelectedFilters}
            values={status.values}
            onSelect={selectStatusFilter}
            label="Estados"
            className="status-dropdown"
          />
        )}

        {institution && (
          <MultipleDropdown
            selectedValues={institutionSelectedFilters}
            values={institution.values}
            onSelect={selectInstitutionFilter}
            label="Instituciones"
            className="institution-dropdown"
          />
        )}
      </div>
      <div className="range-filter-container">
        {issueDateRange && (
          <div>
            <div style={{ marginBottom: '0.5em' }}>Fecha de emision :</div>
            <div>
              <DateRangePickerWrapper onSelectRange={onSelectRange} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DateRangePickerWrapper = (props) => {
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
      onDatesChange={({ startDate, endDate }) => {
        console.log('..', { startDate, endDate });
        setDates({ startDate, endDate });
        props.onSelectRange({ startDate, endDate });
      }} // PropTypes.func.isRequired,
      onFocusChange={value => setFocusedInput(value)} // PropTypes.func.isRequired,
      focusedInput={focusedInput}
      isOutsideRange={() => false}

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
          const inputValues = event.target.value;
          const newValue = inputValues
            .map(inputValue => !selectedValues.includes(inputValue) && values.find(value => value.id === inputValue))
            .filter(Boolean);
          if (newValue && newValue.length > 0) {
            onSelect(newValue);
          }
        }}
        inputProps={{
          name: 'age',
          id: 'select-multiple-chip',
        }}
        style={{ minWidth: '120px' }}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div>
            {selected.map(id => (
              <Chip key={id} label={values.find(value => value.id === id).value} />
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
