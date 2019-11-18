import RestclientService from './RestclientService';

export default class MedicalInsuranceService extends RestclientService {
  static getAll() {
    // return new Promise(res => res([{ id: 0, label: 'OSDE' }, { id: 1, label: 'Swiss medical' }, { id: 2, label: 'ACA Salud' }]));
    return this.get('/medical-insurances');
  }

  static getByDoctor() {
    // return new Promise(res => res([{ id: 0, label: 'OSDE' }, { id: 1, label: 'Swiss medical' }, { id: 2, label: 'ACA Salud' }]));
    return this.get('/doctors/medical-insurances');
  }

  static getLinkedMedicalInsurances() {
    return this.get('/session/medical-insurances');
  }
}
