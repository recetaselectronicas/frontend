

import React from 'react';
import { Paper, Button } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Shower } from '../shower/Shower';

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
          {
            requests.map(
              ({
                imageCredential,
                status,
                code,
                category,
                dateCreated,
                reason,
                corporateName,
                name,
                lastName,
                nicNumber,
                contactNumber,
                email,
                matriculation,
                nationalMatriculation,
                idRequest
              }) => {
                const medicalIsuranceData = isMedicalInsurance && (
                  <>
                    {Boolean(name) && Boolean(lastName) &&
                      (
                        <div>
                          Nombre: {name}, {lastName}
                        </div>
                      )
                    }
                    <Shower label="Numero de documento" attribute={nicNumber} />
                    <Shower label="Numero de contacto" attribute={contactNumber} />
                    <Shower label="Email" attribute={email} />
                    <Shower label="Matricula" attribute={matriculation} />
                    <Shower label="Matricula nacional" attribute={nationalMatriculation} />

                  </>)

                return <div key={idRequest} style={{
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
                    {Boolean(imageCredential) && (
                      <div style={{ minWidth: '100px', marginRight: '2em' }}>
                        <img width={100} src={imageCredential} alt="Foto de la credencial" />
                      </div>
                    )}

                    <div>
                      <Shower label="Id" attribute={idRequest} />
                      <Shower label="Estado" attribute={statusLang[status]} />
                      {!isMedicalInsurance && <Shower label="Obra social" attribute={corporateName} />}
                      {medicalIsuranceData}
                      <Shower label="Codigo" attribute={code} />
                      <Shower label="Categoria" attribute={category} />
                      <Shower label="Motivo" attribute={reason} />
                      {dateCreated}
                    </div>
                  </div>

                  <div>
                    {couldAccept(status) && onAccept && (
                      <Button onClick={() => onAccept(idRequest)}>
                        Aceptar
                    </Button>)}
                    {couldCancel(status) && onCancel && (
                      <Button onClick={() => onCancel(idRequest)}>
                        CANCELAR
                      </Button>)}
                    {couldDecline(status) && onDecline && (
                      <Button onClick={() => onDecline(idRequest)}>
                        DECLINAR
                       </Button>)}
                  </div>
                </div>
              })}


        </ExpansionPanelDetails>
      </ExpansionPanel>

    </Paper>
  );
};
