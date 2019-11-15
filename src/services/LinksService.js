
import RestclientService from './RestclientService';

export default class LinksService extends RestclientService {
  static getLinksRequests() {
    return this.get('/session/link-up/requests');
  }

  static requestLink(data) {
    return this.post('/session/link-up', data);
  }

  static cancelRequestLink(id) {
    return this.put(`/session/link-up/requests/${id}`, {
      status: 'CANCELLED',
      reason: null,
    });
  }
}
