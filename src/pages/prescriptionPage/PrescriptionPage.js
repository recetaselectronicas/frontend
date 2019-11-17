import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ConfirmCancelPrescriptionDialog from './components/confirmCancelPrescriptionDialog/ConfirmCancelPrescriptionDialog';
import FillDataItemDialog from './components/fillDataItemDialog/FillDataItemDialog';
import PrescriptionService from '../../services/PrescriptionService';
import UserService from '../../services/UserService'
import Prescription from './components/prescription/Prescription';
import ConfirmAuditDialog from './components/confirmAuditDialog/ConfirmAuditDialog';
import withSnackbar from '../../components/hocs/withSnackbar';
import AuthorizationProvider from '../../components/authorizationProvider/AuthorizationProvider';

const cancelModalInitialState = { open: false, reason: '' };
const fillItemModalInitialState = { open: false, items: [] };
const confirmAuditModalInitialState = { open: false };
const translations = {
  'prescription itemsQuantity must not be 0': 'Debe ingresar al menos un medicamento para recepcionar',
  'item received medicine drug must be equal to item precribed medicine drug.': 'Debe recepcionar items con la misma droga que el item recetado',
  'item received quantity must be lesser or equal to item precribed quantity.': 'La cantidad ingresada debe ser menor o igual a la cantidad recetada',
  'prescription status must be one of this CONFIRMED,PARTIALLY_RECEIVED': 'La receta se venció',
  'Prescription item audited quantity must be equal to item receive quantity': 'La cantidad de items auditados debe coincidir con la cantidad de items recepcionados',
  'item audited quantity must be equal to item received quantity.': 'La cantidad auditada debe ser igual a la recepcionada',
  'item audited medicine must be equal to item received medicine.': 'El medicamente auditado debe coincidir con el recepcionado',
};
const PrescriptionsPage = (props) => {
  const { location, showError, showSuccess } = props;
  const [prescription, setPrescription] = useState(null);
  const [actions, setActions] = useState([]);
  const [currentActionFlow, setCurrentAction] = useState('');
  const [cancelModal, setCancelModal] = useState(cancelModalInitialState);
  const [fillItemModal, setFillItemModal] = useState(fillItemModalInitialState);
  const [confirmAuditModal, setConfirmAuditModal] = useState(confirmAuditModalInitialState);
  const [receiveItems, setReceiveItems] = useState([]);
  const [auditedItems, setAuditedItems] = useState([]);
  const [actionErrors, setActionErrors] = useState([]);
  const [authorizationObject, setAuthorizationObject] = useState('');
  const [cancelReason, setCancelReason] = useState('');

  const getPrescription = () => {
    let prescriptionPromise;
    if (location.state && location.state.authorization) {
      prescriptionPromise = PrescriptionService.getById(props.match.params.id, {}, location.state.authorization);
    } else {
      prescriptionPromise = PrescriptionService.getById(props.match.params.id);
    }
    prescriptionPromise.then(({ result, actions: actionsResponse }) => {
      setPrescription(result);
      setActions(actionsResponse);
    }).catch(() => {
      props.history.push('/404');
    });
  };
  useEffect(getPrescription, []);

  const clearAll = async () => {
    setCurrentAction('');
    setReceiveItems([]);
    setAuditedItems([]);
    setActionErrors([]);
    await getPrescription();
  };

  const translateErrors = errors => errors.map(error => (translations[error.message] && { ...error, message: translations[error.message] }) || error);

  const handleReceiveError = (error) => {
    if (error && error.code === '1-101' && error.cause) {
      if (error.cause.length) {
        const validationErrors = [...new Set(error.cause.filter(cause => cause.code === '1-002').map(cause => cause.message))].filter(message => !!message).map(message => ({ message }));
        if (validationErrors.length) {
          setActionErrors(translateErrors(validationErrors));
          showError('Corrija los errores e intente nuevamente');
          return;
        }
      } else if (error.cause.code === '1-004') {
        setActionErrors(error.cause.message.map(message => ({ message })));
        showError('Corrija los errores e intente nuevamente');
        return;
      }
    }
    showError('Algo pasó. Revise los datos ingresados e intente nuevamente');
  };

  const handleAuditError = (error) => {
    handleReceiveError(error);
  };

  const actionsMapper = {
    CANCEL: {
      label: 'Cancelar',
      action: () => {
        setCancelModal({ ...cancelModal, open: true });
      },
      finishFlowAction: async () => {},
      type: 'secondary',
      fillDataConfirmHandler: () => {},
      getAuthorizationObject: authenticationType => ({
        authenticationType,
        authorizationType: 'cancel',
        data: { id: prescription.id },
        userType: 'doctor',
      }),
    },
    RECEIVE: {
      label: 'Recepcionar',
      action: () => { },
      type: 'primary',
      finishFlowAction: async () => {
        try {
          await PrescriptionService.checkReceive(prescription.id, { id: prescription.id, items: receiveItems });
          const defaultAuthentication = await UserService.getDefaultAuthenticationType();
          setAuthorizationObject(actionsMapper.RECEIVE.getAuthorizationObject(defaultAuthentication.default));
        } catch (e) {
          handleReceiveError(e);
        }
      },
      itemAction: {
        onClick: (id) => {
          setFillItemModal({ ...fillItemModal, open: true, id });
        },
        label: 'Recepcionar',
        isDisabled: (item) => {
          const receivedIds = receiveItems.map(receiveItem => receiveItem.id);
          return !!item.received.quantity || receivedIds.includes(item.id);
        },
      },
      fillDataConfirmHandler: (newItem) => {
        const newReceiveItems = [...receiveItems, newItem];
        setReceiveItems(newReceiveItems);
      },
      getAuthorizationObject: authenticationType => ({
        authenticationType,
        authorizationType: 'receive',
        data: { id: prescription.id, items: receiveItems },
        userType: 'pharmacist',
      }),
    },
    AUDIT: {
      label: 'Auditar',
      action: () => {},
      finishFlowAction: () => {
        setConfirmAuditModal({ ...confirmAuditModal, open: true });
      },
      type: 'primary',
      itemAction: {
        onClick: (id) => {
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
      showSuccess('Se audito la receta con exito');
      setConfirmAuditModal({ ...confirmAuditModal, open: false });
      await getPrescription();
      clearAll();
    } catch (e) {
      handleAuditError(e);
    }
  };

  const onFinishFlow = async () => {
    await actionsMapper[currentActionFlow].finishFlowAction();
  };

  const cancelPrescription = async (reason) => {
    setCancelReason(reason);
    try {
      await PrescriptionService.checkCancel(prescription.id, { reason });
      const defaultAuthentication = await UserService.getDefaultAuthenticationType();
      setAuthorizationObject(actionsMapper.CANCEL.getAuthorizationObject(defaultAuthentication.default));
    } catch (e) {
      showError('Hubo un error en la cancelacion');
      console.log('error', e);
    }
    clearAll();
  };

  const dispatchAction = (action) => {
    setCurrentAction(action);
    actionsMapper[action].action();
  };

  const successAuthorization = async (authorization) => {
    setAuthorizationObject('');
    console.log(currentActionFlow)
    if (currentActionFlow === 'RECEIVE') {
      try {
        await PrescriptionService.receive(prescription.id, { id: prescription.id, items: receiveItems }, location.state.authorization, authorization.authorization);
        showSuccess('Se Recepciono la receta con exito');
        await getPrescription();
        clearAll();
      } catch (e) {
        handleReceiveError(e);
      }
    } else {
      try {
        await PrescriptionService.cancel(prescription.id, { reason: cancelReason }, authorization.authorization);
        showSuccess('Su receta fue cancelada con exito');
        await getPrescription();
        clearAll();
      } catch (e) {
        showError('Hubo un error en la cancelacion');
        console.log('error', e);
      }
    }
  };

  const failureAuthorization = (err) => {
    showError('No fue posible recepcionar la receta');
    setAuthorizationObject('');
  };

  const areInFlow = ['AUDIT', 'RECEIVE'].includes(currentActionFlow);
  const actionButtonItems = areInFlow && actionsMapper[currentActionFlow].itemAction;
  return (
    <React.Fragment>
      {authorizationObject && (
        <AuthorizationProvider
          authenticationType={authorizationObject.authenticationType}
          authorizationType={authorizationObject.authorizationType}
          data={authorizationObject.data}
          userType={authorizationObject.userType}
          onConfirm={successAuthorization}
          onCancel={failureAuthorization}
        />
      )}
      <Grid container className="page">
        {prescription && (
          <>
            <Grid item xs={10}>
              <Prescription
                {...prescription}
                actionButtonItems={actionButtonItems}
                currentActionFlow={currentActionFlow}
                actionErrors={actionErrors}
              />
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
                      key={id}
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
          </>
        )}
      </Grid>
      <ConfirmCancelPrescriptionDialog open={cancelModal.open} handleClose={() => setCancelModal(cancelModalInitialState)} onConfirm={cancelPrescription} />
      <FillDataItemDialog open={fillItemModal.open} id={fillItemModal.id} handleClose={() => setFillItemModal(fillItemModalInitialState)} onConfirm={fillDataConfirmHandler} />
      <ConfirmAuditDialog open={confirmAuditModal.open} handleClose={() => setConfirmAuditModal(confirmAuditModalInitialState)} items={auditedItems} onConfirm={auditPrescription} />
    </React.Fragment>
  );
};

export default withSnackbar(PrescriptionsPage);
