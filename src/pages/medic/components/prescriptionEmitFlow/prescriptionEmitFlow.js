import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import AuthorizationProvider from '../../../../components/authorizationProvider/AuthorizationProvider';
import PrescriptionService from '../../../../services/PrescriptionService';
import UserService from '../../../../services/UserService';
import AffiliateService from '../../../../services/AffilateService';

const steps = {
  preparing: 0,
  doctorAuthentication: 1,
  affiliateAuthentication: 2,
  createPrescription: 3,
};

export default function PrescriptionEmitFlow(props) {
  const { onSuccess, onFailure, prescription, affiliate } = props;
  const [authorization, setAuthorization] = useState('');
  const [verification, setVerification] = useState('');
  const [doctorAuthenticationType, setDoctorAuthenticationType] = useState('');
  const [affiliateAuthenticationType, setAffiliateAuthenticationType] = useState('');
  const [step, setStep] = useState(steps.preparing);

  useEffect(() => {
    const doctorAuth = UserService.getDefaultAuthenticationType()
      .then((data) => {
        setDoctorAuthenticationType(data.default);
      });
    const affiliateAuth = AffiliateService.getDefaultAuthenticationType(affiliate.id)
      .then((data) => {
        setAffiliateAuthenticationType(data.default);
      });
    Promise.all([doctorAuth, affiliateAuth])
      .then(() => {
        setStep(steps.doctorAuthentication);
      })
      .catch((err) => {
        onFailure(err);
      });
  }, [affiliate.id, onFailure]);

  useEffect(() => {
    if (step === steps.createPrescription) {
      setTimeout(async () => {
        try {
          const createdPrescription = await PrescriptionService.create(prescription, authorization, verification);
          onSuccess(createdPrescription);
        } catch (error) {
          onFailure(error);
        }
      }, 1000);
    }
  }, [step, prescription, authorization, verification, onFailure, onSuccess]);

  const onDoctorSuccess = (data) => {
    setVerification(data.authorization);
    setStep(steps.affiliateAuthentication);
  };

  const onAffiliateSuccess = (data) => {
    setAuthorization(data.authorization);
    setStep(steps.createPrescription);
  };

  const onCancel = () => {
    onFailure();
  };

  return (
    <>
      {step === steps.doctorAuthentication && (
        <AuthorizationProvider authenticationType={doctorAuthenticationType} authorizationType="issue" userType="doctor" onConfirm={onDoctorSuccess} onCancel={onCancel} data={prescription} />
      )}
      {step === steps.affiliateAuthentication && (
        <AuthorizationProvider authenticationType={affiliateAuthenticationType} authorizationType="authorize_issue" userType="affiliate" onConfirm={onAffiliateSuccess} onCancel={onCancel} data={prescription} />
      )}
      {step === steps.createPrescription && (
        <Dialog open>
          <CircularProgress size={80} style={{ margin: '50px' }} />
        </Dialog>
      )}
    </>
  );
}

PrescriptionEmitFlow.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  prescription: PropTypes.shape({}).isRequired,
  affiliate: PropTypes.shape({ id: PropTypes.number }).isRequired,
};
