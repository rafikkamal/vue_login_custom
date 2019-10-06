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
  fetchAccessToken({ commit, dispatch }) {
    var accessToken = localStorage.getItem('accessToken')
    /*
     * Check if the Access Token is valid
     */
    if(accessToken !== null && typeof accessToken !== "undefined") {
      dispatch('verifyAccessToken', {
        accessToken
      }).then((res) => {
        if(!res) {
          window.localStorage.removeItem('accessToken')
          router.push('/login')
        }
      })
    } 
    commit('updateAccessToken', accessToken);
  },
  verifyAccessToken({ commit }, params) {
    /*
     * Hard coded, must check with API
     */
    console.log("verifing the AccessToken: "+params.accessToken)
    if(params.accessToken === "QpwL5tke4Pnpja7X4") {
      return true
    }
    console.log("should not be here")
    return false
  },
  logout({ commit }) {
    localStorage.removeItem('accessToken');
    commit('logout');
    router.push('/login');
  },
  doRegistration({ commit }, registrationData) {
    commit('registrationStart');
    console.log(registrationData);

    axios.post('https://reqres.in/api/register', {
      ...registrationData
    })
    .then(response => {
      localStorage.setItem('accessToken', response.data.token);
      commit('registrationStop', null);
      commit('updateAccessToken', response.data.token);
      router.push('/users');
    })
    .catch(error => {
      commit('registrationStop', error.response.data.error);
    
    })
  },
}

export default actions;