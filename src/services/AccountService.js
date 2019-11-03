import RestclientService from './RestclientService';

export default class AccountService extends RestclientService {

  static createAffiliateAccount(data) {
    return this.post('/users/affiliate', data, { timeout: 5000 });
  }

  static verifyAccount(userType, token) {
    return this.post(`/users/${userType}/confirmation?token=${token}`);
  }
}
