<template>
  <div class="page_content">
    <h1>Lägg till recept</h1>
    <form class="content_box" @submit.prevent="createRecipe()">
      <fieldset>
        <div class="info_item">
          <label for="name" >Namn</label>
          <input v-model="name" v-validate="'max:25|required'" type="text" id="name" name="name" placeholder="Halloumisallad">
        </div>
        <div class="info_item">
          <label for="description">Beskrivning</label>
          <input v-model="description" v-validate="'max:40'" type="text" id="description" name="description" placeholder="med quinoa och valnötter">
        </div>
          <div v-if="submitted" class="text_warning">
            <span v-if="errors.has('name')">
              {{errors.first('name')}}
            </span>
            <span v-if="errors.has('description')">
              {{errors.first('description')}}
            </span>
          </div>
      </fieldset>
      <fieldset>
        <legend>Ingredienser</legend>
        <div class="ingredient_list">
          <div class="ingredient_item">
            <label for="ingredient">Vara</label>
            <label for="amount">Mängd</label>
            <label for="unit">Enhet</label>
            <div></div>
          </div>
          <div class="ingredient_item" v-for="(ingredient, index) in ingredients" :key="index">
            <input v-model="ingredientName[index]" v-validate="'max:25|required'" type="text" class="ingredient-name" name="ingredient" placeholder="Halloumi" >
            <input v-model="ingredientAmount[index]" v-validate="'min_value:0.5|required'" type="number" step="0.5" name="amount" placeholder="1" >
            <select v-model="ingredientUnit[index]" v-validate="'required'" name="units" id="ingredientUnit">
              <option v-for="(unit, index) in units" :key="index">{{unit}}</option>
            </select>
            <div class="remove_button" v-on:click="removeIngredient(index)">
              <font-awesome-icon icon="minus" />
            </div>
            <!-- <Dropdown
              v-on:selected="ingredientUnit[index] = $event"
              :content="units"
              :name="'unit'"
            /> -->
          </div>
          <div id="add_button" v-on:click="addIngredient">
            <font-awesome-icon icon="plus" />
          </div>
          <div class="text_warning" v-if="submitted">
            <span v-if="errors.has('ingredient')">
              {{errors.first('ingredient')}}
            </span>
            <span v-if="errors.has('amount')">
              {{errors.first('amount')}}
            </span>
            <span v-if="errors.has('units')">
              {{errors.first('units')}}
            </span>
          </div>
        </div>    
      </fieldset>
      <fieldset>
        <legend>Instruktioner</legend>
        <textarea v-model="instructions" name="instruction" id="instruction" placeholder="Skär halloumin i bitar och stek..."></textarea>
      </fieldset>
      <fieldset>
        <legend>Taggar</legend>
        <div class="tag_list">
          <div class="tag_item" v-for="(item, index) in tags" :key="index">
            <input v-model="tagName" type="checkbox" :value="item" :id="item">
            <label :for="item">{{item}}</label>
          </div>
        </div>
      </fieldset>
      <button type="submit">Spara</button>
    </form>
  </div>
</template>

<script>
import RecipeService from "../services/recipe.service";
import Dropdown from '../components/Dropdown'
import router from "../router"

export default {
  components: {
    Dropdown
  },
  data() {
    return {
      name: '',
      description: '',
      instructions: '',
      ingredientName: [],
      ingredientAmount: [],
      ingredientUnit: [],
      ingredients: [1],
      tagName: [],
      units: ['tsk', 'msk', 'dl', 'g', 'st'],
      tags: ['Fisk', 'Kyckling', 'Kött', 'Veganskt', 'Vegetariskt', 'Glutenfritt', 'Laktosfritt'],
      submitted: false,
    }
  },
  methods: {
    createRecipe() {
      this.submitted = true;

      this.$validator.validate().then(isValid => {
        if (isValid) {
          let ingredientsArray = [];
          for(let i = 0; i < this.ingredients.length; i++){
            ingredientsArray.push([this.ingredientName[i].toLowerCase(), this.ingredientAmount[i], this.ingredientUnit[i]])
          }

          let instructionsArray = []
          let lineBreak = '\n';
          if (this.instructions){
            if (this.instructions.includes(lineBreak)){
              instructionsArray = this.instructions.split(lineBreak)
            }
            else {
              instructionsArray = [this.instructions]
            }
          }
          else {
            instructionsArray = []
          }

          let recipe = {
            'name': this.name.toLowerCase(), 
            'description': this.description.toLowerCase(),
            'instructions': instructionsArray, 
            'ingredients': ingredientsArray,
            'tags': this.tagName
          }
          RecipeService.create(recipe)
          .catch(e => {
            console.log(e);  
          })
          .then(response => {
            router.push('/recipe/all')
          })
        }
      })
    },
    addIngredient() {
      this.ingredients.push(1);
    },
    removeIngredient(index) {
      if (this.ingredients.length > 1){
        this.ingredientName.splice(index, 1)
        this.ingredientAmount.splice(index, 1)
        this.ingredientUnit.splice(index, 1)
        this.ingredients.splice(index, 1)
      }
    },
    addTag() {
      this.tags.push(1);
    },
    removeTag() {
      this.tags.pop(1);
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';
@import '../assets/styles/main.scss';

.info_item {
  display: flex;
  justify-content: flex-start;

  input {
    width: 100%;
    margin-left: 5%;
  }
}

textarea {
  width: 100%;
  min-height: 10vh;
  background-color: $light-primary;
  border-radius: 0;
  border: solid $dark-accent 2px;

}

.ingredient_list{
  border: solid $dark-accent 2px;
  padding: 15px;

  input, select {
    background-color: transparent;
  }
}

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px $light-primary inset;
  }

.ingredient_item {
  display: grid;
  grid-template-columns: auto 15% 15% 5%;
}

#add_button {
  margin-top: 8px;
}

.remove_button {
  text-align: center;
}

.tag_list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}



</style>