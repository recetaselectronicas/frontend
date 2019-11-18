import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Paper, Container, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import LinksService from '../../services/LinksService';
import MedicalInsuranceService from '../../services/MedicalInsuranceService';
import ImageSelector from '../../components/imageSelector/imageSelector';
import RequestLinkupsList from '../../components/RequestLinkupsList/RequestLinkupsList';
import useRequestsLinkups from '../../hooks/useRequestsLinkups';
import withSnackbar from '../../components/hocs/withSnackbar';
import SessionService from '../../services/SessionService';


const translations = {
  'patient has pending link-up requests': 'El paciente tiene vinculaciones pendientes',
};

const i18n = {
  get: key => translations[key] || key,
};
const MedicalInsurancesPage = ({ showSuccess, showError }) => {
  const [requestsLinkups, refreshRequestsLinkups] = useRequestsLinkups();
  const [medicalInsurances, setMedicalInsurances] = useState([]);
  const [linkedMedicalInsurances, setLinkedMedicalInsurances] = useState([]);
  const [selectedmedicalInsurance, setSelectedMedicalInsurance] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [imageCredential, setImageCredential] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('');
  const { type } = SessionService.getUserData();
  const isAffiliate = type === 'affiliate';

  async function fetchData() {
    try {
      const dataMedicalInsurance = await MedicalInsuranceService.getAll();
      const medicalInsurancesLinked = await MedicalInsuranceService.getLinkedMedicalInsurances();
      setMedicalInsurances(dataMedicalInsurance);
      setLinkedMedicalInsurances(medicalInsurancesLinked);
    } catch (error) {
      showError('Hubo un error inesperado lo sentimos !');
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const getPlans = () => selectedmedicalInsurance.plans || [];

  const cleanInputs = () => {
    setSelectedMedicalInsurance(null);
    setSelectedPlan(null);
    setImageCredential('');
    setCode('');
    setCategory('');
  };

  const buildMedicalInsuranceRequest = () => {
    let response = {
      id: selectedmedicalInsurance.id,
    };
    if (selectedPlan) {
      response = {
        ...response,
        plan: {
          id: selectedPlan.id,
        },
      };
    }
    return response;
  };
  const handleError = (error) => {
    if (error.message) {
      showError(i18n.get(error.message));
    }
    showError('Hubo un error inesperado lo sentimos !');
  };
  const requestLink = async () => {
    try {
      let request = { medicalInsurance: buildMedicalInsuranceRequest() };
      if (isAffiliate) {
        request = {
          ...request,
          imageCredential,
          code,
          category,
        };
      }
      await LinksService.requestLink(request);
      cleanInputs();
      await fetchData();
      await refreshRequestsLinkups();
      showSuccess('Vinculación pedida con exito');
    } catch (error) {
      handleError(error);
    }
  };


  const cancelRequestLink = async (id) => {
    try {
      await LinksService.cancelRequestLink(id);
      fetchData();
      await refreshRequestsLinkups();
      showSuccess('Vinculación cancelada con exito');
    } catch (error) {
      handleError(error);
    }
  };

  const canRequestLink = selectedmedicalInsurance
    || (isAffiliate && selectedmedicalInsurance && selectedPlan && Boolean(imageCredential) && Boolean(code) && Boolean(category));

  const unlikMedicalInsurance = async (medicalInsurance) => {
    try {
      const request = {
        medicalInsurance: {
          id: medicalInsurance.id,
        },
      };
      await LinksService.unlink(request);
      showSuccess('Se desvinculo con exito de la obra social !');
      fetchData();
    } catch (error) {
      handleError(error);
    }
  };
  const hasMedicalInsurancesLinked = linkedMedicalInsurances.length > 0;
  return (
    <Container>

      <Paper style={{ padding: '2em', marginBottom: '1em' }}>
        <Typography variant="h5"> Obras sociales vinculadas</Typography>
        {hasMedicalInsurancesLinked ? linkedMedicalInsurances.map((medicalInsurance) => {
          const { description, corporateName, contactNumber, address, email } = medicalInsurance;
          return (
            <div style={{
              border: '1px solid #c7b3b3',
              marginBottom: '2em',
              marginTop: '0px',
              display: 'flex',
              borderRadius: '5px',
              padding: '1em',
              justifyContent: 'space-between',
            }}
            >
              <div>
                {description}
                (
                {corporateName}
                )
              </div>
              <div>{address}</div>
              <div>{contactNumber}</div>
              <div>{email}</div>

              <Button onClick={() => unlikMedicalInsurance(medicalInsurance)}> Desvincularse </Button>
            </div>
          );
        }) : <Typography>No tienes obras sociales vinculadas</Typography>}
      </Paper>
      <RequestLinkupsList
        title="Solicitudes para unirse a obras sociales"
        requests={requestsLinkups}
        onCancel={cancelRequestLink}
      />

      <Paper style={{ padding: '2em' }}>
        <div>Obras sociales disponibles</div>
        <div>
          <TextField fullWidth select label="Obra social" onChange={event => setSelectedMedicalInsurance(event.target.value)} value={selectedmedicalInsurance}>
            {medicalInsurances.map(medicalInsurance => (
              <MenuItem key={medicalInsurance.id} value={medicalInsurance}>
                {medicalInsurance.description}
              </MenuItem>
            ))}
          </TextField>

          {selectedmedicalInsurance && isAffiliate && (
            <TextField fullWidth select label="Plan" onChange={event => setSelectedPlan(event.target.value)} value={selectedPlan}>
              {getPlans().map(plan => (
                <MenuItem key={plan.id} value={plan}>
                  {plan.description}
                </MenuItem>
              ))}
            </TextField>
          )
          }
        </div>
        {isAffiliate && (
          <>
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

          </>
        )}


        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1em' }}>

          <Button variant="contained" color="primary" onClick={requestLink} disabled={!canRequestLink}>
            Solicitar
          </Button>
        </div>

      </Paper>


    </Container>
  );
};

export default withSnackbar(MedicalInsurancesPage);
