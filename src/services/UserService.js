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

  static async getConfiguration() {
    return this.get('/session/configuration');
  }

  static getTwoFactorKey() {
    return this.get('/session/authentication/two-factor');
  }

  static verifyTwoFactor(code) {
    const data = {
      authentication: {
        code,
      },
    };
    return this.post('/session/authentication/two-factor', data);
  }
}
