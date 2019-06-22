import PrescriptionRequest from './PrescriptionRequest';

describe('<PrescriptionRequest />', () => {
  describe('when pass all the fields', () => {
    const affiliateId = 2;
    const institutionId = 1;
    const medicalInsuranceId = 4;
    const doctorId = 9;
    const itemsValue = [
      {
        quantity: '2',
        medicine: {
          id: '10',
        },
      },
      {
        quantity: 4,
        medicine: {
          id:20,
        },
      },
    ];
    const result = new PrescriptionRequest
      .Builder()
      .withProlongedTreatment(true)
      .withDiagnosis('diagnosisValue')
      .withInstitution(institutionId)
      .withAffiliate(affiliateId)
      .withMedicalInsurance(medicalInsuranceId)
      .withDoctor(doctorId)
      .withItems(itemsValue)
      .build();

    it('has the properties', () => {
      expect(result).toHaveProperty('prolongedTreatment');
      expect(result).toHaveProperty('diagnosis');
      expect(result).toHaveProperty('institution');
      expect(result).toHaveProperty('affiliate');
      expect(result).toHaveProperty('medicalInsurance');
      expect(result).toHaveProperty('doctor');
      expect(result).toHaveProperty('items');
    });
    it('prolongedTreatment has the value', () => {
      expect(result.prolongedTreatment).toEqual(true);
    });
    it('diagnosis has the value', () => {
      expect(result.diagnosis).toEqual('diagnosisValue');
    });
    it('institution has the correct format', () => {
      expect(result.institution).toEqual({
        id: institutionId,
      });
    });

    it('affiliate has the correct format', () => {
      expect(result.affiliate).toEqual({
        id: affiliateId,
      });
    });
    it('medical insurance has the correct format', () => {
      expect(result.medicalInsurance).toEqual({
        id: medicalInsuranceId,
      });
    });
    it('doctor has the correct format', () => {
      expect(result.doctor).toEqual({
        id: doctorId,
      });
    });
    it('set to the items in the field prescribed the value of item', () => {
      const firstItem = result.items[0];
      expect(firstItem).toHaveProperty('prescribed');
      expect(firstItem.prescribed).toHaveProperty('quantity');
      expect(firstItem.prescribed).toHaveProperty('medicine');

      expect(firstItem.prescribed.quantity).toEqual(2);
      expect(firstItem.prescribed.medicine.id).toEqual(10);
    });
    it('add the same quantity of items', () => {
      expect(result.items).toHaveLength(2);
    });
  });
});
