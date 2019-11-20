import React, { useState, useEffect } from 'react';
import { Paper, Container, CircularProgress, Grid, Typography, Tooltip, InputAdornment, Button } from '@material-ui/core';
import TagFaces from '@material-ui/icons/Link';
import moment from 'moment';
import UserService from '../../services/UserService';
import SessionService from '../../services/SessionService';
import { getCheckedField, getCheckedDateField, getValidatedProfileData, hasError, translateProfileErrors } from './ProfileUtils';
import withSnackbar from '../../components/hocs/withSnackbar';
import SimpleInput from './components/SimpleInput';
import SelectInput from './components/SelectInput';
import DateInput from './components/DateInput';

const getMappedUserType = (type) => {
  const types = {
    affiliate: 'PACIENTE',
    doctor: 'MÉDICO',
    pharmacist: 'FARMACÉUTICO',
    medicalInsurance: 'OBRA SOCIAL',
  };
  return types[type] || type;
};

const ProfilePage = (props) => {
  const { showSuccess, showError } = props;
  const [initialProfile, setInitialProfile] = useState(null);
  const [profile, setProfile] = useState(null);
  const [userType, setUserType] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await UserService.getDataFields();
        const sessionData = await SessionService.getUserData();
        setUserType(getMappedUserType(sessionData.type));
        if (data.birthDate && data.birthDate.value) {
          data.birthDate.value = moment(data.birthDate.value, 'DD/MM/YYYY').toDate();
        }
        setInitialProfile(data);
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const startEdition = () => {
    setEditing(true);
  };

  const cancelEdition = () => {
    setProfile({ ...initialProfile });
    setEditing(false);
  };

  const saveEdition = async () => {
    const newProfile = getValidatedProfileData(profile);
    if (hasError(newProfile)) {
      return showError('Corrija los errores e intente nuevamente');
    }
    try {
      if (newProfile.birthDate && newProfile.birthDate.value) {
        newProfile.birthDate.value = moment(newProfile.birthDate.value).format('DD/MM/YYYY');
      }
      await UserService.updateDataFields(newProfile);
      setInitialProfile(getValidatedProfileData(profile));
      setProfile(getValidatedProfileData(profile));
      setEditing(false);
      showSuccess('Perfil actualizado correctamente');
    } catch (e) {
      if (e.name || e.nicType || e.nicNumber) {
        translateProfileErrors(e);
        if (e.birthDate && e.birthDate.value) {
          e.birthDate.value = moment(e.birthDate.value, 'DD/MM/YYYY').toDate();
        }
        setProfile(e);
        showError('Corrija los errores e intente nuevamente');
      } else {
        console.error(e);
        showError('Ocurrió un error inesperado');
      }
    }
  };

  const isDisabled = (field) => {
    return !(editing && field.editable);
  };

  const onFieldChange = (event) => {
    if (editing) {
      const { name, value } = event.target;
      const newProfile = { ...profile };
      newProfile[name] = getCheckedField(newProfile[name], value);
      setProfile(newProfile);
    }
  };

  const onDateChange = (value) => {
    if (editing) {
      const newProfile = { ...profile };
      newProfile.birthDate = getCheckedDateField(newProfile.birthDate, value);
      setProfile(newProfile);
    }
  };

  if (!profile) {
    return (
      <Container maxWidth="md">
        <Paper>
          <CircularProgress />
        </Paper>
      </Container>
    );
  }
  const {
    profileImage,
    name,
    surname,
    lastName,
    userName,
    birthDate,
    gender,
    contactNumber,
    email,
    address,
    nationality,
    nicType,
    nicNumber,
    nicPhoto,
    nationalMatriculation,
    provincialMatriculation,
    matriculation,
    specialty,
  } = profile;
  return (
    <Container maxWidth="md" fixed style={{ marginTop: '16px' }}>
      <input type="hidden" value="justForDisablingAutocomplete" />
      <Paper style={{ padding: '8px' }}>
        <Grid container spacing={3}>
          <Grid container item xs={12} sm={3} style={{ alignSelf: 'baseline' }}>
            <Grid item xs={12}>
              <img alt={profileImage.fieldName} name={profileImage.fieldName} src={profileImage.value} style={{ maxWidth: 'inherit', maxHeight: 'inherit' }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" style={{ margin: '8px' }}>{`Usuario: ${userName.value}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" style={{ margin: '8px' }}>{`Tipo: ${userType}`}</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} sm={9} spacing={5}>
            <Grid item xs={12} sm={6}>
              <SimpleInput field={name} disabled={isDisabled(name)} onChange={onFieldChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SimpleInput field={surname || lastName} disabled={isDisabled(surname || lastName)} onChange={onFieldChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectInput field={nationality} disabled={isDisabled(nationality)} onChange={onFieldChange} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <SelectInput field={gender} disabled={isDisabled(gender)} onChange={onFieldChange} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DateInput field={birthDate} disabled={isDisabled(birthDate)} onChange={onDateChange} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SelectInput field={nicType} disabled={isDisabled(nicType)} onChange={onFieldChange} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SimpleInput
                field={nicNumber}
                disabled={isDisabled(nicNumber)}
                onChange={onFieldChange}
                inputProps={{ endAdornment: nicPhoto.value && (
                  <InputAdornment position="end">
                    <Tooltip title={<img alt={nicPhoto.fieldName} name={nicPhoto.fieldName} src={nicPhoto.value} style={{ maxWidth: 'inherit', maxHeight: 'inherit' }} />}>
                      <TagFaces />
                    </Tooltip>
                  </InputAdornment>
                ) }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SimpleInput field={address} disabled={isDisabled(address)} onChange={onFieldChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SimpleInput field={contactNumber} disabled={isDisabled(contactNumber)} onChange={onFieldChange} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <SimpleInput field={email} disabled={isDisabled(email)} onChange={onFieldChange} />
            </Grid>
            {nationalMatriculation && (
              <Grid item xs={12} sm={6}>
                <SimpleInput field={nationalMatriculation} disabled={isDisabled(nationalMatriculation)} onChange={onFieldChange} />
              </Grid>
            )}
            {provincialMatriculation && (
              <Grid item xs={12} sm={6}>
                <SimpleInput field={provincialMatriculation} disabled={isDisabled(provincialMatriculation)} onChange={onFieldChange} />
              </Grid>
            )}
            {matriculation && (
              <Grid item xs={12} sm={6}>
                <SimpleInput field={matriculation} disabled={isDisabled(matriculation)} onChange={onFieldChange} />
              </Grid>
            )}
            {specialty && (
              <Grid item xs={12} sm={6}>
                <SelectInput field={specialty} disabled={isDisabled(specialty)} onChange={onFieldChange} />
              </Grid>
            )}
            <Grid container item justify="flex-end" spacing={3}>
              {editing && (
                <>
                  <Grid item>
                    <Button variant="contained" color="secondary" onClick={cancelEdition}>Cancelar</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={saveEdition}>Aceptar</Button>
                  </Grid>
                </>
              )}
              {!editing && (
                <Grid item>
                  <Button variant="contained" color="primary" onClick={startEdition}>Editar</Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default withSnackbar(ProfilePage);
