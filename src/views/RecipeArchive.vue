<template>
  <div class="page_content">
    <h1>Mina recept</h1>
    <div class="content_box" v-if="recipes.length === 0">
      <p>Hittade inga recept</p>
      <p>Gå
        <a href="/recipe/create">hit</a>
        för att lägga in några
      </p>
    </div>
    <div class="recipe_container content_box">
      <div v-for="(recipe, index) in recipes" :key="index" class="recipe_item">
        <RecipeLink :recipeId="recipe.id" />
      </div>
    </div>
  </div>
</template>

<script>
import RecipeService from "../services/recipe.service";
import RecipeLink from '../components/RecipeLink'
import router from "../router"

export default {
  components: {
    RecipeLink,
  },
  data () {
    return {
      recipes: [],
    }
  },
  created() {
      RecipeService.getAll()
      .then(response => {
      this.recipes = response.data
    })
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';
@import '../assets/styles/main.scss';

.content_box {
  padding: 20px 0;
}

  .recipe_container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    // grid-gap: 2px;
  }

  .recipe_item {
    border-bottom: 2px solid $dark-accent;
    padding: 20px 5px;
  }

  .recipe_item:nth-of-type(odd) {
    border-right: 2px solid $dark-accent;
  }

</style>