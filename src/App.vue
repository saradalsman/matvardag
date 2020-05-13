<template>
  <div id="app">
    <navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from './components/Navigation'

export default {
  name: 'app',
  components: {
    Navigation,
  },
}
</script>

<style scoped lang="scss">
@import './assets/styles/main.scss';
@import './assets/styles/variables.scss';

#app {
  background: url('./assets/img/egg-and-veggies.jpg') no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: -webkit-fill-available;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
