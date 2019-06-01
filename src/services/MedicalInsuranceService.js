export default class MedicalInsuranceService {
  static getAll() {
    return new Promise(res => res([
      { id: 0, label: 'OSDE' },
      { id: 1, label: 'Swiss medical' },
      { id: 2, label: 'ACA Salud' },
    ]));
  }
}
