export default class MedicamentService {
  static searchMedicamentByName() {
    return {
      result: [
        { id: 0, label: 'ibuprofeno 600' },
        { id: 1, label: 'clonazepan 600' },
      ],
    };
  }
}
