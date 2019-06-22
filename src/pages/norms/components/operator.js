/* eslint-disable no-mixed-operators */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import ChipInput from 'material-ui-chip-input';
import { finders } from '../utils';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  chipContainer: {
    margin: theme.spacing(1),
    paddingTop: '18px',
  },
}));

export default function Operator(props) {
  const classes = useStyles();
  const { onChange } = props;
  const { metadata } = props;
  const { predicates } = props;
  const { operators, operatorsByType } = predicates;
  const { type } = props;
  const operator = finders.findOperator(predicates, metadata);
  const filteredOperators = operators.filter(_operator => operatorsByType[type] && operatorsByType[type].find(operatorByType => _operator.operator === operatorByType.operator));

  function handleOperatorChange(event) {
    onChange({ operator: event.target.value.operator });
  }

  function handleOnValueChange(newValue) {
    onChange({ operator: operator.operator, ...newValue });
  }

  return (
    <span>
      <FormControl variant="outlined" className={classes.formControl} disabled={!metadata.attribute}>
        <InputLabel htmlFor="operator">
          Operator
        </InputLabel>
        <Select
          value={operator}
          onChange={handleOperatorChange}
          input={<OutlinedInput labelWidth={63} name="operator" id="operator" />}
        >
          {filteredOperators.map(_operator => <MenuItem key={_operator.operator} value={_operator}>{_operator.symbol}</MenuItem>)}
        </Select>
      </FormControl>
      {operator && operator.type === 'binary' && <OperatorValue metadata={metadata} onChange={handleOnValueChange} type={type} operator={operator} />}
    </span>
  );
}

function OperatorValue(props) {
  const classes = useStyles();
  const { onChange } = props;
  const { metadata } = props;
  const { operator } = props;
  const { argumentName } = operator;
  const { argumentType } = operator;
  const arrayValue = metadata[argumentName] || [];
  const { type } = props;
  const stringValue = metadata[argumentName] || '';
  const numberValue = metadata[argumentName] || '';
  // eslint-disable-next-line no-nested-ternary
  const booleanValue = metadata[argumentName] === true ? 1 : metadata[argumentName] === false ? 0 : '';

  function handleStringChange(event) {
    onChange({ [argumentName]: event.target.value });
  }

  function handleNumberChange(event) {
    onChange({ [argumentName]: +event.target.value });
  }

  function handleBooleanChange(event) {
    onChange({ [argumentName]: !!event.target.value });
  }

  function handleAddChip(chip) {
    onChange({ [argumentName]: [...arrayValue, type === 'number' ? +chip : chip] });
  }

  function handleDeleteChip(chip, index) {
    onChange({ [argumentName]: arrayValue.filter((_, _index) => _index !== index) });
  }

  if (argumentType === 'single') {
    return (
      <span>
        {(type === 'string' || type === 'code') && (
          <TextField
            id="expectedValue"
            label="Valor"
            className={classes.formControl}
            value={stringValue}
            onChange={handleStringChange}
            variant="outlined"
          />
        )}
        {type === 'number' && (
          <TextField
            id="expectedValue"
            label="Valor"
            className={classes.formControl}
            value={numberValue}
            onChange={handleNumberChange}
            variant="outlined"
            type="number"
          />
        )}
        {type === 'boolean' && (
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="value">
              Valor
            </InputLabel>
            <Select
              value={booleanValue}
              onChange={handleBooleanChange}
              input={<OutlinedInput labelWidth={63} name="value" id="value" />}
            >
              <MenuItem value={1}>True</MenuItem>
              <MenuItem value={0}>False</MenuItem>
            </Select>
          </FormControl>
        )}
      </span>
    );
  }
  return (
    <span>
      {type === 'string' && (
        <ChipInput
          className={classes.formControl}
          value={arrayValue}
          onAdd={chip => handleAddChip(chip)}
          onDelete={(chip, index) => handleDeleteChip(chip, index)}
          variant="outlined"
          itemType="text"
          label="Valor"
        />
      )}
      {type === 'number' && (
        <ChipInput
          className={classes.formControl}
          value={arrayValue}
          onAdd={chip => handleAddChip(chip)}
          onDelete={(chip, index) => handleDeleteChip(chip, index)}
          variant="outlined"
          InputProps={{ type: 'number' }}
          label="Valor"
        />
      )}
    </span>
  );
}
