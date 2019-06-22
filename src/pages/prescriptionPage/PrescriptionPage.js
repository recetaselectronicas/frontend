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
  const [receiveItems, setReceiveItems] = useState({ items: [] });
  const [auditedItems, setAuditedItems] = useState({ items: [] });
  const [snackbar, setSnackbar] = useState(snackbarInitialState);
  useEffect(() => {
    PrescriptionService.getById(props.match.params.id).then(({ result, actions: actionsResponse }) => {
      setPrescription(result);
      setActions(actionsResponse);
    });
  }, []);
  const onCancelFlow = () => {
    setCurrentAction('');
  };
  const actionsMapper = {
    CANCEL: {
      label: 'Cancelar',
      action: () => {
        setCancelModal({ ...cancelModal, open: true });
      },
      finishFlowAction: () => {},
      type: 'secondary',
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
          setFillItemModal({ ...fillItemModal, open: true, id });
        },
        label: 'Auditar',
      },
    },
    RECEIVE: {
      label: 'Recepcionar',
      action: () => {
        console.log('go to recepcionar');
      },
      type: 'primary',
      finishFlowAction: async () => {
        console.log('go to recepcionar');
        try {
          await PrescriptionService.receive(prescription.id, receiveItems);
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
      },
    },
  };
  const fillDataConfirmHandler = (data) => {
    if (currentActionFlow === 'RECEIVE') {
      const newReceiveItems = { ...receiveItems };
      newReceiveItems.items.push(data);
      setReceiveItems(newReceiveItems);
    } else {
      const newAuditedItems = { ...auditedItems };
      newAuditedItems.items.push(data);
      setAuditedItems(newAuditedItems);
    }
    setFillItemModal({ ...fillItemModal, open: false });
  };
  const auditPrescription = async () => {
    try {
      await PrescriptionService.audit(prescription.id, auditedItems);
    } catch (e) {
      setSnackbar({
        open: true,
        message: 'Hubo un error en la auditoria',
        variant: 'error',
      });
      console.log('error', e);
    }
    onCancelFlow();
  };
  const onFinishFlow = async () => {
    await actionsMapper[currentActionFlow].finishFlowAction();
    onCancelFlow();
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
    onCancelFlow();
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
      <Grid container>
        <Grid item xs={10}>
          {prescription && <Prescription {...prescription} actionButtonItems={actionButtonItems} />}
        </Grid>
        <Grid item xs={2}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {actions.map(({ id }) => (
              <Button
                style={{ marginBottom: '12px' }}
                variant="contained"
                disabled={areInFlow}
                color={actionsMapper[id].type}
                className={`action-recipe__button ${id}`}
                onClick={() => dispatchAction(id)}
              >
                {actionsMapper[id].label}
              </Button>
            ))}
          </div>

          <div>
            {areInFlow && (
              <div>
                <Button variant="contained" onClick={onFinishFlow}>
                  Aceptar
                </Button>
                <Button variant="contained" onClick={onCancelFlow}>
                  Cancelar
                </Button>
              </div>
            )}
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
        items={auditedItems.items}
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
