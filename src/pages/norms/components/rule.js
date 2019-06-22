import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Predicate from './predicate';
import usePredicates from '../hooks';
import { getNewCriteria } from '../utils';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Rule(props) {
  const classes = useStyles();
  const { debug } = props;
  const predicates = usePredicates();
  const [metadata, setMetadata] = React.useState(getNewCriteria());

  function handleOnChange(newMetadata) {
    setMetadata(newMetadata);
  }

  function handleOnDelete() {
    setMetadata(getNewCriteria());
  }

  function handleTextChange(event) {
    setMetadata(JSON.parse(event.target.value));
  }

  function onSubmit(event) {
    event.preventDefault();
  }

  return (
    <div>
      <form className={classes.root} autoComplete="off" onSubmit={onSubmit}>
        <Predicate predicates={predicates} metadata={metadata} onChange={handleOnChange} onDelete={handleOnDelete} />
      </form>
      <br />
      {debug && (
        <TextField
          id="metadata"
          label="METADATA"
          multiline
          rowsMax="50"
          value={JSON.stringify(metadata, null, 4)}
          onChange={handleTextChange}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          fullWidth
        />
      )}
    </div>
  );
}
