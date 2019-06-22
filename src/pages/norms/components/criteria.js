import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { TextField } from '@material-ui/core';
import Operator from './operator';
import { finders, getResultingCriteria } from '../utils';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  criteria: {
    // margin: theme.spacing(1),
  },
  deleteCriteria: {
    height: '20px',
    width: '20px',
    marginTop: '4px',
    marginRight: '4px',
  },
  quantity: {
    margin: theme.spacing(1),
    width: '110px',
  },
}));

export default function Criteria(props) {
  const classes = useStyles();
  const { predicates } = props;
  const { metadata } = props;
  const { onChange } = props;
  const { onDelete } = props;
  const { criterias: entities } = predicates;
  const entity = finders.findCriteria(predicates, metadata);
  const attribute = finders.findAttribute(entity, metadata);
  const { quantificable } = entity;

  function handleEntityChange(event) {
    // onChange({
    //   type: metadata.type, entity: event.target.value.entity, attribute: '', operator: '',
    // });
    onChange(getResultingCriteria(metadata, { ...metadata, entity: event.target.value.entity }));
  }

  function handleAttributeChange(event) {
    // onChange({
    //   type: metadata.type, entity: entity.entity, attribute: event.target.value.attribute, operator: '',
    // });
    onChange(getResultingCriteria(metadata, { ...metadata, attribute: event.target.value.attribute }));
  }

  function handleOperatorChange(operatorMetadata) {
    // onChange({
    //   type: metadata.type, entity: entity.entity, attribute: attribute.attribute, ...operatorMetadata,
    // });
    onChange(getResultingCriteria(metadata, { ...metadata, ...operatorMetadata }));
  }

  function handleQuantifierChange(quantifierMetadata) {
    // onChange({ ...metadata, ...newMetadata });
    console.log({ metadata }, { quantifierMetadata });
    onChange(getResultingCriteria(metadata, { ...metadata, ...quantifierMetadata }));
  }

  function handleDeleteClick() {
    onDelete();
  }

  return (
    <Paper className={classes.criteria}>
      {quantificable && <Quantifier onChange={handleQuantifierChange} predicates={predicates} metadata={metadata} />}
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="entity">
          Entidad
        </InputLabel>
        <Select
          value={entity}
          onChange={handleEntityChange}
          input={<OutlinedInput labelWidth={55} name="entity" id="entity" />}
        >
          {entities.map(_entity => <MenuItem key={_entity.entity} value={_entity}>{_entity.value}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl} disabled={!entity}>
        <InputLabel htmlFor="attribute">
          Atributos
        </InputLabel>
        <Select
          value={attribute}
          onChange={handleAttributeChange}
          input={<OutlinedInput labelWidth={66} name="attribute" id="attribute" />}
        >
          {entity && entity.attributes.map(_attribute => <MenuItem key={_attribute.attribute} value={_attribute}>{_attribute.value}</MenuItem>)}
        </Select>
      </FormControl>
      <Operator predicates={predicates} onChange={handleOperatorChange} metadata={{ ...metadata }} type={attribute.type} />
      <Chip className={classes.deleteCriteria} size="small" variant="outlined" clickable label="-" onClick={handleDeleteClick} />
    </Paper>
  );
}


function Quantifier(props) {
  const classes = useStyles();
  const { metadata } = props;
  const { predicates } = props;
  const { onChange } = props;
  const { quantifiers } = predicates;
  const quantifier = finders.findQuantifier(predicates, metadata);
  const { quantity } = metadata;

  function handleQuantifierChange(event) {
    onChange({ quantifier: event.target.value.quantifier });
  }

  function handleQuantityChange(event) {
    onChange({ quantifier: quantifier.quantifier, quantity: +event.target.value });
  }

  return (
    <span>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="quantifier">
          Cuantificador
        </InputLabel>
        <Select
          value={quantifier}
          onChange={handleQuantifierChange}
          input={<OutlinedInput labelWidth={95} name="entity" id="entity" />}
        >
          {quantifiers.map(_quantifier => <MenuItem key={_quantifier.quantifier} value={_quantifier}>{_quantifier.symbol}</MenuItem>)}
        </Select>
      </FormControl>
      {quantifier && quantifier.type === 'binary'
        && (
        <TextField
          id="quantity"
          label="Cantidad"
          className={classes.quantity}
          value={quantity || ''}
          onChange={handleQuantityChange}
          variant="outlined"
          type="number"
        />
        )}
    </span>
  );
}
