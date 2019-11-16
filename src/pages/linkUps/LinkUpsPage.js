import React, { useState } from 'react';
import useRequestsLinkups from '../../hooks/useRequestsLinkups';
import RequestLinkupsList from '../../components/RequestLinkupsList/RequestLinkupsList';
import ReasonDialog from '../../components/reasonDialog/ReasonDialog';
import LinksService from '../../services/LinksService';

export default () => {
  const [requestsLinkups, refreshRequestsLinkups] = useRequestsLinkups();
  const [openDialog, setOpenDialog] = useState(false);
  const [declineId, setDeclineId] = useState(null);
  const onDecline = async (reason) => {
    if (declineId) {
      try {
        await LinksService.declineRequestLink(declineId, reason);
        await refreshRequestsLinkups();
      } catch (e) {
        console.error('no se pudo declinar la solicitud', e);
      }
    }
  };
  const acceptRequestLinkup = async (id) => {
    try {
      await LinksService.acceptRequestLink(id, 'affiliate');
      await refreshRequestsLinkups();
    } catch (e) {
      console.error('no se pudo aceptar la solicitud', e);
    }
  };
  const openDeclineModal = (id) => {
    setOpenDialog(true);
    setDeclineId(id);
  };
  return (
    <div>
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
    </div>
  );
};
