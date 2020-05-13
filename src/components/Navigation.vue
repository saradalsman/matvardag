<template>
  <header >
    <div class="navigation">
      <router-link tag="li" to="/" id="logo">Matvardag</router-link>
      <burger-menu v-if="currentUser"/>
    </div>
  </header>
</template>

<script>
import BurgerMenu from '../components/BurgerMenu'

export default {
  components: {
    BurgerMenu,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';
@import '../assets/styles/main.scss';

.navigation {
  li:first-of-type {
    position: absolute;
    top: 20%;
    left: 30px;
    margin: 0;
  }
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 0 10px;
  cursor: pointer;
}

#logo {
  color: $accent;
  font-family: $logo-text;
  // font-weight: bold;
  font-size: 2rem;
}
</style>