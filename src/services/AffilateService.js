import RestclientService from './RestclientService';

export default class AffiliateService extends RestclientService {
  static searchAffilateByCodeAndMedicalInsurance(code, medicalInsurance) {
    /* return this.get('/affiliates', {
      params: {
        code,
        medical_insurance: medicalInsuranceId,
      },
    }); */
    return new Promise(res => res([
      {
        label: 'Gonzalito Gras cantou - 23221231',
        id: 1,
        code: 123123213,
        name: 'Gonzalo',
        lastname: 'Gras cantou',
        category: '310',
      },
      {
        label: 'Leandro devoto - 12123123123',
        id: 2,
        name: 'Leandro',
        code: 444543523423,
        lastname: 'Devoto',
        category: 'Prepaga',
      },
    ]));
  }

  static searchAffilateNumber(code, medicalInsurance) {
    return this.get('/affiliates', {
      params: {
        code,
        medicalInsurance,
      },
    });
    return new Promise(res => res([
      {
        label: 'Gonzalito Gras cantou - 23221231',
        id: 1,
        code: 123123213,
        name: 'Gonzalo',
        lastname: 'Gras cantou',
        category: '310',
      },
      {
        label: 'Leandro devoto - 12123123123',
        id: 2,
        name: 'Leandro',
        code: 444543523423,
        lastname: 'Devoto',
        category: 'Prepaga',
      },
    ]));
  }
}
