import React, { useEffect, useState, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import AffiliateService from '../../services/AffilateService';
import PrescriptionService from '../../services/PrescriptionService';
import MedicalInsuranceService from '../../services/MedicalInsuranceService';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: '2em',
    paddingTop: '1em',
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formControlObraSocial: {
    marginBottom: 8,
  },
  errorMessage: {
    color: theme.palette.error.dark,
  },
}));

const initialState = {
  selectedAffilate: {
    code: '',
  },
};
const isUndefinedOrNull = value => value === undefined || value === null;

const ReceivePage = (props) => {
  const classes = useStyles();

  const [medicalInsurances, setMedicalInsurances] = useState([]);
  const [selectedMedicalInsurance, setSelectedMedicalInsurance] = useState(null);
  const [suggestionList, setSuggestionList] = useState([]);
  const [selectedAffilate, setSelectedAffilate] = useState(initialState.selectedAffilate);
  const [selectedPrescription, setSelectedPrescription] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    MedicalInsuranceService.getAll()
      .then((data) => {
        setMedicalInsurances(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const debounderSearchAffiliate = useCallback(
    _.debounce(async (code, medicalInsurance) => {
      if (code.length >= 3) {
        const data = await AffiliateService.searchAffilateNumber(code, medicalInsurance);
        setSuggestionList(data);
      }
    }, 300),
    [],
  );
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
  const searchAffiliatePrescriptions = async () => {
    // props.history.push('/recetas', { affiliate: selectedAffilate, medicalInsurance: selectedMedicalInsurance });
    try {
      await PrescriptionService.getById(selectedPrescription, {
        affiliate: selectedAffilate.id,
        medicalInsurance: selectedMedicalInsurance,
      });
      props.history.push(`/receta/${selectedPrescription}`);
    } catch (error) {
      setErrorMessage('No se encontro la receta asociada a este afiliado');
    }

    /* {
            affiliate: selectedAffilate,
            medicalInsurance: selectedMedicalInsurance,
        } */
  };
  const noMedicalInsuranceSelected = isUndefinedOrNull(selectedMedicalInsurance);

  return (
    <Grid container className="page">
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h4">Recepcionar</Typography>
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
          <TextField
            id="standard-full-width"
            label="Nro de receta"
            placeholder="Complete con NRO de receta"
            fullWidth
            margin="normal"
            type="number"
            className="emit-recipe__affilate-textfield"
            disabled={!selectedAffilate.id}
            value={selectedPrescription}
            onChange={({ target: { value } }) => setSelectedPrescription(value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Typography className={classes.errorMessage}>
            {' '}
            {errorMessage}
          </Typography>
          <div style={{ textAlign: 'end', marginTop: '12px' }}>
            <Button
              disabled={!selectedAffilate.id}
              variant="contained"
              color="primary"
              onClick={searchAffiliatePrescriptions}
            >
              Buscar
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ReceivePage;
