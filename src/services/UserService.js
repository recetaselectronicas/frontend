import RestclientService from './RestclientService';

export default class UserService extends RestclientService {
  static login(data) {
    return this.post('/login ', {
      ...data,
    });
  }
  // Authorization: Bearer
}
