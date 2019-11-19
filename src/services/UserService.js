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

  static getDataFields() {
    return this.get('/session/data/fields');
  }

  static updateDataFields(data) {
    return this.put('/session/data/fields', data);
  }

  static async getConfiguration() {
    return this.get('/session/configuration');
  }

  static async updateConfiguration(data) {
    return this.put('/session/configuration', data);
  }

  static getTwoFactorKey() {
    return this.post('/session/authentication/two-factor/generate');
  }

  static verifyTwoFactor(code) {
    const data = {
      authentication: {
        code,
      },
    };
    return this.post('/session/authentication/two-factor', data);
  }

  static changePassword(newPassword) {
    const data = {
      newPassword,
    };
    return this.put('/session/authentication/user-pass', data);
  }

  static getDefaultAuthenticationType() {
    return this.get('/session/authentication/default');
  }
}
