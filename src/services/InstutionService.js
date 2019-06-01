export default class InstitutionService {
  static getAll() {
    return new Promise(res => res([
      { id: 0, label: 'Corporacion medica' },
      { id: 1, label: 'Castex' },
      { id: 2, label: 'Italiano' },
    ]));
  }
}
