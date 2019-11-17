import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '../dialog/dialogTitle/DialogTitle';
import DialogContent from '../dialog/dialogContent/DialogContent';
import DialogActions from '../dialog/dialogActions/DialogActions';

const ReasonDialog = (props) => {
  const [reasonInput, setReasonInput] = useState('');

  const onChangeReasonInput = async (event) => {
    const { value } = event.target;
    setReasonInput(value);
  };
  const onAccept = () => {
    props.onConfirm(reasonInput);
    props.handleClose();
  };
  const { handleClose, open, title = '¿ Esta seguro que quiere cancelar la receta ?' } = props;
  const classes = {};

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item>
              <div className={classes.root}>
                <div className={classes.container}>
                  <TextField
                    label="Motivo"
                    value={reasonInput}
                    onChange={onChangeReasonInput}
                    autoComplete="off"
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" disabled={reasonInput.length === 0} onClick={onAccept}>
            Aceptar
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReasonDialog;
