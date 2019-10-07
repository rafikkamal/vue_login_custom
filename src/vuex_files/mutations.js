let mutations = {
  loginStart: state => state.loggingIn = true,
  loginStop: (state, errorMessage) => {
    state.loggingIn = false
    state.loginError = errorMessage
  },
  updateAccessToken: (state, accessToken) => {
    state.accessToken = accessToken
  },
  updateUserInfo: (state, params) => {
    //console.log(params)
    state.userName = params.userName
    state.userEmail = params.userEmail
  },
  logout: (state) => {
    state.accessToken = null
  },
  registrationStart: state => state.registeringIn = true,
  registrationStop: (state, errorMessage) => {
    state.registeringIn = false
    state.registrationError = errorMessage
  },
}

export default mutations;