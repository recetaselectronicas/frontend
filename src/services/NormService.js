import RestclientService from './RestclientService';

export default class NormService extends RestclientService {
  static getNorm() {
    return this.get('/norms/actual');
  }

  static getDefinition() {
    return this.get('/norms/definition');
  }

  static saveNorm(norm) {
    return this.post('/norms', norm);
  }
}
