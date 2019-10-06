let mutations = {
  loginStart: state => state.loggingIn = true,
  loginStop: (state, errorMessage) => {
    state.loggingIn = false;
    state.loginError = errorMessage;
  },
  updateAccessToken: (state, accessToken) => {
    state.accessToken = accessToken;
  },
  logout: (state) => {
    state.accessToken = null;
  }
}

export default mutations;