import RestclientService from './RestclientService';

export default class MedicamentService extends RestclientService {
  static searchMedicamentByName(name) {
    return this.get('/medicaments');
    /* return new Promise(res => res({
      result: [
        { id: 0, label: 'ibuprofeno 600' },
        { id: 1, label: 'clonazepan 600' },
      ],
    })); */
  }
}
