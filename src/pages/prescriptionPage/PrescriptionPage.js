import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SnackbarWrapper from '../../components/snackbarWrapper/SnackbarWrapper';
import ConfirmCancelPrescriptionDialog from './components/confirmCancelPrescriptionDialog/ConfirmCancelPrescriptionDialog';
import FillDataItemDialog from './components/fillDataItemDialog/FillDataItemDialog';
import PrescriptionService from '../../services/PrescriptionService';
import Prescription from './components/prescription/Prescription';
import ConfirmAuditDialog from './components/confirmAuditDialog/ConfirmAuditDialog';

const cancelModalInitialState = { open: false, reason: '' };
const fillItemModalInitialState = { open: false, items: [] };
const confirmAuditModalInitialState = { open: false };
const snackbarInitialState = { open: false, variant: 'error', message: '' };
const PrescriptionsPage = (props) => {
  const [prescription, setPrescription] = useState(null);
  const [actions, setActions] = useState([]);
  const [currentActionFlow, setCurrentAction] = useState('');
  const [cancelModal, setCancelModal] = useState(cancelModalInitialState);
  const [fillItemModal, setFillItemModal] = useState(fillItemModalInitialState);
  const [confirmAuditModal, setConfirmAuditModal] = useState(confirmAuditModalInitialState);
  const [receiveItems, setReceiveItems] = useState([]);
  const [auditedItems, setAuditedItems] = useState([]);
  const [snackbar, setSnackbar] = useState(snackbarInitialState);
  const getPrescription = () => {
    PrescriptionService.getById(props.match.params.id).then(({ result, actions: actionsResponse }) => {
      setPrescription(result);
      setActions(actionsResponse);
    });
  };
  useEffect(getPrescription, []);

  const clearAll = async () => {
    setCurrentAction('');
    setReceiveItems([]);
    setAuditedItems([]);
    await getPrescription();
  };
  const actionsMapper = {
    CANCEL: {
      label: 'Cancelar',
      action: () => {
        setCancelModal({ ...cancelModal, open: true });
      },
      finishFlowAction: () => {},
      type: 'secondary',
      fillDataConfirmHandler: () => {},
    },
    RECEIVE: {
      label: 'Recepcionar',
      action: () => {
        console.log('go to recepcionar');
      },
      type: 'primary',
      finishFlowAction: async () => {
        try {
          await PrescriptionService.receive(prescription.id, { items: receiveItems });
          setSnackbar({
            open: true,
            message: 'Se Recepciono la receta con exito',
            variant: 'success',
          });
          await getPrescription();
          clearAll();
        } catch (e) {
          setSnackbar({
            open: true,
            message: 'Hubo un error en la recepcion',
            variant: 'error',
          });
          console.log('error', e);
        }
      },
      itemAction: {
        onClick: (id) => {
          console.log('el id es', id);
          setFillItemModal({ ...fillItemModal, open: true, id });
        },
        label: 'Recepcionar',
        isDisabled: (item) => {
          const receivedIds = receiveItems.map(receiveItem => receiveItem.id);
          console.log('wtf', item, receivedIds, receiveItems);
          return !!item.received.quantity || receivedIds.includes(item.id);
        },
      },
      fillDataConfirmHandler: (newItem) => {
        const newReceiveItems = [...receiveItems, newItem];
        setReceiveItems(newReceiveItems);
      },
    },
    AUDIT: {
      label: 'Auditar',
      action: () => {
        console.log('auditar');
      },
      finishFlowAction: () => {
        setConfirmAuditModal({ ...confirmAuditModal, open: true });
      },
      type: 'primary',
      itemAction: {
        onClick: (id) => {
          console.log('el id ', id);
          setFillItemModal({ ...fillItemModal, open: true, id });
        },
        label: 'Auditar',
        isDisabled: (item) => {
          const auditedIds = auditedItems.map(auditedItem => auditedItem.id);
          return !!item.audited.quantity || auditedIds.includes(item.id);
        },
      },
      fillDataConfirmHandler: (newItem) => {
        const newAuditedItems = [...auditedItems, newItem];
        setAuditedItems(newAuditedItems);
      },
    },
  };

  const fillDataConfirmHandler = (newItem) => {
    actionsMapper[currentActionFlow].fillDataConfirmHandler(newItem);
    setFillItemModal({ ...fillItemModal, open: false });
  };
  const auditPrescription = async () => {
    try {
      await PrescriptionService.audit(prescription.id, { items: auditedItems });
      setSnackbar({
        open: true,
        message: 'Se audito la receta con exito',
        variant: 'success',
      });
      setConfirmAuditModal({ ...confirmAuditModal, open: false });
      await getPrescription();
      clearAll();
    } catch (e) {
      setSnackbar({
        open: true,
        message: 'Hubo un error en la auditoria',
        variant: 'error',
      });
      console.log('error', e);
    }
  };
  const onFinishFlow = async () => {
    await actionsMapper[currentActionFlow].finishFlowAction();
  };

  const cancelPrescription = async (reason) => {
    try {
      await PrescriptionService.cancel(prescription.id, { reason });
      setSnackbar({
        open: true,
        message: 'Su receta fue cancelada con exito',
        variant: 'success',
      });
    } catch (e) {
      setSnackbar({
        open: true,
        message: 'Hubo un error en la cancelacion',
        variant: 'error',
      });
      console.log('error', e);
    }
    clearAll();
  };
  const handleCloseSnackbar = () => {
    setSnackbar(snackbarInitialState);
  };
  const dispatchAction = (action) => {
    setCurrentAction(action);
    actionsMapper[action].action();
  };
  const areInFlow = ['AUDIT', 'RECEIVE'].includes(currentActionFlow);
  const actionButtonItems = areInFlow && actionsMapper[currentActionFlow].itemAction;
  return (
    <React.Fragment>
      <Grid container className="page">
        <Grid item xs={10}>
          {prescription && (
            <Prescription
              {...prescription}
              actionButtonItems={actionButtonItems}
              currentActionFlow={currentActionFlow}
            />
          )}
        </Grid>
        <Grid item xs={2}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              {actions.map(({ id, disabled }) => (
                <Button
                  style={{ marginBottom: '12px' }}
                  variant="contained"
                  disabled={areInFlow || disabled}
                  color={actionsMapper[id].type}
                  className={`action-recipe__button ${id}`}
                  onClick={() => dispatchAction(id)}
                >
                  {actionsMapper[id].label}
                </Button>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginBottom: '15px',
              }}
            >
              {areInFlow && (
                <React.Fragment>
                  <Button variant="contained" onClick={onFinishFlow} style={{ flexBasis: '45%' }}>
                    Aceptar
                  </Button>
                  <Button variant="contained" onClick={clearAll} style={{ flexBasis: '45%' }}>
                    Cancelar
                  </Button>
                </React.Fragment>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
      <ConfirmCancelPrescriptionDialog
        open={cancelModal.open}
        handleClose={() => {
          setCancelModal(cancelModalInitialState);
        }}
        onConfirm={cancelPrescription}
      />
      <FillDataItemDialog
        open={fillItemModal.open}
        id={fillItemModal.id}
        handleClose={() => {
          setFillItemModal(fillItemModalInitialState);
        }}
        onConfirm={fillDataConfirmHandler}
      />
      <ConfirmAuditDialog
        open={confirmAuditModal.open}
        handleClose={() => {
          setConfirmAuditModal(confirmAuditModalInitialState);
        }}
        items={auditedItems}
        onConfirm={auditPrescription}
      />
      <SnackbarWrapper
        vertical="bottom"
        horizontal="center"
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        variant={snackbar.variant}
        message={snackbar.message}
      />
    </React.Fragment>
  );
};

export default PrescriptionsPage;
