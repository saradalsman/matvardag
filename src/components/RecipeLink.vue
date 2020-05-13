<template>
    <div v-on:click="goToRecipe(recipe.id)">
      <p v-if="day" id="day">{{day}}</p>
      <h2>{{recipe.name}}</h2>
      <p v-if="recipe.description">{{recipe.description}}</p>
      <p v-else></p>
    </div>

</template>

<script>
import RecipeService from "../services/recipe.service";
import router from "../router"

export default {
  props: {
    recipeId: {
      type: Number,
      required: true,
    },
    day: {
      type: String,
      required: false,
    }
  },
  data () {
    return {
      recipe: [],
    }
  },
  watch: {
    recipeId: function() {
      this.getData()
    }
  },
  created() {
    this.getData() 
  },
  methods: {
    getData(){
      RecipeService.get(this.recipeId)
      .then(response => {
        this.recipe = response.data
      })
    },
    goToRecipe(recipe) {
      router.push('/recipe/' + recipe)
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';
@import '../assets/styles/main.scss';

    div {
      cursor: pointer;
    }
    #day {
      text-align: left;
      // color: $dark-accent;
      font-style: italic;
    }
    p {
      margin: 0 16px;
      text-align: center;
    }
</style>