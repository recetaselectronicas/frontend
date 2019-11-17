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
  const [declineId, setDeclineId] = useState(null);
  const onDecline = async (reason) => {
    if (declineId) {
      try {
        await LinksService.declineRequestLink(declineId, reason);
        await refreshRequestsLinkups();
        showSuccess('La vinculación fue declinada con exito');
      } catch (e) {
        // TODO : preguntar que errores de negocio existen
        showError('No se pudo declinar la vinculación');
      }
    }
  };
  const acceptRequestLinkup = async (id) => {
    try {
      await LinksService.acceptRequestLink(id, 'affiliate');
      await refreshRequestsLinkups();
      showSuccess('La vinculación fue aceptada con exito');
    } catch (e) {
      // TODO : preguntar que errores de negocio existen
      showError('No se pudo aceptar la vinculación');
    }
  };
  const openDeclineModal = (id) => {
    setOpenDialog(true);
    setDeclineId(id);
  };
  return (
    <Container>
      <RequestLinkupsList
        title="Solicitudes de afiliamiento"
        requests={requestsLinkups.affiliateRequests}
        isMedicalInsurance
        onDecline={openDeclineModal}
        onAccept={acceptRequestLinkup}
      />
      <ReasonDialog
        open={openDialog}
        title={`¿ Esta seguro que quiere declinar la solicitud ${declineId}?`}
        handleClose={() => setOpenDialog(false)}
        onConfirm={onDecline}
      />
    </Container>
  );
};

export default withSnackbar(LinkUpsPage);
