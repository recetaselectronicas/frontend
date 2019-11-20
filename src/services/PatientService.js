import RestclientService from './RestclientService';

export default class PatientService extends RestclientService {

    static search(params) {
        return this.get('/patients/search', { params });
    }
}
