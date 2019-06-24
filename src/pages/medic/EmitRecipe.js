import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import _ from 'lodash';
import { Divider } from '@material-ui/core';
import Item from './components/item/Item';
import AddItemDialog from './components/addItemDialog/AddItemDialog';
import InstitutionService from '../../services/InstutionService';
import MedicalInsuranceService from '../../services/MedicalInsuranceService';
import AffiliateService from '../../services/AffilateService';
import PrescriptionService from '../../services/PrescriptionService';
import PrescriptionRequest from '../../requestBuilders/PrescriptionRequest';
import SnackbarWrapper from '../../components/snackbarWrapper/SnackbarWrapper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: '2em',
    paddingTop: '1em',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formControlObraSocial: {
    marginBottom: 8,
  },
  button: {
    marginRight: 12,
  },
  issuedErrors: {
    margin: theme.spacing(0),
    color: theme.palette.error.dark,
    textAlign: 'left',
  },
  errorsDivider: {
    margin: theme.spacing(1),
  },
}));

const initialState = {
  selectedAffilate: {
    code: '',
  },
};
const isUndefinedOrNull = value => value === undefined || value === null;
const snackbarInitialState = { open: false, variant: 'error', message: '' };

const EmitRecipe = (props) => {
  const classes = useStyles();

  const [addItemDialogOpen, setVisibiltyOfAddItemDialog] = useState(false);
  const [prolongedTreatment, setProlongedTreatment] = useState(false);
  const [items, setItems] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [medicalInsurances, setMedicalInsurances] = useState([]);
  const [selectedMedicalInsurance, setSelectedMedicalInsurance] = useState(null);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedAffilate, setSelectedAffilate] = useState(initialState.selectedAffilate);
  const [suggestionList, setSuggestionList] = useState([]);
  const [diagnostic, setDiagnostic] = useState(null);
  const [snackbar, setSnackbar] = useState(snackbarInitialState);
  // const [errorsStack, setErrorsStack] = useState([{ message: 'Debe indicar tratamiento prolongado' }, { message: 'Debe ingresar un diagnostico' }]);
  const [errorsStack, setErrorsStack] = useState([]);

  const debounderSearchAffiliate = useCallback(
    _.debounce(async (code, medicalInsurance) => {
      if (code.length >= 3) {
        const data = await AffiliateService.searchAffilateNumber(code, medicalInsurance);
        setSuggestionList(data);
      }
    }, 300),
    [],
  );

  // componentDidMount
  useEffect(() => {
    InstitutionService.getAll()
      .then((data) => {
        setInstitutions(data);
      })
      .catch((e) => {
        console.log(e);
      });

    MedicalInsuranceService.getAll()
      .then((data) => {
        setMedicalInsurances(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const addItem = (item) => {
    const newListItem = [...items];
    newListItem.push({ ...item, id: items.length });
    setItems(newListItem);
  };
  const removeItem = (id) => {
    const newListItem = items.filter(item => item.id !== id);
    setItems(newListItem);
  };
  const onSelectSuggestion = (affilate) => {
    setSuggestionList([]);
    setSelectedAffilate(affilate);
  };
  const onChangeAffilateTexfield = async (event) => {
    const affilateNumber = event.target.value;
    setSelectedAffilate({ code: affilateNumber });
    debounderSearchAffiliate(affilateNumber, selectedMedicalInsurance);
  };
  const onChangeMedicalInsurance = (event) => {
    setSelectedAffilate(initialState.selectedAffilate);
    setSelectedMedicalInsurance(event.target.value);
  };

  const emitRecipe = async () => {
    const prescriptionRequest = new PrescriptionRequest.Builder()
      .withAffiliate(selectedAffilate.id)
      .withDiagnosis(diagnostic)
      .withInstitution(selectedInstitution)
      .withMedicalInsurance(selectedMedicalInsurance)
      .withItems(items)
      .withProlongedTreatment(prolongedTreatment)
      .build();
    try {
      await PrescriptionService.create(prescriptionRequest);
      setSnackbar({
        message: 'Se genero correctamente la receta',
        open: true,
        variant: 'success',
        onExit: () => {
          props.history.push('/recetas');
        },
      });
      setErrorsStack([]);
    } catch (error) {
      const issuedError = error;
      if (issuedError.code === '1-101' && issuedError.cause && issuedError.cause.code === '1-004') {
        setSnackbar({
          message: 'Arregle los errores e intente nuevamente',
          open: true,
          variant: 'error',
          onExit: () => { },
        });
        setErrorsStack(issuedError.cause.message.map(message => ({ message })));
      } else {
        setSnackbar({
          message: 'Hubo un error en la generacion de la receta',
          open: true,
          variant: 'error',
          onExit: () => { },
        });
      }
    }
  };

  const noItemsAdded = items.length === 0;
  const noMedicalInsuranceSelected = isUndefinedOrNull(selectedMedicalInsurance);
  const cantEmitRecipe = noMedicalInsuranceSelected || isUndefinedOrNull(selectedAffilate) || noItemsAdded;
  return (
    <React.Fragment>
      <Grid container justify="center" spacing={3} className="page">
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <div>
              <FormControl className={classes.formControlObraSocial} fullWidth>
                <InputLabel htmlFor="institution">Institucion</InputLabel>
                <Select
                  inputProps={{
                    name: 'age',
                    id: 'institution',
                  }}
                  value={selectedInstitution}
                  onChange={event => setSelectedInstitution(event.target.value)}
                >
                  {institutions.map(institution => (
                    <MenuItem value={institution.id}>{institution.description}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControlObraSocial} fullWidth>
                <InputLabel htmlFor="medical-insurance">Obra social</InputLabel>
                <Select
                  inputProps={{
                    name: 'age',
                    id: 'medical-insurance',
                  }}
                  className="emit-recipe__medical-insurance-select"
                  value={selectedMedicalInsurance}
                  onChange={onChangeMedicalInsurance}
                >
                  {medicalInsurances.map(institution => (
                    <MenuItem value={institution.id}>{institution.description}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="standard-full-width"
                label="Nro de afiliado"
                placeholder="Complete con NRO de afiliado"
                fullWidth
                margin="normal"
                type="number"
                className="emit-recipe__affilate-textfield"
                disabled={noMedicalInsuranceSelected}
                value={selectedAffilate.code}
                onChange={onChangeAffilateTexfield}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {suggestionList.length > 0 && (
                <Paper className={classes.paper} square>
                  {suggestionList.map(affiliate => (
                    <MenuItem onClick={() => onSelectSuggestion(affiliate)}>
                      {affiliate.name}
                      {' '}
                      {affiliate.surname}
                      {' '}
                      -
                      {' '}
                      {affiliate.code}
                    </MenuItem>
                  ))}
                </Paper>
              )}
              {!!selectedAffilate.id && (
                <div style={{ textAlign: 'left', marginTop: 10, marginBottom: 10 }}>
                  Nombre :
                  {' '}
                  {selectedAffilate.name}
                  {' '}
                  {selectedAffilate.surname}
                  {' '}
                  (
                  {selectedAffilate.nicNumber}
                  )
                  <br />
                  Categoria :
                  {selectedAffilate.category}
                </div>
              )}
            </div>
            <Typography style={{ textAlign: 'start' }} variant="h6" className={classes.title}>
              Medicamentos
            </Typography>
            <div>
              <List component="nav">
                {noItemsAdded && <Paper style={{ padding: 25 }}>Aun no tiene items agregados</Paper>}
                {items.map(item => (
                  <Item {...item} removeItem={removeItem} />
                ))}
              </List>
              <div
                style={{ textAlign: 'end', cursor: 'pointer' }}
                className="emit-recipe__add-item"
                onClick={() => setVisibiltyOfAddItemDialog(true)}
              >
                Agregar...
              </div>
            </div>
            <div>
              <TextField
                id="standard-full-width"
                label="Diagnostico"
                placeholder="Complete con el diagnostico del afiliado"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={diagnostic}
                onChange={event => setDiagnostic(event.target.value)}
              />
              <Grid container direction="row" justify="flex-end">
                <FormControlLabel
                  control={<Checkbox color="primary" onChange={event => setProlongedTreatment(event.target.checked)} />}
                  labelPlacement="start"
                  label="Tratamiento prolongado"
                />
              </Grid>

              <Grid container direction="row" justify="space-between">
                <div>Fecha</div>
                <div>
                  Doctor : Gonzalo gras cantou
                  <div>simulacion de la firma del doctor</div>
                </div>
              </Grid>
            </div>
            {errorsStack.length > 0
              && (
              <>
                <Divider className={classes.errorsDivider} />
                <Grid container>
                  {errorsStack.map(error => (
                    <Grid item xs={12} className={classes.issuedErrors} justify="flex-start">
                      <Typography variant="subtitle1">{`• ${error.message}`}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </>
              )}
          </Paper>
        </Grid>
        <Grid container justify="flex-end" xs={9}>
          <Button
            variant="contained"
            color="primary"
            className={`emit-recipe__button ${classes.button}`}
            disabled={cantEmitRecipe}
            onClick={emitRecipe}
          >
            Emitir
          </Button>
        </Grid>
        <AddItemDialog
          open={addItemDialogOpen}
          handleClose={() => setVisibiltyOfAddItemDialog(false)}
          addItem={addItem}
        />
      </Grid>
      <SnackbarWrapper
        vertical="bottom"
        horizontal="center"
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbarInitialState, onExit: snackbar.onExit })}
        variant={snackbar.variant}
        message={snackbar.message}
        onExit={snackbar.onExit}
      />
    </React.Fragment>
  );
};

export default EmitRecipe;
