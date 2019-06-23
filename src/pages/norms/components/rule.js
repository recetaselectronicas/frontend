import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  Dialog, Button, DialogTitle, DialogContent, DialogActions, Typography,
} from '@material-ui/core';
import Predicate from './predicate';
import { usePredicates } from '../hooks';
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
  description: {
    minWidth: '500px',
    margin: theme.spacing(2),
  },
  errorMessage: {
    minWidth: '500px',
    margin: theme.spacing(2),
  },
  rule: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

export default function Rule(props) {
  const classes = useStyles();
  const { debug } = props;
  const { updatable } = props;
  const { rule } = props;
  const { title } = props;
  const { onSave, onCancel } = props;
  const [description, setDescription] = React.useState(rule.description);
  const [errorMessage, setErrorMessage] = React.useState(rule.errorMessage);
  const [predicate, setPredicate] = React.useState(rule.predicate || getNewCriteria());
  const predicates = usePredicates();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setDescription(rule.description);
    setErrorMessage(rule.errorMessage);
    setPredicate(rule.predicate);
  }, [rule]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
    onCancel();
  }

  function handleSave() {
    // validar la regla
    setOpen(false);
    onSave({
      ...rule, description, errorMessage, predicate,
    });
  }

  function handleOnChange(newMetadata) {
    setPredicate(newMetadata);
  }

  function handleOnDelete() {
    setPredicate(getNewCriteria());
  }

  function handleTextChange(event) {
    setPredicate(JSON.parse(event.target.value));
  }

  function onSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className={classes.rule}>
      <Button onClick={handleClickOpen} fullWidth style={{ justifyContent: 'left' }}>{description || '<Agregar Descripción>'}</Button>
      <Dialog open={open} onClose={handleClose} scroll="paper" fullWidth maxWidth="lg" disableBackdropClick>
        <DialogTitle disableTypography id="rule-dialog-title">
          <Typography variant="h5">{title}</Typography>
          <div>
            <TextField autoComplete="off" disabled={!updatable} id="description" label="Descripcion" value={description} onChange={event => setDescription(event.target.value)} className={classes.description} />
            <TextField autoComplete="off" disabled={!updatable} id="errorMessage" label="Mensaje de Error" value={errorMessage} onChange={event => setErrorMessage(event.target.value)} className={classes.errorMessage} />
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <form className={classes.root} autoComplete="off" onSubmit={onSubmit}>
              <Predicate predicates={predicates} metadata={predicate} onChange={handleOnChange} onDelete={handleOnDelete} updatable={updatable} />
            </form>
            <br />
            {debug && (
              <TextField
                id="metadata"
                label="METADATA"
                multiline
                rowsMax="50"
                value={JSON.stringify(predicate, null, 4)}
                onChange={handleTextChange}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary" disabled={!updatable}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
