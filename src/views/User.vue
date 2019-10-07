<template>
  <div>
    <h3>{{ title }}</h3>
    <p>User ID: {{ $route.params.id }}</p>
    <p>Username: {{ userName }} </p>
    <p>Useremail: {{ userEmail }} </p>
    <button @click=logout>Logout</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      title: 'User Information'
    }
  },
  computed: {
    ...mapState([
      'userName',
      'userEmail'
    ])
  },
  methods: {
    ...mapActions([
      'logout'
    ])
  }
}
</script>