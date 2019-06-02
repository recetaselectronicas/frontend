import axios from 'axios';
import config from '../config/default';

const restclient = axios.create({
  baseURL: config.baseUrl,
  timeout: 1000,
});
const sucessfullRequestHandler = request => request.data;
const errorRequestHandler = (error) => {
  // TODO : ver como hacer handlers de los errores una vez este mas avanzado el backend
  throw error;
};
export default class RestclientService {
  static get(url, opts) {
    return restclient
      .get(url, opts)
      .then(sucessfullRequestHandler)
      .catch(errorRequestHandler);
  }

  static post(url, data, opts) {
    return restclient
      .post(url, data, opts)
      .then(sucessfullRequestHandler)
      .catch(errorRequestHandler);
  }

  static put(url, data, opts) {
    return restclient
      .put(url, data, opts)
      .then(sucessfullRequestHandler)
      .catch(errorRequestHandler);
  }

  static delete(url, opts) {
    return restclient
      .delete(url, opts)
      .then(sucessfullRequestHandler)
      .catch(errorRequestHandler);
  }
}
