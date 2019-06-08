import React, { useEffect, useState } from 'react';
import PrescriptionService from '../../services/PrescriptionService';

const PrescriptionsPage = (props) => {
  const [prescription, setPrescription] = useState([]);

  useEffect(() => {
    console.log('go');
    PrescriptionService.getById(props.match.params.id).then((prescriptionData) => {
      setPrescription(prescriptionData);
    });
  }, []);
  return (
    <div>
      Soy la receta
      {prescription && prescription.id}
    </div>
  );
};

export default PrescriptionsPage;
