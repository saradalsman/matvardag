<template>
  <div class="page_content">
    <div class="home_page_content" v-if="!currentUser">
      <login />
      <register/>
    </div>
    <div v-else>
      <h1>Välkommen</h1>
      <div class="home_page_content">
        <div class="text_box">
          <p>MATVARDAG är ett hjälpmedel för dig som vill få ordning på matplaneringen i vardagen.</p>
        </div>
        <div class="text_box">
          <p>
            För att komma igång behöver du 
            <a href="/recipe/create"> lägga in recept</a>
            som du gillar och vill ha med i din vardagsplanering. Ju fler desto roligare!
          </p>
          <p>
            När du har sparat några recept kan du
            <a href="/mymenu/create">skapa en veckomeny</a>
            (eller varför inte en helgmeny?)
            som slumpmässigt hämtar några av dina sparade recept.
            </p>
            <p>
              Sedan är det fritt fram att byta plats på recepten i <a href="/mymenu">menyn</a> eller byta ut något som du inte känner dig sugen på.
            </p>
            <p>
              Psst. Alla ingredienser som behövs till din meny läggs automatiskt in i din alldeles egna
              <a href="/shopping-list">inköpslista</a>.
            </p>
            <p>Smidigt va?</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Register from '../components/Register'
import Login from '../components/Login'
export default {
  components: {
    Register,
    Login,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {

    }
  }
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';
@import '../assets/styles/main.scss';

.home_page_content {
  display: grid;
  height: 80%;
  grid-gap: 10%;
  align-content: center;
  padding-bottom: 10%;
}

.text_box {
  background-color: $light-primary;
  padding: 10px 20px;
  text-align: center;
  margin: 0 auto;
  width: 80vw;
  // width: 50vw;
  // width: fit-content;
  // padding: 10px 20%;
}
</style>