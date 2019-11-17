import RestclientService from './RestclientService';

export default class SpecialtyService extends RestclientService {

  static getSpecialties() {
    return this.get('/specialties');
  }

  static getFallbackSpecialties() {
    return [
      {
        id: 1,
        description: 'Kinesiología',
      },
      {
        id: 2,
        description: 'Traumatología',
      },
      {
        id: 3,
        description: 'Cirujía Plástica',
      },
      {
        id: 4,
        description: 'Psicología',
      },
      {
        id: 5,
        description: 'Oncología',
      },
      {
        id: 6,
        description: 'Cardiología',
      },
      {
        id: 7,
        description: 'Endocrinología',
      },
    ];
  }
}
