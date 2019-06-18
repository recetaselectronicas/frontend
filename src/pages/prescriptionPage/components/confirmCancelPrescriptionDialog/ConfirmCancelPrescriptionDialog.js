import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '../../../../components/dialog/dialogTitle/DialogTitle';
import DialogContent from '../../../../components/dialog/dialogContent/DialogContent';
import DialogActions from '../../../../components/dialog/dialogActions/DialogActions';

const ConfirmCancelPrescriptionDialog = (props) => {
  const [reasonInput, setReasonInput] = React.useState('');

  const onChangeReasonInput = async (event) => {
    const { value } = event.target;
    setReasonInput(value);
  };
  const onCancelPrescription = () => {
    props.onConfirm(reasonInput);
    props.handleClose();
  };
  const { handleClose, open } = props;
  const classes = {};

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          ¿ Esta seguro que quiere cancelar la receta ?
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item>
              <div className={classes.root}>
                <div className={classes.container}>
                  <TextField label="Motivo" value={reasonInput} onChange={onChangeReasonInput} />
                </div>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" disabled={reasonInput.length === 0} onClick={onCancelPrescription}>
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

export default ConfirmCancelPrescriptionDialog;
