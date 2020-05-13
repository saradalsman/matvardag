<template>
  <div class="page_content">
    <div class="top_buttons">
      <div class="back_button" v-on:click="goBack">
        <font-awesome-icon icon="chevron-left" />
      </div>
      <div class="buttons">
        <div class="edit_recipe" v-on:click="editRecipe(recipe.id)">
          <font-awesome-icon icon="edit" />
        </div>
        <div class="delete_recipe" v-on:click="deleteRecipe(recipe.id)">
          <font-awesome-icon icon="trash" />
        </div>
      </div>
    </div>
    <div v-if="recipe.tags != undefined && recipe.tags.length > 0 ">
      <ul class="tag_list">
        <li v-for="(tag, index) in recipe.tags" :key="index">
          {{tag}}
        </li>
      </ul>
    </div>
    <div>
      <h1>{{recipe.name}}</h1>
      <p class="recipe_description" v-if="recipe.description">
        {{recipe.description}}
      </p>
    </div>
    <div>
      <h3>Ingredienser</h3>
      <div class="ingredients_list">
        <ul>
          <li v-for="(item, index) in recipe.ingredients" :key="index">
            <span>{{item[0]}}</span>
            <span>{{item[1]}} {{item[2]}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="recipe.instructions != undefined && recipe.instructions.length > 0">
      <h3>Instruktioner</h3>
      <div class="instructions_field">
        <p v-for="(line, index) in recipe.instructions" :key="index">
        {{line}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeService from "../services/recipe.service";
import router from "../router"

export default {
  data () {
    return {
      recipe: [],
    }
  },
  created() {
      RecipeService.get(this.$route.params.recipe_id)
      .then(response => {
      this.recipe = response.data
    })
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    editRecipe(recipe){
      router.push('/recipe/update/' + recipe)
    },
    deleteRecipe(recipe) {
      RecipeService.delete(recipe)
      .then (response => {
        router.push('/recipe/all')
      })

    },

  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';
@import '../assets/styles/main.scss';

.page_content {
  background-color: $light-primary;
}
.top_buttons {
  display: flex;
  justify-content: space-between;
  color: $dark-accent;

  .back_button {
    margin: 16px;
    cursor: pointer;
  }

  .buttons {
    display: flex;
    margin: 16px;

    div {
      margin-left: 10px;
      cursor: pointer;
    }
  }
}

h1 {
  padding-bottom: 0;
}

.recipe_description {
  text-align: center;
}

.tag_list {
  text-align: center;
  li {
    display: inline;
    background-color: $light-accent;
    border-radius: 5px;
    padding: 4px 8px;
    margin: 0 2px;
  }
}

.ingredients_list {
  ul {
    margin: 16px auto;
    width: 50vw;
    width: fit-content;
  }

  li {
    padding-bottom: 5px;
    display: flex;
    justify-content: space-between;

    span:first-of-type {
      padding-right: 20px;
    }

    span:first-of-type::first-letter {
      text-transform: uppercase;
    }
  }

}

.instructions_field {
  margin: 16px;
  text-align: center;

  p {
   margin: 0;
   padding-bottom: 5px;
  }

  p::first-letter {
    text-transform: uppercase;
  }
}



</style>