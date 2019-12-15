
const translations = {
  affiliate: 'Paciente',
  doctor: 'Doctor',
  pharmacist: 'Farmaceutico',

};
export default {
  gettext: string => translations[string] || string,
};
