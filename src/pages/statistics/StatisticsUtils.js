export const getStatisticTraduction = (statisticKey) => {
  const traductions = {
    prescriptionId: 'Id Receta',
    itemId: 'Id Item',
    prescriptionIssuedDate: 'Fecha Emisión',
    itemSoldDate: 'Fecha Venta',
    prescriptionAuditedDate: 'Fecha Auditado',
    affiliateCredential: 'Credencial Afiliado',
    patientName: 'Nombre Afiliado',
    doctorNationalMatriculation: 'Matrícula Nacional Médico',
    doctorName: 'Nombre Médico',
    pharmacistMatriculation: 'Matrícula Farmacéutico',
    pharmacistName: 'Nombre Farmacéutico',
    itemPrescribedQuantity: 'Cantidad Prescripta',
    itemReceivedQuantity: 'Cantidad Recepcionada',
    itemAuditedQuantity: 'Cantidad Auditada',
    medicinePrescribedPrice: 'Precio Prescripto',
    medicinePrescribedDescription: 'Medicamento Prescripto',
    medicineReceiveddPrice: 'Precio Recepcionado',
    medicineReceivedDescription: 'Medicamento Recepcionado',
    medicineAuditedPrice: 'Precio Auditado',
    medicineAuditedDescription: 'Medicamento Auditado',
    prescriptionStatus: 'Estado',
    prescriptionNorm: 'Norma',
  };
  return traductions[statisticKey] || statisticKey;
};

export const getStatusTraduction = (statusKey) => {
  const statuses = {
    ISSUED: 'Emitida',
    CANCELLED: 'Cancelada',
    CONFIRMED: 'Confirmada',
    EXPIRED: 'Vencida',
    RECEIVED: 'Recepcionada',
    PARTIALLY_RECEIVED: 'Parcialmente Recepcionada',
    INCOMPLETE: 'Incompleta',
    AUDITED: 'Auditada',
    REJECTED: 'Rechazada',
    PARTIALLY_REJECTED: 'Parcialmente Rechazada',
  };
  return statuses[statusKey] || statusKey;
};

export const createCell = (key, visible = true) => ({
  key, value: getStatisticTraduction(key), visible,
});

export const rows = [
  createCell('prescriptionId'),
  createCell('itemId'),
  createCell('prescriptionIssuedDate'),
  createCell('itemSoldDate'),
  createCell('prescriptionAuditedDate'),
  createCell('affiliateCredential'),
  createCell('patientName'),
  createCell('doctorNationalMatriculation'),
  createCell('doctorName'),
  createCell('pharmacistMatriculation'),
  createCell('pharmacistName'),
  createCell('itemPrescribedQuantity'),
  createCell('itemReceivedQuantity'),
  createCell('itemAuditedQuantity'),
  createCell('medicinePrescribedPrice'),
  createCell('medicinePrescribedDescription'),
  createCell('medicineReceiveddPrice'),
  createCell('medicineReceivedDescription'),
  createCell('medicineAuditedPrice'),
  createCell('medicineAuditedDescription'),
  createCell('prescriptionStatus'),
  createCell('prescriptionNorm'),
];

export const getNewDebouncer = (func) => {
  let timer = null;
  const debounceFunction = func;
  const defaultMs = 250;

  const clearPendingDebounce = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const debounce = (a, b, ms = defaultMs) => {
    clearPendingDebounce();
    timer = setTimeout(() => {
      debounceFunction(a, b);
    }, ms);
  };

  return {
    execute: (a, b, ms) => {
      clearPendingDebounce();
      debounce(a, b, ms);
    },
    clearPendingDebounce,
  };
};
