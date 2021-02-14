<template>
  <div id="app">
    <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="true"></loading>
      <router-view></router-view>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'App',
  components: {
    Loading
  },
  computed : {
    ...mapGetters([
        'isLoading'
    ]),
  },
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

