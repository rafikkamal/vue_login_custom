<template>
  <div class="login">
    <div v-if="loggingIn" class="container-loading">
      <img src="../loading.gif" alt="Loading Icon">
    </div>
    <p v-if="loginError">{{ loginError }}</p>
    <form @submit.prevent="loginSubmit">
      <input type="email" placeholder="E-Mail" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import router from '../router'

export default {
	data() {
	  return {
	    email: 'eve.holt@reqres.in',
	    password: 'cityslicka'
	  }
	},
	computed: {
	  ...mapState([
	    'loggingIn',
	    'loginError',
	  ])
	},
	methods: {
	  ...mapActions([
	    'doLogin',
      'fetchUserInfo',
      'fetchAccessToken'
	  ]),
	  loginSubmit() {
	    this.doLogin({
	      email: this.email,
	      password: this.password
	    })
      .then((res) => { 
        this.setLocaleStorageInfo(res)
        this.fetchUserInfo({
          'userName': res.userName,
          'userEmail': res.userEmail
        })
        router.push('/users')
      })
      .catch((err) => {
        console.log(err)
      })
	  },
    setLocaleStorageInfo: (res) => {
      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('userName', res.userName)
      localStorage.setItem('userEmail', res.userEmail)
    }
	}
}
</script>
<style scoped lang="scss">
  .login {
    border: 1px solid black;
    border-radius: 5px;
    padding: 1.5rem;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    .container-loading {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0,0,0,.3);
      img {
        width: 4rem;
        height: 4rem;
      }
    }
    form {
      display: flex;
      flex-flow: column;
      *:not(:last-child) {
        margin-bottom: 1rem;
      }
      input {
        padding: .5rem;
      }
      button {
        padding: .5rem;
        background-color: lightgray;
        border: 1px solid gray;
        border-radius: 3px;
        cursor: pointer;
        &:hover {
          background-color: lightslategray;
        }
      }
    }
  }
</style>