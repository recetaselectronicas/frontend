import RestclientService from './RestclientService';

export default class DoctorService extends RestclientService {

    static search(params) {
        return this.get('/doctors/search', { params });
    }
}
