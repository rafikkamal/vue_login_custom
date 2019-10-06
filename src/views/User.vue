<template>
  <div>
    <p>User</p>
    <p>ID: {{ $route.params.id }}</p>
    <button @click=logout>Logout</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions([
      'logout'
    ])
  },
}
</script>