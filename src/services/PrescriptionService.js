import RestclientService from './RestclientService';

export default class PrescriptionService extends RestclientService {
  static async create(prescription) {
    console.log('go to send', JSON.stringify({ ...prescription }));
    return this.post('/prescription', {
      ...prescription,
    });
  }
}
