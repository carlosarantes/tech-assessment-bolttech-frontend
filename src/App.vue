<template>
  <div id="app">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from './components/auth/LoginForm'

export default {
  name: 'App',
  components: {
    LoginForm
  },
  mounted() {    
  }
}
</script>

<style src="./index.css"></style>

