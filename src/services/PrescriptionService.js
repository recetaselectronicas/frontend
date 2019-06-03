import RestclientService from './RestclientService';

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

  static async getPrescriptionsList() {
    /*return {
      result: [
        {
          id: 1,
          issuedDate: '12/12/12 12:12',
          soldDate: '12/12/12 12:12',
          auditedDate: '12/12/12 12:12',
          prolongedTreatment: true,
          diagnosis: 'texto',
          ttl: 30,
          institution: {
            id: 1,
            description: 'Hospital italiano',
          },
          affiliate: {
            id: 9999,
            description: 'Hospital italiano',
          },
          medicalInsurance: {
            id: 9999,
            description: 'OSDE',
          },
          doctor: {
            id: 9999,
            description: 'doctor random',
          },
          status: 'EMITIDA',
          norm: {
            id: 1,
          },
          items: [
            {
              description: 'Ibuprofeno 600',
              id: 1,
              prescribed: {
                quantity: 99,
                medicine: {
                  id: 1,
                },
              },
              received: {
                quantity: 99,
                soldDate: '12/12/12',
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
        },
        {
          id: 1,
          issuedDate: '12/12/12 12:12',
          soldDate: '12/12/12 12:12',
          auditedDate: '12/12/12 12:12',
          prolongedTreatment: true,
          diagnosis: 'texto',
          ttl: 30,
          institution: {
            id: 1,
            description: 'Hospital italiano',
          },
          affiliate: {
            id: 9999,
            description: 'Hospital italiano',
          },
          medicalInsurance: {
            id: 9999,
            description: 'OSDE',
          },
          doctor: {
            id: 9999,
            description: 'doctor random',
          },
          status: 'EMITIDA',
          norm: {
            id: 1,
          },
          items: [
            {
              description: 'Ibuprofeno 600',
              id: 1,
              prescribed: {
                quantity: 99,
                medicine: {
                  id: 1,
                },
              },
              received: {
                quantity: 99,
                soldDate: '12/12/12',
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
        },
        {
          id: 1,
          issuedDate: '12/12/12 12:12',
          soldDate: '12/12/12 12:12',
          auditedDate: '12/12/12 12:12',
          prolongedTreatment: true,
          diagnosis: 'texto',
          ttl: 30,
          institution: {
            id: 1,
            description: 'Hospital italiano',
          },
          affiliate: {
            id: 9999,
            description: 'Hospital italiano',
          },
          medicalInsurance: {
            id: 9999,
            description: 'OSDE',
          },
          doctor: {
            id: 9999,
            description: 'doctor random',
          },
          status: 'EMITIDA',
          norm: {
            id: 1,
          },
          items: [
            {
              description: 'Ibuprofeno 600',
              id: 1,
              prescribed: {
                quantity: 99,
                medicine: {
                  id: 1,
                },
              },
              received: {
                quantity: 99,
                soldDate: '12/12/12',
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
        },
      ],
      filters: {
        singles: {
          status: {
            id: 'status',
            values: [
              {
                id: 'CONFIRMED',
                value: 'CONFIRMADA',
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
                id: 'AUDITED',
                value: 'AUDITADA',
              },
              {
                id: 'EXPIRED',
                value: 'VENCIDA',
              },
            ],
          },
          id: {
            id: 'id',
          },
          institution: {
            id: 'institution',
            values: [
              {
                id: 1,
                value: 'Instituto Santa Brigida',
              },
              {
                id: 2,
                value: 'Hospital Italiano',
              },
              {
                id: 3,
                value: 'Centro de Ojos Maipu',
              },
            ],
          },
        },
        ranges: {
          issueDateRange: {
            from: 'fromIssueDate',
            to: 'toIssueDate',
          },
          receivedDateRange: {
            from: 'fromReceivedDate',
            to: 'toReceivedDate',
          },
        },
      },
      specialFilters: {
        singles: {
          medicalInsurance: {
            id: 'medicalInsurance',
            values: [
              {
                id: 1,
                value: 'OSECAC',
              },
              {
                id: 2,
                value: 'OSDE',
              },
            ],
          },
          affiliate: {
            id: 'affiliate',
          },
          medicine: {
            id: 'medicine',
          },
          doctor: {
            id: 'doctor',
          },
        },
        ranges: {
          auditedDateRange: {
            from: 'fromAuditedDate',
            to: 'toAuditedDate',
          },
        },
      },
      orders: {
        issuedDate: {
          id: 'issuedDate',
          sorting: {
            asc: 'asc',
            dsc: 'desc',
          },
        },
        soldDate: {
          id: 'soldDate',
          sorting: {
            asc: 'asc',
            dsc: 'desc',
          },
        },
        id: {
          id: 'id',
          sorting: {
            asc: 'asc',
          },
        },
      },
    };*/
     return this.get('/prescriptions');
  }
}
