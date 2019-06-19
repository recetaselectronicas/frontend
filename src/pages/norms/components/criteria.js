import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Operator from './operator';

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
}));

export default function Criteria(props) {
  const classes = useStyles();
  const { predicates } = props;
  const { metadata } = props;
  const { onChange } = props;
  const { finders } = props;
  const { criterias: entities } = predicates;
  const entity = finders.findCriteria(predicates, metadata);
  const attribute = finders.findAttribute(entity, metadata);

  function handleEntityChange(event) {
    onChange({
      type: metadata.type, entity: event.target.value.entity, attribute: '', operator: '',
    });
  }

  function handleAttributeChange(event) {
    onChange({
      type: metadata.type, entity: entity.entity, attribute: event.target.value.attribute, operator: '',
    });
  }

  function handleOperatorChange(operatorMetadata) {
    onChange({
      type: metadata.type, entity: entity.entity, attribute: attribute.attribute, ...operatorMetadata,
    });
  }

  return (
    <span>
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
      <Operator predicates={predicates} onChange={handleOperatorChange} metadata={{ ...metadata }} type={attribute.type} finders={finders} />
    </span>
  );
}
