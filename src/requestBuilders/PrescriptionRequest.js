const toInt = value => Number.parseInt(value, 10);
export default class PrescriptionRequest {
  constructor(build) {
    this.prolongedTreatment = build.prolongedTreatment;
    this.diagnosis = build.diagnosis;
    this.institution = build.institution;
    this.affiliate = build.affiliate;
    this.medicalInsurance = build.medicalInsurance;
    this.doctor = build.doctor;
    this.items = build.items;
    this.institution = build.institution;
  }

  static get Builder() {
    class Builder {
      withProlongedTreatment(prolongedTreatment) {
        this.prolongedTreatment = prolongedTreatment;
        return this;
      }

      withDiagnosis(diagnosis) {
        this.diagnosis = diagnosis;
        return this;
      }

      withInstitution(institutionId) {
        this.institution = { id: institutionId };

        return this;
      }

      withAffiliate(affiliateId) {
        this.affiliate = { id: affiliateId };

        return this;
      }

      withMedicalInsurance(medicalInsuranceId) {
        this.medicalInsurance = { id: medicalInsuranceId };
        return this;
      }

      withDoctor(doctorId) {
        this.doctor = {
          id: toInt(doctorId),
        };
        return this;
      }

      withItems(items) {
        this.items = items.map(item => ({
          prescribed: {
            quantity: toInt(item.quantity),
            medicine: {
              id: toInt(item.medicine.id),
            },
          },
        }));
        return this;
      }

      build() {
        return new PrescriptionRequest(this);
      }
    }
    return Builder;
  }
}
