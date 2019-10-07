import axios from 'axios'
import router from '../router'

const siteUrl = "https://reqres.in/api/"

let actions = {
	doLogin({ commit, dispatch }, loginData) {
    commit('loginStart')

    var authenticationResult = axios.post(siteUrl+'login', {
      ...loginData
    })
    .then((response, accessToken) => {
      commit('loginStop', null)
      commit('updateAccessToken', response.data.token)
      return {
        'accessToken': response.data.token,
        'userName': "Some Name",
        'userEmail': "somename@email.com"
      }
    })
    .catch(error => {
      console.log(error)
      commit('loginStop', error.response.data.error)
      commit('updateAccessToken', null)
    })

    return authenticationResult
  },
  logout({ commit, dispatch }) {
    localStorage.removeItem('accessToken')
    dispatch('removeUserInfo')
    commit('logout')
    router.push('/login')
  },
  fetchAccessToken({ commit, dispatch }, params) {
    var accessToken = localStorage.getItem('accessToken')
    /*
     * Check if the Access Token is valid
     */
    var verify = true
    if(params !== null && typeof params !== "undefined") {
      if(params.verify !== null && typeof params.verify !== "undefined") {
        verify = params.verify
      }
    }
    if(verify) {
      if(accessToken !== null && typeof accessToken !== "undefined") {
        dispatch('verifyAccessToken', {
          accessToken
        }).then((res) => {
          if(!res) {
            localStorage.removeItem('accessToken')
            router.push('/login')
          }
        })
      } 
    }
      
    commit('updateAccessToken', accessToken)
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
  fetchUserInfo({ commit }) {
    console.log("inside fetchUserInfo")
    let userName = localStorage.getItem('userName')
    let userEmail = localStorage.getItem('userEmail')
    console.log(userName, userEmail)
    commit('updateUserInfo', {
      'userName': userName, 
      'userEmail': userEmail
    })
  },
  removeUserInfo({ commit }) {
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    commit('updateUserInfo', {
      'userName': null, 
      'userEmail': null
    })
  },
  doRegistration({ commit, dispatch }, registrationData) {
    commit('registrationStart')

    axios.post(siteUrl+'register', {
      ...registrationData
    })
    .then(response => {
      localStorage.setItem('accessToken', response.data.token)
      commit('registrationStop', null)
      commit('updateAccessToken', response.data.token)
      /*
       * Get User Info
       */
      localStorage.setItem('userName', "Some Name")
      localStorage.setItem('userEmail', "somename@email.com")
      dispatch('fetchUserInfo').then((res) => {});
      router.push('/users')
    })
    .catch(error => {
      commit('registrationStop', error.response.data.error)
    })
  },
}

export default actions;