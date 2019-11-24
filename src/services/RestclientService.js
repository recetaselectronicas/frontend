import axios from 'axios';
import config from '../config/default';
import SessionService from './SessionService';

const restclient = axios.create({
  baseURL: config.baseUrl,
  timeout: 1000,
});
const sucessfullRequestHandler = request => request.data;
const errorRequestHandler = (error) => {
  // TODO : ver como hacer handlers de los errores una vez este mas avanzado el backend
  const { response } = error;
  if (response) {
    if (response.status === 403 && response.data.code === '2-001') {
      SessionService.logout();
      window.location.href = '/';
    }
    throw response.data;
  }
  throw error;
};
export default class RestclientService {
  static getHeaders(opts = {}) {
    const { token } = SessionService.getUserData();
    return { ...opts.headers, Authorization: `Bearer ${token}` };
  }

  static get(url, opts) {
    return restclient
      .get(url, { ...opts, headers: this.getHeaders(opts) })
      .then(sucessfullRequestHandler)
      .catch(errorRequestHandler);
  }

  static post(url, data, opts) {
    return restclient
      .post(url, data, { ...opts, headers: this.getHeaders(opts) })
      .then(sucessfullRequestHandler)
      .catch(errorRequestHandler);
  }

  static put(url, data, opts) {
    return restclient
      .put(url, data, { ...opts, headers: this.getHeaders(opts) })
      .then(sucessfullRequestHandler)
      .catch(errorRequestHandler);
  }

  static delete(url, opts) {
    return restclient
      .delete(url, { ...opts, headers: this.getHeaders(opts) })
      .then(sucessfullRequestHandler)
      .catch(errorRequestHandler);
  }

  static cleanPost(url, data, opts) {
    return restclient
      .post(url, data, { ...opts, headers: this.getHeaders(opts) });
  }
}
