import RestclientService from './RestclientService';

export default class InstitutionService extends RestclientService {
  static getAll() {
    return this.get('/institutions');
    /*
     return new Promise(res => res([
      { id: 0, label: 'Corporacion medica' },
      { id: 1, label: 'Castex' },
      { id: 2, label: 'Italiano' },
    ])); */
  }
}
