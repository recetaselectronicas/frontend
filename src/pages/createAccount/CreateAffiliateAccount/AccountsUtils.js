
export const availableGenders = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
];

export const availableNationalities = [
  { value: 'ARGENTINA', label: 'Argentina' },
  { value: 'VENEZUELA', label: 'Venezuela' },
  { value: 'COLOMBIA', label: 'Colombia' },
  { value: 'PERU', label: 'Peru' },
  { value: 'CHILE', label: 'Chile' },
  { value: 'URUGUAY', label: 'Uruguay' },
  { value: 'BRASIL', label: 'Brasil' },
];

export const availableNicTypes = [
  { value: 'DNI', label: 'DNI' },
  { value: 'LC', label: 'LC' },
  { value: 'LE', label: 'LE' },
];

const getValidatedFieldDefault = (field) => {
  const newField = { ...field };
  newField.error = newField.required && !newField.value ? 'Campo requerido' : '';
  return newField;
};

const getValidatedDateFieldDefault = (field) => {
  const newField = { ...field };
  newField.error = newField.required && !newField.value ? 'Campo requerido' : '';
  // eslint-disable-next-line no-restricted-globals
  if (!newField.error) newField.error = !(newField.value instanceof Date) || isNaN(newField.value.getTime()) ? 'Fecha inválida' : '';
  return newField;
};

export const getNewFieldData = (fieldName, value = '', required = true, error = '', getValidatedField = getValidatedFieldDefault) => ({ fieldName, value, required, error, getValidatedField });

export const getEmptyAffiliateData = () => ({
  name: getNewFieldData('name'),
  surName: getNewFieldData('surName'),
  userName: getNewFieldData('userName'),
  password: getNewFieldData('password'),
  birthDate: getNewFieldData('birthDate', null, true, '', getValidatedDateFieldDefault),
  gender: getNewFieldData('gender'),
  contactNumber: getNewFieldData('contactNumber'),
  email: getNewFieldData('email'),
  address: getNewFieldData('address'),
  nationality: getNewFieldData('nationality'),
  nicNumber: getNewFieldData('nicNumber'),
  nicType: getNewFieldData('nicType'),
  nicPhoto: getNewFieldData('nicPhoto', '', false),
});

export const getAffiliateData = () => ({
  name: getNewFieldData('name', 'Leandro'),
  surName: getNewFieldData('surName', 'Devoto'),
  userName: getNewFieldData('userName', 'ldevoto'),
  password: getNewFieldData('password', '1234'),
  birthDate: getNewFieldData('birthDate', new Date(), true, '', getValidatedDateFieldDefault),
  gender: getNewFieldData('gender', 'M'),
  contactNumber: getNewFieldData('contactNumber', '123123'),
  email: getNewFieldData('email', 'ldevotox@gmail.com'),
  address: getNewFieldData('address', 'Llavallol 3655'),
  nationality: getNewFieldData('nationality', 'ARGENTINA'),
  nicNumber: getNewFieldData('nicNumber', '37277876'),
  nicType: getNewFieldData('nicType', 'DNI'),
  nicPhoto: getNewFieldData('nicPhoto', '', false),
});

export const hasError = accountData => Object.keys(accountData).some(key => accountData[key].error);

export const calculateErrors = accountData => Object.keys(accountData).reduce((newAccountData, key) => {
  // eslint-disable-next-line no-param-reassign
  newAccountData[key] = accountData[key].getValidatedField(accountData[key]);
  return newAccountData;
}, {});

export const getAffiliatePayload = (accountData) => {
  const { name, surName, userName, password, birthDate, gender, contactNumber, email, address, nationality, nicNumber, nicType, nicPhoto } = accountData;
  return {
    name: name.value,
    surname: surName.value,
    userName: userName.value,
    password: password.value,
    birthDate: birthDate.value,
    gender: gender.value,
    contactNumber: contactNumber.value,
    email: email.value,
    address: address.value,
    nationality: nationality.value,
    nicNumber: nicNumber.value,
    nicType: nicType.value,
    nicPhoto: nicPhoto.value,
  };
};

export const parseAffiliateResponseError = (accountData, response) => {
  const newAccountData = { ...accountData };
  if (response.type !== 'UNIFY') return false;
  if (response.code === '1-000') {
    if (response.cause.field === newAccountData.userName.fieldName) {
      newAccountData.userName.error = 'Usuario en uso';
      return newAccountData;
    }
  }
  if (response.code === '1-101') {
    if (response.cause && response.cause.length) {
      response.cause.forEach((cause) => {
        newAccountData[cause.cause.field].error = cause.message;
      });
      return newAccountData;
    }
  }
  return false;
};