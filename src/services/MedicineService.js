import RestclientService from './RestclientService';

export default class MedicineService extends RestclientService {
  static searchByName(description) {
    return this.get('/medicines', {
      params: {
        description,
      },
    });
  }

  static getByTroquel(troquel) {
    return this.get(`/medicines/troquel/${troquel}`);
  }
}
