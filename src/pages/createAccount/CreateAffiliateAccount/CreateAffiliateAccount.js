import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import { Paper, Hidden } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountService from '../../../services/AccountService';
import {
  availableGenders,
  availableNationalities,
  availableNicTypes,
  calculateErrors,
  getAffiliatePayload,
  getEmptyAffiliateData,
  hasError,
  parseAffiliateResponseError,
} from '../AccountsUtils';
import ImageSelector from '../../../components/imageSelector/imageSelector';
import withSnackbar from '../../../components/hocs/withSnackbar';

const getGenderItems = genders => genders.map(option => (
  <MenuItem key={option.value} value={option.value}>
    {option.label}
  </MenuItem>
));

const getNationalityItems = nationalities => nationalities.map(option => (
  <MenuItem key={option.value} value={option.value}>
    {option.label}
  </MenuItem>
));

const getNicTypeItems = nicTypes => nicTypes.map(option => (
  <MenuItem key={option.value} value={option.value}>
    {option.label}
  </MenuItem>
));

function CreateAffiliateAccount(props) {
  const { showError, onCreationSuccess, onCreationCancel } = props;
  const [accountData, setAccountData] = useState(getEmptyAffiliateData());
  const [creating, setCreating] = useState(false);
  const { name, surName, userName, password, birthDate, gender, contactNumber, email, address, nationality, nicNumber, nicType, nicPhoto } = accountData;

  const cancel = () => {
    onCreationCancel();
  };

  const goToCongrats = () => {
    onCreationSuccess(accountData);
  };

  const createAccount = async () => {
    const newAccountData = calculateErrors(accountData);
    if (hasError(newAccountData)) {
      return setAccountData(newAccountData);
    }
    try {
      setCreating(true);
      await AccountService.createAffiliateAccount(getAffiliatePayload(accountData));
      setCreating(false);
      goToCongrats();
    } catch (e) {
      setCreating(false);
      const parsedAccountData = parseAffiliateResponseError(accountData, e);
      if (parsedAccountData) {
        return setAccountData(parsedAccountData);
      }
      console.error(e);
      showError('Ocurrió un error al crear la cuenta');
    }
    return null;
  };

  const wrapOnChange = (target, field) => {
    accountData[field.fieldName].value = target.value;
    accountData[field.fieldName] = accountData[field.fieldName].getValidatedField(accountData[field.fieldName]);
    setAccountData({ ...accountData });
  };


  return (
    <>
      <div style={{ paddingTop: '50px' }}>
        <Container maxWidth="md">
          <Paper>
            <input type="hidden" value="justForDisablingAutocomplete" />
            <Grid container spacing={3} className="without-spacing-xs">
              <Hidden xsDown>
                <Grid item xs={1} />
              </Hidden>
              <Grid item container spacing={3} className="without-spacing-xs" xs={12} sm={4} className="without-spacing-xs">
                <Grid item xs={12}>
                  <TextField name={name.fieldName} margin="normal" fullWidth helperText={name.error} error={!!name.error} label="Nombre" onChange={event => wrapOnChange(event.target, name)} value={name.value} autoComplete="off" />
                </Grid>
                <Grid item xs={12}>
                  <TextField name={surName.fieldName} fullWidth helperText={surName.error} error={!!surName.error} label="Apellido" onChange={event => wrapOnChange(event.target, surName)} value={surName.value} autoComplete="off" />
                </Grid>
                <Grid item xs={12}>
                  <TextField name={email.fieldName} fullWidth helperText={email.error} error={!!email.error} label="Email" onChange={event => wrapOnChange(event.target, email)} value={email.value} autoComplete="off" />
                </Grid>
                <Grid item xs={12}>
                  <TextField name={userName.fieldName} fullWidth helperText={userName.error} error={!!userName.error} label="Usuario" onChange={event => wrapOnChange(event.target, userName)} value={userName.value} autoComplete="off" />
                </Grid>
                <Grid item xs={12}>
                  <TextField name={password.fieldName} fullWidth helperText={password.error} error={!!password.error} type="password" label="Password" onChange={event => wrapOnChange(event.target, password)} value={password.value} autoComplete="new-password" />
                </Grid>
              </Grid>
              <Hidden xsDown>
                <Grid item sm={1}>
                  <Divider orientation="vertical" variant="middle" style={{ marginTop: '10px' }} />
                </Grid>
              </Hidden>
              <Grid item container spacing={3} xs={12} sm={6} className="without-spacing-xs">
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker name={birthDate.fieldName} margin="normal" helperText={birthDate.error} error={!!birthDate.error} format="dd/MM/yyyy" label="Fecha de Nacimiento" onChange={value => wrapOnChange({ value }, birthDate)} value={birthDate.value} autoComplete="off" />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name={gender.fieldName} fullWidth helperText={gender.error} error={!!gender.error} select label="Sexo" onChange={event => wrapOnChange(event.target, gender)} value={gender.value} autoComplete="off">
                    {getGenderItems(availableGenders)}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name={nationality.fieldName} fullWidth helperText={nationality.error} error={!!nationality.error} select label="Nacionalidad" onChange={event => wrapOnChange(event.target, nationality)} value={nationality.value} autoComplete="off">
                    {getNationalityItems(availableNationalities)}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name={nicType.fieldName} fullWidth helperText={nicType.error} error={!!nicType.error} select label="Tipo de Documento" onChange={event => wrapOnChange(event.target, nicType)} value={nicType.value} autoComplete="off">
                    {getNicTypeItems(availableNicTypes)}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name={nicNumber.fieldName} fullWidth helperText={nicNumber.error} error={!!nicNumber.error} label="Número de Documento" onChange={event => wrapOnChange(event.target, nicNumber)} value={nicNumber.value} autoComplete="off" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name={address.fieldName} fullWidth helperText={address.error} error={!!address.error} label="Dirección" onChange={event => wrapOnChange(event.target, address)} value={address.value} autoComplete="off" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name={contactNumber.fieldName} fullWidth helperText={contactNumber.error} error={!!contactNumber.error} label="Telefono de Contacto" onChange={event => wrapOnChange(event.target, contactNumber)} value={contactNumber.value} autoComplete="off" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ImageSelector photo={nicPhoto.value} onSelect={value => wrapOnChange({ value }, nicPhoto)} onUnSelect={() => wrapOnChange({ value: '' }, nicPhoto)} autoComplete="off" />
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={3} className="without-spacing-xs" style={{ marginTop: '30px' }}>
              <Hidden xsDown>

                <Grid item xs={3} />
                <Grid item xs={3} />
              </Hidden>
              <Grid item xs={6} sm={2}>
                <Button onClick={cancel} variant="contained" color="secondary" disabled={creating}>
                  Cancelar
                </Button>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Button onClick={createAccount} variant="contained" color="primary" style={{ minWidth: '150px' }} disabled={creating}>
                  {!creating && 'Crear Cuenta'}
                  {creating && (<CircularProgress size={24} />)}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    </>
  );
}

export default withSnackbar(CreateAffiliateAccount);
