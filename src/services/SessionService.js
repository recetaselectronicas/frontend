export default class SessionService {
  static saveSessionData(token, type) {
    localStorage.setItem('token', token);
    localStorage.setItem('type', type);
  }

  static getUserData() {
    return {
      token: localStorage.getItem('token'),
      type: localStorage.getItem('type'),
    };
  }

  static userIsLogged() {
    const user = this.getUserData();
    return user && user.token;
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('type');
  }
}
