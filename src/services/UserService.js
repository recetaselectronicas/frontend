import RestclientService from './RestclientService';

export default class UserService extends RestclientService {
  static login(data) {
    return this.post('/login ', {
      ...data,
    });
  }

  static getMenu() {
    return this.get('/session/menu');
  }

  static getData() {
    return this.get('/session/data');
  }
}
