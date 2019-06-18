import RestclientService from './RestclientService';

const querystring = require('querystring');

export default class PrescriptionService extends RestclientService {
  static async create(prescription) {
    console.log('go to send', JSON.stringify({ ...prescription }));
    return this.post('/prescriptions', {
      ...prescription,
    });
  }

  static async getById(prescriptionId) {
    return this.get(`/prescriptions/${prescriptionId}`);
  }

  static async getPrescriptionsList(filters = {}) {
    return this.get('/prescriptions', {
      params: {
        ...filters,
      },
      paramsSerializer(params) {
        return querystring.stringify(params, '');
      },
    });
  }

  static async cancel(prescriptionId, data) {
    return this.put(`/prescriptions/${prescriptionId}`, {
      status: 'CANCELLED',
      data,
    });
  }

  static async receive(prescriptionId, data) {
    return this.put(`/prescriptions/${prescriptionId}`, {
      status: 'RECEIVE',
      data,
    });
  }

  static async audit(prescriptionId, data) {
    return this.put(`/prescriptions/${prescriptionId}`, {
      status: 'AUDIT',
      data,
    });
  }
}
