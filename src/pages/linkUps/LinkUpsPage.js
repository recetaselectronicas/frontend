import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import useRequestsLinkups from '../../hooks/useRequestsLinkups';
import RequestLinkupsList from '../../components/RequestLinkupsList/RequestLinkupsList';
import ReasonDialog from '../../components/reasonDialog/ReasonDialog';
import LinksService from '../../services/LinksService';
import withSnackbar from '../../components/hocs/withSnackbar';

const LinkUpsPage = ({ showSuccess, showError }) => {
  const [requestsLinkups, refreshRequestsLinkups] = useRequestsLinkups();
  const [openDialog, setOpenDialog] = useState(false);
  const [declineData, setDeclineData] = useState({});
  const onDecline = async (reason) => {
    if (declineData) {
      try {
        await LinksService.declineRequestLink(declineData.id, declineData.type, reason);
        await refreshRequestsLinkups();
        showSuccess('La vinculación fue declinada con exito');
      } catch (e) {
        // TODO : preguntar que errores de negocio existen
        showError('No se pudo declinar la vinculación');
      }
    }
  };
  const acceptRequestLinkup = type => async (id) => {
    try {
      await LinksService.acceptRequestLink(id, type);
      await refreshRequestsLinkups();
      showSuccess('La vinculación fue aceptada con exito');
    } catch (e) {
      // TODO : preguntar que errores de negocio existen
      showError('No se pudo aceptar la vinculación');
    }
  };
  const openDeclineModal = type => (id) => {
    setOpenDialog(true);
    setDeclineData({ id, type });
  };
  return (
    <Container className="page">
      <RequestLinkupsList
        title="Solicitudes de pacientes"
        requests={requestsLinkups.affiliateRequests}
        isMedicalInsurance
        onDecline={openDeclineModal('affiliate')}
        onAccept={acceptRequestLinkup('affiliate')}
      />
      <RequestLinkupsList
        title="Solicitudes de doctores"
        requests={requestsLinkups.doctorRequests}
        isMedicalInsurance
        onDecline={openDeclineModal('doctor')}
        onAccept={acceptRequestLinkup('doctor')}
      />
      <RequestLinkupsList
        title="Solicitudes de farmaceuticos"
        requests={requestsLinkups.pharmacistRequests}
        isMedicalInsurance
        onDecline={openDeclineModal('pharmacist')}
        onAccept={acceptRequestLinkup('pharmacist')}
      />

      <ReasonDialog
        open={openDialog}
        title={`¿ Esta seguro que quiere declinar la solicitud ${declineData.id}?`}
        handleClose={() => setOpenDialog(false)}
        onConfirm={onDecline}
      />
    </Container>
  );
};

export default withSnackbar(LinkUpsPage);
