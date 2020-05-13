<template>
  <div>
    <form @submit.prevent="loginUser()">
      <div class="form_area" v-if="!successful">
        <h2>Logga in</h2>
        <fieldset>
          <div class="input_container">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              v-validate="'required'"
              type="text"
              name="email"
            />
          </div>
          <div class="input_container">
            <label for="password">Lösenord</label>
            <input
              v-model="user.password"
              v-validate="'required'"
              type="password"
              name="password"
            />
          </div>
        </fieldset>
        <div v-if="submitted" class="text_warning">
          <span v-if="errors.has('email')">
            {{errors.first('email')}}
          </span>
          <span v-if="errors.has('password')">
            {{errors.first('password')}}
          </span>
        </div>
        <button type="submit" :disabled="loading">
          <span v-show="loading"></span>
          <span>Logga in</span>
        </button>
        <div>
          <div v-if="message" class="text_warning">
            {{message}}
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import User from '../models/user';
import router from "../router" 

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: '',
      successful: false,
      submitted: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.successful = true;
    }
  },
  methods: {
    loginUser() {
      this.submitted = true;
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.email && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              // console.log('inloggad')
              // router.push('/profile');
            },
            error => {
              this.loading = false;
              this.message =
              "Fel email eller lösenord. Försök igen."
            }
          );
        }
      });
    }
  }
};

</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';
@import '../assets/styles/main.scss';

form {
  padding: 10px;
}

.form_area {
  background-color: $light-box;
  margin: 0 auto;
  width: 50vw;
  width: fit-content;
  padding: 10px 20%;
}

.input_container {
  display: flex;

  input  {
    width: 100%;
  }
}

</style>