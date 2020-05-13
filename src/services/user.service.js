import axios from 'axios';
import authHeader from './5';

const API_URL = 'http://localhost:8080/api/users/';

class UserService {
    getAll() {
        return axios.get(API_URL, { headers: authHeader() });
    }
  
    get(id) {
        return axios.get(API_URL + `${id}`, { headers: authHeader() });
    }

    update(id, data) {
        return axios.put(API_URL + `${id}`, data, { headers: authHeader() });
    }

    delete(id) {
        return axios.delete(API_URL + `${id}`, { headers: authHeader() });
    }

    deleteAll() {
        return axios.delete(API_URL, { headers: authHeader() });
    }
  }
  
  export default new UserService();