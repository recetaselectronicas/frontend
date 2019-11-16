

import React from 'react';
import { Paper, Button } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const PENDING = 'PENDING';
const isPending = status => status === 'PENDING';
const statusLang = {
  CANCELLED: 'Cancelada',
  [PENDING]: 'Pendiente',
  DECLINED: 'Declinada',
  ACCEPTED: 'Aceptada',
};

export default ({
  requests = [],
  onCancel = false,
  onDecline = false,
  isMedicalInsurance = false,
  onAccept = false,
  title,
}) => {
  const couldCancel = status => isPending(status) && !isMedicalInsurance;
  const couldDecline = status => isPending(status) && isMedicalInsurance;
  const couldAccept = status => isPending(status) && isMedicalInsurance;

  return (
    <Paper style={{ marginBottom: '2em' }}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ display: 'initial' }}>
          {requests.map(request => (
            <div style={{
              border: '1px solid #c7b3b3',
              margin: '2em',
              marginTop: '0px',
              display: 'flex',
              borderRadius: '5px',
              padding: '1em',
              justifyContent: 'space-between',
            }}
            >
              <div style={{ display: 'flex' }}>
                <div style={{ minWidth: '100px', marginRight: '2em' }}>
                  <img width={100} src={request.imageCredential} />

                </div>
                <div>
                  {statusLang[request.status]}


                  <br />
                  Codigo :
                  {request.code}
                  <br />
                  Categoria:
                  {request.category}
                  <br />
                  {request.dateCreated}
                  {Boolean(request.reason) && (
                    <div>
                      Motivo :
                      {' '}
                      {request.reason}
                    </div>
                  )}
                </div>
              </div>

              <div>
                {couldAccept(request.status) && onAccept && (
                  <Button onClick={() => onAccept(request.id)}>
                    Aceptar
                  </Button>
                )}
                {couldCancel(request.status) && onCancel && (
                  <Button onClick={() => onCancel(request.id)}>
                    CANCELAR
                  </Button>
                )}
                {couldDecline(request.status) && onDecline && (
                  <Button onClick={() => onDecline(request.id)}>
                    DECLINAR
                  </Button>
                )}
              </div>


            </div>
          ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <div />

    </Paper>
  );
};
