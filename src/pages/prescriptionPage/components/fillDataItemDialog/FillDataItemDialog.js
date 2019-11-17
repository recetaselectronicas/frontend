import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '../../../../components/dialog/dialogTitle/DialogTitle';
import DialogContent from '../../../../components/dialog/dialogContent/DialogContent';
import DialogActions from '../../../../components/dialog/dialogActions/DialogActions';
import MedicineService from '../../../../services/MedicineService';

const initialStateTroquelInput = {
  value: '',
  error: false,
  errorMessage: '',
};
const ConfirmCancelPrescriptionDialog = (props) => {
  const [troquelInput, setTroquelInput] = React.useState(initialStateTroquelInput);
  const [quantityInput, setQuantityInput] = React.useState(0);

  const onChangeTroquelInput = async (event) => {
    const { value } = event.target;
    setTroquelInput({ ...troquelInput, value });
  };
  const onChangeQuantityInput = async (event) => {
    const { value } = event.target;
    setQuantityInput(Number.parseInt(value, 10));
  };
  const onConfirm = async () => {
    try {
      const medicine = await MedicineService.getByTroquel(troquelInput.value);
      props.onConfirm({
        id: props.id, troquel: troquelInput.value, medicine, quantity: quantityInput,
      });
      setTroquelInput(initialStateTroquelInput);
      setQuantityInput('');
    } catch ({ message }) {
      setTroquelInput({ ...troquelInput, errorMessage: message, error: true });
    }
  };
  const { handleClose, open } = props;
  const classes = {};

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Datos del item
          {' '}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item>
              <div className={classes.root}>
                <div className={classes.container}>
                  <TextField
                    label="Troquel"
                    value={troquelInput.value}
                    onChange={onChangeTroquelInput}
                    error={troquelInput.error}
                    helperText={troquelInput.errorMessage}
                    autoComplete="off"
                  />
                  <TextField
                    autoComplete="off"
                    label="Cantidad"
                    type="number"
                    value={quantityInput || ''}
                    onChange={onChangeQuantityInput}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onConfirm} disabled={quantityInput <= 0 || troquelInput.value.length === 0}>
            Agregar
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
