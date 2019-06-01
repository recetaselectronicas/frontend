import React, { useEffect, useState } from 'react';
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
import Item from './components/item/Item';
import AddItemDialog from './components/addItemDialog/AddItemDialog';
import MedicamentService from '../../services/MedicamentService';
import InstitutionService from '../../services/InstutionService';
import MedicalInsuranceService from '../../services/MedicalInsuranceService';
import Suggestions from './components/suggestions/Suggestions';
import AffilateService from '../../services/AffilateService';
import PrescriptionService from '../../services/PrescriptionService';
import PrescriptionRequest from '../../requestBuilders/PrescriptionRequest';

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
}));

const initialState = {
  selectedAffilate: {
    code: '',
  },
};
const isUndefinedOrNull = value => value === undefined || value === null;
const EmitRecipe = () => {
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
    if (affilateNumber.length >= 3) {
      try {
        const data = await AffilateService.searchAffilateNumber(affilateNumber);
        setSuggestionList(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onChangeMedicalInsurance = (event) => {
    setSelectedAffilate(initialState.selectedAffilate);
    setSelectedMedicalInsurance(event.target.value);
  };

  const emitRecipe = async () => {
    const prescriptionRequest = new PrescriptionRequest
      .Builder()
      .withAffiliate(selectedAffilate.id)
      .withDiagnosis(diagnostic)
      .withDoctor(2)
      .withInstitution(selectedInstitution)
      .withMedicalInsurance(selectedMedicalInsurance)
      .withItems(items)
      .withProlongedTreatment(prolongedTreatment)
      .build();
    try {
      const data = await PrescriptionService.create(prescriptionRequest);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container justify="center" spacing={3}>
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
                  <MenuItem value={institution.id}>
                    {institution.label}
                  </MenuItem>
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
                  <MenuItem value={institution.id}>
                    {institution.label}
                  </MenuItem>
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
              value={selectedAffilate.code}
              onChange={onChangeAffilateTexfield}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {suggestionList.length > 0 && (
            <Paper className={classes.paper} square>
              <Suggestions
                data={suggestionList}
                onSelectSuggestion={onSelectSuggestion}
              />
            </Paper>
            )}
            {selectedAffilate && (
            <div style={{ textAlign: 'left', marginTop: 10, marginBottom: 10 }}>
            Nombre :
              {selectedAffilate.name}
              {' '}
              {selectedAffilate.lastname}
            - Categoria :
              {' '}

              {selectedAffilate.category}
            </div>
            )}
          </div>
          <Typography
            style={{ textAlign: 'start' }}
            variant="h6"
            className={classes.title}
          >
            Medicamentos
          </Typography>
          <div>
            <List component="nav">
              {items.length === 0
              && (
                <Paper style={{ padding: 25 }}>
                Aun no tiene items agregados
                </Paper>
              )
              }
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
                control={(
                  <Checkbox
                    color="primary"
                    onChange={event => setProlongedTreatment(event.target.checked)}
                  />
                  )}
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
        </Paper>
      </Grid>
      <Grid container justify="flex-end" xs={9}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={
                    !selectedMedicalInsurance
                    || !selectedInstitution
                    || !selectedMedicalInsurance
                    || isUndefinedOrNull(selectedAffilate)
                    || items.length === 0
                  }
          onClick={emitRecipe}
        >
                  Emitir
        </Button>
      </Grid>
      <AddItemDialog
        open={addItemDialogOpen}
        handleClose={() => setVisibiltyOfAddItemDialog(false)}
        addItem={addItem}
        searchMedicament={MedicamentService.searchMedicamentByName}
      />
    </Grid>
  );
};

export default EmitRecipe;
