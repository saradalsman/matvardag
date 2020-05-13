<template>
  <div class="page_content">
    <h1>Inköpslista</h1>
    <div class="content_box" v-if="ingredientList.length === 0">
      <p>Hittade ingen inköpslista</p>
      <p>Spara några recept och generera en meny så skapas en inköpslista automatiskt!</p>
    </div>
    <div class="content_box">
      <ul>
        <li v-for="(ingredient, index) in ingredientList" :key="index">
          <span>{{ingredient[0]}}</span>
          <span>{{ingredient[1]}} {{ingredient[2]}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MenuService from "../services/menu.service";
import RecipeService from "../services/recipe.service";

export default {
  components: {
  },
  data () {
    return {
      ingredientList: [],
    }
  },
  created() {
    MenuService.getLast()
      .then(response => {
        if (response.data.length > 0 && response.data[0].recipes){
          for(let i = 0; i < response.data[0].recipes.length; i++){
            RecipeService.get(response.data[0].recipes[i])
            .then(response => { 
              this.ingredientList = this.ingredientList.concat(response.data.ingredients)
              this.sortArray()
              this.checkDuplicates(this.ingredientList)
            })
          }
        }
    })
    .catch(
      this.ingredientList=[]
    )
  },
  methods: {
    sortArray() {
      // console.log('kör')
      this.ingredientList = this.ingredientList.sort(sortFunction);

      function sortFunction(a, b) {
        if (a[0] === b[0]) {
          return 0;
        }
        else {
          return (a[0] < b[0]) ? -1 : 1;
        }
      }
    },
    checkDuplicates(array){
      // console.log('kör')
      for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++){
          if (array[i][0] === array[j][0]){
            // console.log('duplicate ' + array[i] + ' ' + array[j])
            if (array[i][2] === array[j][2]){
              array[j][1] = Number(array[i][1]) + Number(array[j][1])
              array.splice(i, 1)
            }
          }
        }
      }
    
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';
@import '../assets/styles/main.scss';

ul {
  margin: 16px auto;
  width: 50vw;

  li {
    display: flex;
    justify-content: space-between;
  }

  span:first-of-type::first-letter {
    text-transform: uppercase;
  }
}
</style>