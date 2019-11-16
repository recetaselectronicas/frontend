import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import LinksService from '../../services/LinksService';
import MedicalInsuranceService from '../../services/MedicalInsuranceService';
import ImageSelector from '../../components/imageSelector/imageSelector';
import RequestLinkupsList from '../../components/RequestLinkupsList/RequestLinkupsList';
import useRequestsLinkups from '../../hooks/useRequestsLinkups';

export default () => {
  const [requestsLinkups, refreshRequestsLinkups] = useRequestsLinkups();
  const [medicalInsurances, setMedicalInsurances] = useState([]);
  const [selectedmedicalInsurance, setSelectedMedicalInsurance] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [imageCredential, setImageCredential] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('');

  async function fetchData() {
    try {
      const dataMedicalInsurance = await MedicalInsuranceService.getAll();
      setMedicalInsurances(dataMedicalInsurance);
    } catch (error) {
      console.error('error fetching data', error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const getPlans = () => selectedmedicalInsurance.plans || [];

  const requestLink = async () => {
    try {
      await LinksService.requestLink({
        imageCredential,
        code,
        category,
        medicalInsurance: {
          id: selectedmedicalInsurance.id,
          plan: {
            id: selectedPlan.id,
          },
        },
      });
      setSelectedMedicalInsurance(null);
      setSelectedPlan(null);
      setImageCredential('');
      setCode('');
      setCategory('');
      fetchData();
      refreshRequestsLinkups();
    } catch (error) {
      console.error('error al querer soliticitar', error);
    }
  };

  const cancelRequestLink = async (id) => {
    try {
      await LinksService.cancelRequestLink(id);
      fetchData();
    } catch (error) {
      console.error('error al querer soliticitar', error);
    }
  };

  const canRequestLink = selectedmedicalInsurance && selectedPlan && Boolean(imageCredential) && Boolean(code) && Boolean(category);
  return (
    <div>

      <RequestLinkupsList requests={requestsLinkups} onCancel={cancelRequestLink} />

      <Paper>
        <div>Obras sociales disponibles</div>
        <div>
          <TextField fullWidth select label="Obra social" onChange={event => setSelectedMedicalInsurance(event.target.value)} value={selectedmedicalInsurance}>
            {medicalInsurances.map(medicalInsurance => (
              <MenuItem key={medicalInsurance.id} value={medicalInsurance}>
                {medicalInsurance.description}
              </MenuItem>
            ))}
          </TextField>

          {selectedmedicalInsurance && (
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

        <div>
          <ImageSelector
            photo={imageCredential}
            label="Sacale una foto al carnet"
            placeholder="Foto Carnet.jpg"
            onSelect={value => setImageCredential(value)}
            onUnSelect={() => setImageCredential('')}
          />

        </div>
        <div>
          <TextField fullWidth label="Codigo" onChange={event => setCode(event.target.value)} value={code} />
        </div>
        <div>
          <TextField fullWidth label="Categoria" onChange={event => setCategory(event.target.value)} value={category} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

          <Button variant="contained" color="primary" onClick={requestLink} disabled={!canRequestLink}>
            Soliticitar
          </Button>
        </div>

      </Paper>


    </div>
  );
};
