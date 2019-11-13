export default class SessionService {
  static saveSessionData(token, type) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('type', type);
  }

  static getUserData() {
    return {
      token: sessionStorage.getItem('token'),
      type: sessionStorage.getItem('type'),
    };
  }

  static userIsLogged() {
    const user = this.getUserData();
    return user && user.token;
  }

  static logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('type');
  }
}
