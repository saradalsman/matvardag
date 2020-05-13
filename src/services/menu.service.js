import axios from 'axios';
import authHeader from './auth.header';
import authId from './auth.id';

const API_URL = 'http://localhost:8080/api/menus/';

class MenuService {
    create(data) {
        return axios.post(API_URL + `${authId()}`, data, { headers: authHeader() });
    }

    getAll() {
        return axios.get(API_URL + `${authId()}`, { headers: authHeader() });
    }
  
    getLast() {
        return axios.get(API_URL + `${authId()}/` + 'single', { headers: authHeader() });
    }

    update(id, data) {
        return axios.put(API_URL + `${authId()}/` + `${id}`, data, { headers: authHeader() });
    }

    delete(id) {
        return axios.delete(API_URL + `${authId()}/` + `${id}`, { headers: authHeader() });
    }

    deleteAll() {
        return axios.delete(API_URL + `${authId()}`, { headers: authHeader() });
    }
  }
  
  export default new MenuService();