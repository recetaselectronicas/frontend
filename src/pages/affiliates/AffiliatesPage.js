import React, { useState, useEffect, useCallback } from 'react';
import { Container, Paper, Button, TextField, MenuItem, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MedicalInsuranceService from '../../services/MedicalInsuranceService';
import PatientService from '../../services/PatientService';
import LinksService from '../../services/LinksService';
import withSnackbar from '../../components/hocs/withSnackbar';
import { UsersList } from '../../components/usersList/UsersList';
import ImageSelector from '../../components/imageSelector/imageSelector';
import FindByNicNumber from '../../components/findByNicNumber/FindByNicNumber';

const AffiliatesPage = ({ showSuccess, showError }) => {
  const [affiliates, setAffiliates] = useState([]);
  const [nicNumber, setNicnumber] = useState('');
  const [gender, setGender] = useState('');
  const [affiliateFlow, setAddAffiliateFlow] = useState(false);
  const [searchPatients, setSearchPatients] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [imageCredential, setImageCredential] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('');

  const fetchData = useCallback(async () => {
    const data = await MedicalInsuranceService.getAffiliates();
    const plansData = await MedicalInsuranceService.getPlans();
    setAffiliates(data);
    setPlans(plansData);
  });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const unlink = async (affiliate) => {
    try {
      await LinksService.unlink({
        affiliate: {
          patient: {
            id: affiliate.idPatient,
          },
          plan: {
            id: affiliate.plan.id,
          },
        },
      });
      showSuccess('Se desvinculo con exito el afiliado !');
      await fetchData();
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.message) {
      showError(error.message);
    } else {
      showError('Hubo un error inesperado lo sentimos !');
    }
  };
  const cleanInputs = () => {
    setAddAffiliateFlow(false)
    setSelectedPatient(null);
    setSelectedPlan(null);
    setSearchPatients(null)
    setImageCredential('');
    setCode('');
    setCategory('');
  };
  const search = async () => {
    try {
      const patients = await PatientService.search({ nicNumber, gender });
      setSearchPatients(patients);
    } catch (error) {
      handleError(error);
    }
  };
  const linkup = async () => {
    try {
      await LinksService.requestLink({
        affiliate: {
          imageCredential,
          code,
          category,
          patient: {
            id: selectedPatient.id,
          },
          plan: {
            id: selectedPlan.id,
          },
        },
      });
      showSuccess('Se vinculo con exito el paciente !');
      cleanInputs();
      await fetchData();
    } catch (error) {
      handleError(error);
    }
  };

  const selectPatient = (patient) => {
    setSelectedPatient(patient);
    setSearchPatients(null);
  };

  const onClose = () => {
    cleanInputs();
  }
  const linkupButtonDisabled = !code || !category || !imageCredential || !selectedPlan || !selectedPatient
  return (
    <Container className="page">
      <Paper style={{ padding: '2em', marginBottom: '2em' }}>
        <div>
          {!affiliateFlow && <Button onClick={() => setAddAffiliateFlow(true)}>Agregar a un afiliado</Button>}
          {affiliateFlow && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5">Agregar a un afiliado</Typography>
            <IconButton aria-label="Close" onClick={onClose} >
              <CloseIcon />
            </IconButton>
          </div>}
        </div>
        {affiliateFlow && (
          <div>
            Buscar
            <FindByNicNumber
              gender={gender}
              nicNumber={nicNumber}
              setNicnumber={setNicnumber}
              setGender={setGender}
              search={search}
            />
            <div>
              <UsersList users={searchPatients} onClick={(patient) => selectPatient(patient)} labelButton="Vincular" emptyState={gender && nicNumber && "No hay resultados que  para esta busqueda"} />

              {selectedPatient && (
                <div>
                  <div>
                    <TextField fullWidth select label="Plan" onChange={event => setSelectedPlan(event.target.value)} value={selectedPlan}>
                      {plans.map(plan => (
                        <MenuItem key={plan.id} value={plan}>
                          {plan.description}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div style={{ marginTop: '1em', marginBottom: '0.5em' }}>
                    <ImageSelector
                      photo={imageCredential}
                      label="Sacale una foto al carnet"
                      placeholder="Foto Carnet.jpg"
                      onSelect={value => setImageCredential(value)}
                      onUnSelect={() => setImageCredential('')}
                    />

                  </div>
                  <TextField fullWidth label="Codigo" onChange={event => setCode(event.target.value)} value={code} />
                  <TextField fullWidth label="Categoria" onChange={event => setCategory(event.target.value)} value={category} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1em' }}>

                    <Button variant="contained" color="primary" disabled={linkupButtonDisabled} onClick={linkup}>
                      Aceptar
                                        </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Paper>
      <Typography variant="h5" style={{ marginBottom: '1em' }}>Usuarios afiliados</Typography>
      <UsersList users={affiliates} onClick={unlink} emptyState="No tienes afiliados asociados" labelButton="Desvincular" />
    </Container>
  );
};

export default withSnackbar(AffiliatesPage);
