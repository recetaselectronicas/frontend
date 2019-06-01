export default class MedicamentService {
  static searchMedicamentByName() {
    return new Promise(res => res({
      result: [
        { id: 0, label: 'ibuprofeno 600' },
        { id: 1, label: 'clonazepan 600' },
      ],
    }));
  }
}
