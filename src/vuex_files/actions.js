import axios from 'axios'
import router from '../router'

let actions = {
	doLogin({ commit }, loginData) {
      commit('loginStart');
      console.log(loginData)

      axios.post('https://reqres.in/api/login', {
        ...loginData
      })
      .then(response => {
        localStorage.setItem('accessToken', response.data.token);
        commit('loginStop', null);
        commit('updateAccessToken', response.data.token);
        router.push('/users');
      })
      .catch(error => {
        commit('loginStop', error.response.data.error);
        commit('updateAccessToken', null);
      })
    },
    fetchAccessToken({ commit }) {
      commit('updateAccessToken', localStorage.getItem('accessToken'));
    },
    logout({ commit }) {
      localStorage.removeItem('accessToken');
      commit('logout');
      router.push('/login');
    }
}

export default actions;