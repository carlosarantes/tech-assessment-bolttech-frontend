<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
 
export default {
  name: 'App',
  beforeMount() {
    const token = localStorage.getItem('jwt');
    const sUserData = localStorage.getItem('userData');

    if (token && sUserData) {
      const userData = JSON.parse(sUserData);
      this.$store.commit('setUserData', userData);
      this.$store.commit('setToken', token);
      // this.$router.replace('/dashboard');
    }
  }
}
</script>

<style src="./index.css"></style>

