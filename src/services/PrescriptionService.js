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
    /* return {
      result: [
        {
          id: 4852,
          issuedDate: '08/06/2019 19:39',
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
            id: 1,
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
            specialty: null,
          },
          medicalInsurance: {
            id: 1,
            description: 'OSDE',
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
                  id: 92,
                },
              },
              received: {
                quantity: null,
                soldDate: null,
                medicine: {
                  id: null,
                },
                pharmacist: {
                  id: null,
                },
              },
              audited: {
                quantity: null,
                medicine: {
                  id: null,
                },
              },
            },
            {
              id: null,
              prescribed: {
                quantity: 1,
                medicine: {
                  id: 2,
                },
              },
              received: {
                quantity: null,
                soldDate: null,
                medicine: {
                  id: null,
                },
                pharmacist: {
                  id: null,
                },
              },
              audited: {
                quantity: null,
                medicine: {
                  id: null,
                },
              },
            },
          ],
        },
      ],
      filters: {
        singles: {
          id: {
            key: 'id',
          },
          status: {
            key: 'status',
            values: [
              {
                id: 'ISSUED',
                value: 'EMITIDA',
              },
              {
                id: 'CANCELLED',
                value: 'CANCELADA',
              },
              {
                id: 'CONFIRMED',
                value: 'CONFIRMADA',
              },
              {
                id: 'EXPIRED',
                value: 'VENCIDA',
              },
              {
                id: 'RECEIVED',
                value: 'RECEPCIONADA',
              },
              {
                id: 'PARTIALLY_RECEIVED',
                value: 'PARCIALMENTE_RECEPCIONADA',
              },
              {
                id: 'INCOMPLETE',
                value: 'INCOMPLETA',
              },
              {
                id: 'AUDITED',
                value: 'AUDITADA',
              },
              {
                id: 'REJECTED',
                value: 'RECHAZADA',
              },
              {
                id: 'PARTIALLY_REJECTED',
                value: 'PARCIALMENTE_RECHAZADA',
              },
            ],
          },
        },
        ranges: {
          issueDateRange: {
            keyFrom: 'fromIssueDate',
            keyTo: 'toIssueDate',
            format: 'DD/MM/YYYY HH:mm',
          },
          receivedDateRange: {
            keyFrom: 'fromReceivedDate',
            keyTo: 'toReceivedDate',
            format: 'DD/MM/YYYY HH:mm',
          },
          auditedDateRange: {
            keyFrom: 'fromAuditedDate',
            keyTo: 'toAuditedDate',
            format: 'DD/MM/YYYY HH:mm',
          },
        },
      },
      specialFilters: {
        singles: {
          institution: {
            key: 'institution',
            values: [],
          },
          doctor: {
            key: 'doctor',
          },
          affiliate: {
            key: 'affiliate',
          },
          pharmacist: {
            key: 'pharmacist',
          },
          medicine: {
            key: 'medicine',
          },
        },
        ranges: {},
      },
      orders: {
        // orderBy=issuedDate-asc
        key: 'orderBy',
        values: {
          id: {
            key: 'id',
            sorting: {
              asc: 'asc',
            },
          },
          issuedDate: {
            key: 'issuedDate',
            sorting: {
              asc: 'asc',
              dsc: 'desc',
            },
          },
          soldDate: {
            key: 'soldDate',
            sorting: {
              asc: 'asc',
              dsc: 'desc',
            },
          },
          auditedDate: {
            key: 'audtitedDate',
            sorting: {
              asc: 'asc',
              dsc: 'desc',
            },
          },
        },
      },
    }; */
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
