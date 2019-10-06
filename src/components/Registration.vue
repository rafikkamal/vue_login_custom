<template>
  <div class="register">
    <h2>Registations Form</h2>
    <hr/>
    <div v-if="registeringIn" class="container-loading">
      <img src="/loading.gif" alt="Loading Icon">
    </div>
    <p v-if="registerError">{{ registerError }}</p>
    <form @submit.prevent="loginSubmit">
      <input type="text" placeholder="Username" v-model="username">
      <input type="email" placeholder="Email" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <input type="password" placeholder="Confirm Password" v-model="confirm_password">
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	data() {
	  return {
      username: 'Eve',
	    email: 'eve.holt@reqres.in',
	    password: 'pistol',
      confirm_password: 'pistol'
	  }
	},
	computed: {
	  ...mapState([
	    'registeringIn',
	    'registerError',
	  ])
	},
	methods: {
	  ...mapActions([
	    'doRegistration'
	  ]),
	  loginSubmit() {
	    // this.doRegistration({
     //    username: this.username,
	    //   email: this.email,
     //    password: this.password,
     //    confirm_password: this.confirm_password
	    // })
      this.doRegistration({
        email: this.email,
        password: this.password
      })
	  }
	}
}
</script>
<style scoped lang="scss">
  .register {
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
        width: 2rem;
        height: 2rem;
      }
    }
    hr {
      margin-bottom:25px;
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