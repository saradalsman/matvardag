<template>
  <div class="navigation_container">
    <div class="menu_icon" v-on:click="showNav">
      <font-awesome-icon icon="bars" />
    </div>
    <ul id="user_menu" expand v-if="expand" v-on:click="showNav">
      <div class="menu_container">
        <router-link tag="li" to="/">Hem</router-link>
        <div class="menu_item_group">
          <h3>Recept</h3>
          <router-link tag="li" to="/recipe/all">Bläddra</router-link>
          <router-link tag="li" to="/recipe/create">Lägg till</router-link>
        </div>
        <div class="menu_item_group">
          <h3>Meny</h3>
          <router-link tag="li" to="/mymenu">Se senaste</router-link>
          <router-link tag="li" to="/mymenu/create">Skapa ny</router-link>
        </div>
        <router-link tag="li" to="/shopping-list">Inköpslista</router-link>
        <router-link tag="li" to="/profile">Profil</router-link>
        <li v-on:click.prevent="logOut">
          Logga ut
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      expand: false,
    }
  },
  methods: {
    showNav(){
      this.expand = !this.expand
      if (this.expand === true){
        document.body.style.overflow = 'hidden'
      }
      else {
        document.body.style.overflow = 'auto'
      }
    },
    logOut() {
      this.$store.dispatch('auth/logout').then(
        this.$router.push('/login')
      )
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';
@import '../assets/styles/main.scss';

.menu_icon {
  position: absolute;
  top: 40%;
  right: 30px;
  cursor: pointer;
  z-index: 102;
  color: $accent;
}

#user_menu {
  position:absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 101;
  background-color: $dark-primary;
  margin: 0;

  .menu_container {
    margin: 0 auto;
    width: 30vw;
    width: fit-content;
    height: 60%;
    display: grid;
    grid-gap: 20px;
    align-items: center;
    padding-top: 10%;
    text-transform: uppercase;
  }
}

.menu_item_group {
  h3 {
    // text-align: left;
    margin: 0;
    // padding-bottom: 10px;
    // padding-left: 5px;
    color: $dark-accent;
  }
  // li {
  //   margin-left: 30px;
  // }
}

li {
  cursor: pointer;
  padding: 5px;
  color: $accent;
  text-align: center;
}

li:active {
  background-color: $dark-accent;
}


</style>