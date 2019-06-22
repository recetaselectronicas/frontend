import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Conector from './conector';
import Criteria from './criteria';
import { getConectorFromModel } from '../utils';

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
  predicate: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    margin: theme.spacing(1),
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  addConector: {
    margin: theme.spacing(1),
    minWidth: '60px',
  },
}));

export default function Predicate(props) {
  const classes = useStyles();
  const { predicates } = props;
  const { metadata } = props;
  const { onChange } = props;
  const { onDelete } = props;
  const { type } = metadata;
  const { conectors } = predicates;

  function handleOnChange(newMetadata) {
    onChange(newMetadata);
  }

  function handleOnDelete() {
    onDelete();
  }

  function hanldeAddConector(event) {
    onChange(getConectorFromModel(event.target.value, metadata));
  }

  if (predicates) {
    return (
      <span className={classes.predicate}>
        {type === 'CRITERIA' && <Criteria predicates={predicates} metadata={metadata} onChange={handleOnChange} onDelete={handleOnDelete} />}
        {type === 'CONECTOR' && <Conector predicates={predicates} metadata={metadata} onChange={handleOnChange} />}
        <FormControl variant="outlined" className={classes.addConector}>
          <Select
            renderValue={value => <span>{value}</span>}
            value="+"
            onChange={hanldeAddConector}
            displayEmpty
            input={<OutlinedInput name="value" id="value" />}
          >
            {conectors.map(conector => <MenuItem key={conector.conector} value={conector}>{conector.value}</MenuItem>)}
          </Select>
        </FormControl>
      </span>
    );
  }
  return (<span />);
}

// function OperatorsList(props) {
//   const node = React.useRef();

//   function handleClick(e) {
//     if (node.current.contains(e.target)) {
//       // inside click
//       return;
//     }
//     // outside click
//   }

//   React.useEffect(() => {
//     // add when mounted
//     document.addEventListener('mousedown', handleClick);
//     // return function to be called when unmounted
//     return () => {
//       document.removeEventListener('mousedown', handleClick);
//     };
//   }, []);

//   return (
//     <div ref={node}>
//     </div>
//   );
// }
