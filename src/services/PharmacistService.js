import RestclientService from './RestclientService';

export default class PharmacistService extends RestclientService {

    static search(params) {
        return this.get('/pharmacists/search', { params });
    }
}
