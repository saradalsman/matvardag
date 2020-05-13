<template>
  <div class="page_content">
    <h1>
      <strong>{{currentUser.name}}s</strong> profil
    </h1>
    <div class="content_box">
      <p>
        <strong>Email:</strong>
        {{currentUser.email}}
      </p>  
    </div>
  </div>
</template>

<script>
import router from "../router"

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  data() {
    return {
    };
  },
  mounted() {

  },
  methods: {

  }
};

</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';
@import '../assets/styles/main.scss';


</style>