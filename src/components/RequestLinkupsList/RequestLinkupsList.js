

import React from 'react';
import { Paper } from '@material-ui/core';

const statusLang = {
  CANCELLED: 'Cancelada',
  PENDING: 'Pendiente',
};

export default ({ requests = [], onCancel = false, onDecline = false, isMedicalInsurance = false }) => {
  const couldCancel = status => status !== 'CANCELLED' && !isMedicalInsurance;
  const couldDecline = status => status === 'PENDING' && isMedicalInsurance;

  return (
    <Paper>
      <div>Solicitudes</div>
      <div>
        {requests.map(request => (
          <div>
fecha :
            {' '}
            {request.dateCreated}
codigo :
            {' '}
            {request.code}
categoria:
            {' '}
            {request.category}
estado :
            {' '}
            {statusLang[request.status]}

          imagen :
            {' '}
            <img width={80} src={request.imageCredential} />
            {couldCancel(request.status) && onCancel && (
              <div onClick={() => onCancel(request.id)}>
            CANCELAR
              </div>
            )}
            { couldDecline(request.status) && onDecline && (
            <div onClick={() => onDecline(request.id)}>
            DECLINAR
            </div>
            )
          }

          </div>
        ))}
      </div>
    </Paper>
  );
};
