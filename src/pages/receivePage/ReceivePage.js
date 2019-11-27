import React, { useEffect, useState, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import AffiliateService from '../../services/AffilateService';
import PrescriptionService from '../../services/PrescriptionService';
import MedicalInsuranceService from '../../services/MedicalInsuranceService';
import withSnackbar from '../../components/hocs/withSnackbar';
import AuthorizationProvider from '../../components/authorizationProvider/AuthorizationProvider';

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
  const { showError } = props;

  const [medicalInsurances, setMedicalInsurances] = useState([]);
  const [selectedMedicalInsurance, setSelectedMedicalInsurance] = useState(null);
  const [suggestionList, setSuggestionList] = useState([]);
  const [selectedAffilate, setSelectedAffilate] = useState(initialState.selectedAffilate);
  const [selectedPrescription, setSelectedPrescription] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [authenticateAffiliate, setAuthenticateAffiliate] = useState(false);
  const [affiliateDefaultAuth, setAffiliateDefaultAuth] = useState('');

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

  const onSuccessIdentify = (authentication) => {
    props.history.push(`/receta/${selectedPrescription}`, authentication);
  };

  const onFailureIdentify = (err) => {
    setAffiliateDefaultAuth(false);
    setAuthenticateAffiliate(false);
    showError('Error al autenticarse');
  };

  const searchAffiliatePrescriptions = async () => {
    // props.history.push('/recetas', { affiliate: selectedAffilate, medicalInsurance: selectedMedicalInsurance });
    try {
      setErrorMessage('');
      await PrescriptionService.getById(selectedPrescription, {
        affiliate: selectedAffilate.id,
        medicalInsurance: selectedMedicalInsurance,
      });
      setAffiliateDefaultAuth(await AffiliateService.getDefaultAuthenticationType(selectedAffilate.id));
      setAuthenticateAffiliate(true);
    } catch (error) {
      setErrorMessage('No se encontro la receta asociada a este afiliado');
    }
  };
  const noMedicalInsuranceSelected = isUndefinedOrNull(selectedMedicalInsurance);

  return (
    <Grid container className="page">
      {authenticateAffiliate && affiliateDefaultAuth && (
        <AuthorizationProvider
          authenticationType={affiliateDefaultAuth.default}
          authorizationType="authorize_receive"
          data={{ id: selectedPrescription }}
          userType="affiliate"
          onConfirm={onSuccessIdentify}
          onCancel={onFailureIdentify}
        />
      )}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h4">Recepcionar</Typography>
          <TextField name="age" fullWidth select label="Obra social" onChange={onChangeMedicalInsurance} value={selectedMedicalInsurance || ''}>
            {medicalInsurances.map(institution => (
              <MenuItem key={institution.id} value={institution.id}>{institution.description}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Nro de afiliado"
            placeholder="Complete con NRO de afiliado"
            fullWidth
            margin="normal"
            type="number"
            disabled={noMedicalInsuranceSelected}
            value={selectedAffilate.code || ''}
            onChange={onChangeAffilateTexfield}
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
          {!!selectedAffilate.id && (
            <div style={{ textAlign: 'left', marginTop: 10, marginBottom: 10 }}>
              {`Nombre : ${selectedAffilate.name} ${selectedAffilate.surname} (${selectedAffilate.nicNumber})`}
              <br />
              {`Categoria : ${selectedAffilate.category}`}
            </div>
          )}
          <TextField
            label="Nro de receta"
            placeholder="Complete con NRO de receta"
            fullWidth
            margin="normal"
            type="number"
            disabled={!selectedAffilate.id}
            value={selectedPrescription || ''}
            onChange={({ target: { value } }) => setSelectedPrescription(value)}
          />
          {errorMessage && (
            <Typography className={classes.errorMessage}>
              {` ${errorMessage}`}
            </Typography>
          )}
          <div style={{ textAlign: 'end', marginTop: '12px' }}>
            <Button disabled={!selectedAffilate.id} variant="contained" color="primary" onClick={searchAffiliatePrescriptions}>
              Buscar
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withSnackbar(ReceivePage);
