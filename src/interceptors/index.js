import axios from 'axios';
import store from '../store'

export default function setup() {
    axios.interceptors.response.use(response => {
      return response;
    }, error => {
        if(error.response.status == 401)
          store.dispatch('cognito/logout');

        return Promise.reject(error)
    });
}