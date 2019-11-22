
export const getCheckedField = (field, value) => {
  const newField = { ...field };
  newField.value = value;
  newField.error = newField.required && !value ? 'Campo obligatorio' : '';
  return newField;
};

export const getCheckedDateField = (field, value) => {
  const newField = getCheckedField(field, value);
  // eslint-disable-next-line no-restricted-globals
  if (!newField.error) newField.error = !(newField.value instanceof Date) || isNaN(newField.value.getTime()) ? 'Fecha inválida' : '';
  return newField;
};

export const getValidatedProfileData = (profile) => {
  const newProfile = { ...profile };
  Object.keys(profile).forEach((key) => {
    if (key === profile.birthDate.fieldName) {
      newProfile[key] = getCheckedDateField(newProfile[key], newProfile[key].value);
    } else {
      newProfile[key] = getCheckedField(newProfile[key], newProfile[key].value);
    }
  });
  return newProfile;
};

export const hasError = (profile) => {
  return Object.keys(profile).some(key => !!profile[key].error);
};

export const translateProfileErrors = (profile) => {
  const translates = {
    'Unrecognized field': 'Campo no reconocido',
    'Field is not editable': 'Campo no editable',
    'Field is required': 'Campo requerido',
    'Invalid field value': 'Valor inválido',
    'NicNumber already registered': 'Número ya registrado',
    'NicNumber already registered for this type': 'Tipo+Número ya registrados',
    'Matriculation already registered': 'Matrícula ya registrada',
  };
  Object.keys(profile).forEach((key) => {
    if (profile[key] && profile[key].error && translates[profile[key].error]) {
      // eslint-disable-next-line no-param-reassign
      profile[key].error = translates[profile[key].error];
    }
  });
};
