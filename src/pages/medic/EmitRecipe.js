import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
import UserService from '../../services/UserService';
import withSnackbar from '../../components/hocs/withSnackbar';
import PrescriptionEmitFlow from './components/prescriptionEmitFlow/prescriptionEmitFlow';

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

export const EmitRecipeComponent = (props) => {
  const classes = useStyles();
  const { showError, showSuccess } = props;

  const [addItemDialogOpen, setVisibiltyOfAddItemDialog] = useState(false);
  const [prolongedTreatment, setProlongedTreatment] = useState(false);
  const [items, setItems] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [medicalInsurances, setMedicalInsurances] = useState([]);
  const [selectedMedicalInsurance, setSelectedMedicalInsurance] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [selectedAffiliate, setSelectedAffiliate] = useState(initialState.selectedAffilate);
  const [suggestionList, setSuggestionList] = useState([]);
  const [diagnostic, setDiagnostic] = useState('');
  const [loggedUser, setLoggedUser] = useState(null);
  const [errorsStack, setErrorsStack] = useState([]);
  const [onEmitFlow, setOnEmitFlow] = useState(false);
  const [created, setCreated] = useState(false);

  const debounderSearchAffiliate = useCallback(
    _.debounce(async (code, medicalInsurance) => {
      if (code.length >= 3) {
        const data = await AffiliateService.searchAffilateNumber(code, medicalInsurance);
        setSuggestionList(data);
      }
    }, 300),
    [],
  );

  useEffect(() => {
    async function fetchData() {
      const institutionsPromise = InstitutionService.getAll();
      const medicalInsurancePromise = MedicalInsuranceService.getByDoctor();
      const userDataPromise = UserService.getData();
      try {
        setInstitutions(await institutionsPromise);
        setMedicalInsurances(await medicalInsurancePromise);
        setLoggedUser(await userDataPromise);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  const addItem = (item) => {
    const newListItem = [...items];
    newListItem.push({ ...item, quantity: +item.quantity, id: items.length });
    setItems(newListItem);
  };
  const removeItem = (id) => {
    const newListItem = items.filter(item => item.id !== id);
    setItems(newListItem);
  };
  const onSelectSuggestion = (affilate) => {
    setSuggestionList([]);
    setSelectedAffiliate(affilate);
  };
  const onChangeAffiliateTextField = async (event) => {
    const affiliateNumber = event.target.value;
    setSelectedAffiliate({ code: affiliateNumber });
    debounderSearchAffiliate(affiliateNumber, selectedMedicalInsurance);
  };
  const onChangeMedicalInsurance = (event) => {
    setSelectedAffiliate(initialState.selectedAffilate);
    setSelectedMedicalInsurance(event.target.value);
  };

  const buildPrescriptionRequest = () => new PrescriptionRequest.Builder()
    .withAffiliate(selectedAffiliate.id)
    .withDiagnosis(diagnostic)
    .withInstitution(selectedInstitution)
    .withMedicalInsurance(selectedMedicalInsurance)
    .withItems(items)
    .withProlongedTreatment(prolongedTreatment)
    .build();

  const startPrescriptionEmitFlow = async () => {
    const prescriptionRequest = buildPrescriptionRequest();
    try {
      await PrescriptionService.validate(prescriptionRequest);
      setErrorsStack([]);
      setOnEmitFlow(true);
    } catch (error) {
      const issuedError = error;
      if (issuedError.code === '1-101' && issuedError.cause && issuedError.cause.code === '1-004') {
        showError('Arregle los errores e intente nuevamente');
        setErrorsStack(issuedError.cause.message.map(message => ({ message })));
      } else {
        console.error(error);
        showError('Hubo un error en la generacion de la receta');
        setErrorsStack([]);
      }
    }
  };

  const onSuccessEmit = (prescription) => {
    setOnEmitFlow(false);
    setCreated(true);
    showSuccess('Se genero correctamente la receta', () => props.history.push('/recetas'));
    setErrorsStack([]);
  };

  const onFailureEmit = (error) => {
    setOnEmitFlow(false);
    console.error(error);
    showError('Hubo un error en la generacion de la receta');
  };

  const noItemsAdded = items.length === 0;
  const noMedicalInsuranceSelected = isUndefinedOrNull(selectedMedicalInsurance) || !selectedMedicalInsurance;
  const cantEmitRecipe = noMedicalInsuranceSelected || isUndefinedOrNull(selectedAffiliate.id) || noItemsAdded;
  return (
    <React.Fragment>
      {onEmitFlow && <PrescriptionEmitFlow affiliate={selectedAffiliate} prescription={buildPrescriptionRequest()} onFailure={onFailureEmit} onSuccess={onSuccessEmit} />}
      <Grid container justify="center" spacing={3} className="page">
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <div>
              <TextField name="institucion" fullWidth select label="Institucion" onChange={event => setSelectedInstitution(event.target.value)} value={selectedInstitution}>
                {institutions.map(institution => (
                  <MenuItem key={institution.id} value={institution.id}>{institution.description}</MenuItem>
                ))}
              </TextField>
              <TextField name="medical-insurance" className="emit-recipe__medical-insurance-select" fullWidth select label="Obra Social" onChange={onChangeMedicalInsurance} value={selectedMedicalInsurance}>
                {medicalInsurances.map(medicalInsurance => (
                  <MenuItem key={medicalInsurance.id} value={medicalInsurance.id}>{medicalInsurance.description}</MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-full-width"
                label="Nro de afiliado"
                placeholder="Complete con NRO de afiliado"
                fullWidth
                margin="normal"
                type="number"
                className="emit-recipe__affilate-textfield"
                disabled={noMedicalInsuranceSelected}
                value={selectedAffiliate.code}
                onChange={onChangeAffiliateTextField}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {suggestionList.length > 0 && (
                <Paper className={classes.paper} square>
                  {suggestionList.map(affiliate => (
                    <MenuItem key={affiliate.id} onClick={() => onSelectSuggestion(affiliate)}>
                      {`${affiliate.name} ${affiliate.surname} - ${affiliate.code}`}
                    </MenuItem>
                  ))}
                </Paper>
              )}
              {!!selectedAffiliate.id && (
                <div style={{ textAlign: 'left', marginTop: 10, marginBottom: 10 }}>
                  {`Nombre : ${selectedAffiliate.name} ${selectedAffiliate.surname} (${selectedAffiliate.nicNumber})`}
                  <br />
                  {`Categoria : ${selectedAffiliate.category}`}
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
                  <Item key={item.id} {...item} removeItem={removeItem} />
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
                autoComplete="off"
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
                <div>
                  Fecha:
                  {` ${new Date().toLocaleDateString()}`}
                </div>
                <div>
                  Doctor:
                  {` ${loggedUser && loggedUser.name} ${loggedUser && loggedUser.lastName}`}
                </div>
              </Grid>
            </div>
            {errorsStack.length > 0
              && (
                <>
                  <Divider className={classes.errorsDivider} />
                  <Grid container justify="flex-start">
                    {errorsStack.map(error => (
                      <Grid item xs={12} className={classes.issuedErrors} key={error.message}>
                        <Typography variant="subtitle1">{`• ${error.message}`}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
          </Paper>
        </Grid>
        <Grid container item justify="flex-end" xs={9}>
          <Button
            variant="contained"
            color="primary"
            className={`emit-recipe__button ${classes.button}`}
            disabled={!created && cantEmitRecipe}
            onClick={startPrescriptionEmitFlow}
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
    </React.Fragment>
  );
};

const EmitRecipe = withSnackbar(EmitRecipeComponent);
export default EmitRecipe;
