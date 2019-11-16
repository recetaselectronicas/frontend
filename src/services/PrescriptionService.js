import RestclientService from './RestclientService';

const querystring = require('querystring');

export default class PrescriptionService extends RestclientService {
  static async create(prescription, authorization, verification) {
    return this.post('/prescriptions', { ...prescription }, { headers: { 'x-authorization-token': authorization, 'x-verification-token': verification } });
  }

  static validate(prescription) {
    return this.post('/prescriptions/verify', { ...prescription });
  }

  static async getById(prescriptionId, query = {}, authorization) {
    return this.get(`/prescriptions/${prescriptionId}`, { params: { ...query }, headers: { 'x-authorization-token': authorization } });
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

  static async checkReceive(prescriptionId, data) {
    return this.put(`/prescriptions/${prescriptionId}/verify`, {
      status: 'RECEIVE',
      data,
    });
  }

  static async receive(prescriptionId, data, authorization, verification) {
    return this.put(`/prescriptions/${prescriptionId}`, {
      status: 'RECEIVE',
      data,
    },
    {
      headers: {
        'x-authorization-token': authorization,
        'x-verification-token': verification,
      },
    });
  }

  static async audit(prescriptionId, data) {
    return this.put(`/prescriptions/${prescriptionId}`, {
      status: 'AUDIT',
      data,
    });
  }
}
