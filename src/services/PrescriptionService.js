import axios from 'axios';
import config from '../config/default';


export default class PrescriptionService {
  static async create(prescription) {
    console.log('go to send', JSON.stringify({ ...prescription }));
    const response = await axios.post(`${config.baseUrl}/prescription`, {
      ...prescription,
    });
    return response.data;
  }
}
