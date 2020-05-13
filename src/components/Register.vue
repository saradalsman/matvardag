<template>
  <div>
      <form @submit.prevent="registerUser()">
        <div class="form_area" v-if="!successful">
          <h2>Skapa nytt konto</h2>
          <fieldset>
            <div class="input_container">
              <label for="name">Namn</label>
              <input
                v-model="user.name"
                v-validate="'required|min:2|max:30'"
                type="text"
                name="name"
                autocomplete="off"
              />
            </div>
            <div class="input_container">
              <label for="email">Email</label>
              <input
                v-model="user.email"
                v-validate="'required|email|max:50'"
                type="email"
                name="email"
                autocomplete="off"
              />
            </div>
            <div class="input_container">
              <label for="password">Lösenord</label>
              <input
                v-model="user.password"
                v-validate="'required|min:6|max:40'"
                type="password"
                name="password"
              />
            </div>
          </fieldset>
          <div v-if="submitted" class="text_warning">
            <span v-if="errors.has('name')">
              {{errors.first('name')}}
            </span>
            <span v-if="errors.has('email')">
              {{errors.first('email')}}
            </span>
            <span v-if="errors.has('password')">
              {{errors.first('password')}}
            </span>
          </div>
            <button type="submit">Spara</button>
        </div>
      </form>
      <div class="text_container" v-if="message">
        {{message}}
      </div>
  </div>
</template>

<script>
import router from "../router"
import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      // router.push('/profile');
      this.successful = true;
    }
  },
  methods: {
    registerUser() {
      this.message = '';
      this.submitted = true;

      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      })

    },
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

.text_container {
  background-color: $light-box;
  margin: 0 auto;
  width: 50vw;
  width: fit-content;
  text-align: center;
  padding: 10px 20%;
}

</style>