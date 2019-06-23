import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import propTypes from 'prop-types';
import _ from 'lodash';
import Suggestions from '../suggestions/Suggestions';
import DialogTitle from '../../../../components/dialog/dialogTitle/DialogTitle';
import DialogContent from '../../../../components/dialog/dialogContent/DialogContent';
import DialogActions from '../../../../components/dialog/dialogActions/DialogActions';
import MedicineService from '../../../../services/MedicineService';

const initialState = {
  medicine: {
    description: '',
  },
};
const AddItemDialog = (props) => {
  const [suggestionList, setSuggestionList] = React.useState([]);
  const [medicine, setMedicine] = React.useState(initialState.medicine);

  const [itemQuantity, setItemQuantity] = React.useState(0);
  const deboundedSearchMedicine = useCallback(
    _.debounce(async (name) => {
      if (name.length >= 3) {
        const data = await MedicineService.searchByName(name);
        setSuggestionList(data);
      }
    }, 300),
    [],
  );
  const onChangeItemInput = async (event) => {
    const { value } = event.target;
    setMedicine({ description: value });
    deboundedSearchMedicine(value);
  };
  const onSelectSuggestion = (suggestion) => {
    setSuggestionList([]);
    setMedicine(suggestion);
  };
  const addItem = () => {
    props.addItem({
      medicine,
      quantity: itemQuantity,
    });
    // clean the inputs and close the modal
    setItemQuantity(0);
    setMedicine(initialState.medicine);
    props.handleClose();
  };
  const { handleClose, open } = props;
  const classes = {};

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Agregar item
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item>
              <div className={classes.root}>
                <div className={classes.container}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="Medicamento"
                    className="add-item__item-texfield"
                    value={medicine.description}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={onChangeItemInput}
                  />
                  <div>
                    {suggestionList.length > 0 && (
                      <Paper className={classes.paper} square>
                        <Suggestions data={suggestionList} onSelectSuggestion={onSelectSuggestion} />
                      </Paper>
                    )}
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item>
              <TextField
                id="input-with-icon-textfield"
                label="Cantidad"
                className="add-item__quantity-texfield"
                value={itemQuantity}
                type="number"
                onChange={event => setItemQuantity(event.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            className="add-item__confirm-button"
            disabled={!medicine.id || itemQuantity === 0}
            onClick={addItem}
          >
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

AddItemDialog.propTypes = {
  addItem: propTypes.func.isRequired,
  handleClose: propTypes.func.isRequired,
  open: propTypes.bool.isRequired,
};

export default AddItemDialog;
