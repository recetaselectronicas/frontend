import RestclientService from './RestclientService';

export default class AuthorizationsService extends RestclientService {
  static authorize(data) {
    return this.post('/authorizations', data);
  }
}
