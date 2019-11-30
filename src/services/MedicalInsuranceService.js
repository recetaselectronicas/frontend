import RestclientService from './RestclientService';

export default class MedicalInsuranceService extends RestclientService {
  static getAll() {
    return this.get('/medical-insurances');
  }

  static getDoctors() {
    return this.get('/medical-insurances/doctors');
  }

  static getAffiliates() {
    return this.get('/medical-insurances/affiliates');
  }

  static getPharmacists() {
    return this.get('/medical-insurances/pharmacists');
  }

  static getByDoctor() {
    return this.get('/doctors/medical-insurances');
  }

  static getByPharmacist() {
    return this.get('/pharmacists/medical-insurances');
  }

  static getLinkedMedicalInsurances() {
    return this.get('/session/medical-insurances');
  }

  static getPlans() {
    return this.get('/medical-insurances/plans');
  }
}
