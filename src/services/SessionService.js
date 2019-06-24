export default class SessionService {
  static saveSessionData(id, type) {
    localStorage.setItem('id', id);
    localStorage.setItem('type', type);
  }

  static getUserData() {
    return {
      id: localStorage.getItem('id'),
      type: localStorage.getItem('type'),
    };
  }
}
