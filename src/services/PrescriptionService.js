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
    // return this.get(`/prescriptions/${prescriptionId}`);
    return {
      id: 8262,
      issuedDate: '06/06/2019 20:12',
      soldDate: null,
      auditedDate: null,
      prolongedTreatment: true,
      diagnosis: 'texto laaaargo',
      ttl: 30,
      institution: {
        id: 1,
        description: null,
        address: null,
      },
      affiliate: {
        id: 1,
        idPatient: null,
        name: null,
        surname: null,
        userName: null,
        birthDate: null,
        gender: null,
        contactNumber: null,
        email: null,
        address: null,
        nationality: null,
        nicNumber: null,
        nicIssueDate: null,
        nicType: null,
        nicExemplary: null,
        nicPhoto: null,
        fromDate: null,
        toDate: null,
        code: null,
        category: null,
        imageCredential: null,
        plan: {
          entryDate: null,
          leavingDate: null,
        },
      },
      doctor: {
        id: 9999,
        name: null,
        lastName: null,
        userName: null,
        birthDate: null,
        entryDate: null,
        leavingDate: null,
        contactNumber: null,
        nationality: null,
        address: null,
        email: null,
        nationalMatriculation: null,
        provincialMatriculation: null,
      },
      medicalInsurance: {
        id: 9999,
        description: null,
        userName: null,
        corporateName: null,
        email: null,
        address: null,
        contactNumber: null,
      },
      status: 'EMITIDA',
      norm: 1,
      items: [
        {
          id: null,
          prescribed: {
            quantity: 99,
            medicine: {
              id: 1,
            },
          },
          received: {
            quantity: 99,
            soldDate: '12/12/12 10:10',
            medicine: {
              id: 1,
            },
            pharmacist: {
              id: 1,
            },
          },
          audited: {
            quantity: 99,
            medicine: {
              id: 1,
            },
          },
        },
        {
          id: null,
          prescribed: {
            quantity: 99,
            medicine: {
              id: 1,
            },
          },
          received: {
            quantity: 99,
            soldDate: '12/12/12 10:10',
            medicine: {
              id: 1,
            },
            pharmacist: {
              id: 1,
            },
          },
          audited: {
            quantity: 99,
            medicine: {
              id: 1,
            },
          },
        },
      ],
    };
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
}
