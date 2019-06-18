import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '../../../../components/dialog/dialogTitle/DialogTitle';
import DialogContent from '../../../../components/dialog/dialogContent/DialogContent';
import DialogActions from '../../../../components/dialog/dialogActions/DialogActions';

const ConfirmCancelPrescriptionDialog = (props) => {
  const [troquelInput, setTroquelInput] = React.useState('');
  const [quantityInput, setQuantityInput] = React.useState('');

  const onChangeTroquelInput = async (event) => {
    const { value } = event.target;
    setTroquelInput(value);
  };
  const onChangeQuantityInput = async (event) => {
    const { value } = event.target;
    setQuantityInput(value);
  };
  const onConfirm = () => {
    props.onConfirm({ id: props.id, troquel: troquelInput, quantity: quantityInput });
    setTroquelInput('');
    setQuantityInput('');
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
                  <TextField label="Troquel" type="number" value={troquelInput} onChange={onChangeTroquelInput} />
                  <TextField label="Cantidad" type="number" value={quantityInput} onChange={onChangeQuantityInput} />
                </div>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onConfirm}>
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
