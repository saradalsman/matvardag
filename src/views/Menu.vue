<template>
  <div class="page_content">
    <h1>Min meny</h1>
    <div class="content_box" v-if="savedMenu.length === 0">
      <p>Hittade ingen meny</p>
      <p>Gå
        <a href="/mymenu/create">hit</a>
        för att skapa en meny av dina sparade recept
      </p>
    </div>
    <div class="content_box">
      <div v-for="(item, index) in savedMenu" :key="index" class="menu_item">
        <RecipeLink :day="menudays[index]" :recipeId="item" />
        <div class="move_buttons">
          <div class="move_up" v-on:click="moveUp(item, index)">
            <font-awesome-icon icon="chevron-up" />
          </div>
          <div class="swap" v-on:click="swapRecipe(item, index)">
            <font-awesome-icon icon="sync-alt" />
          </div>
          <div class="move_down" v-on:click="moveDown(item, index)">
            <font-awesome-icon icon="chevron-down" />
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import MenuService from "../services/menu.service";
import RecipeService from "../services/recipe.service";
import RecipeLink from '../components/RecipeLink'
export default {
  props: {
    startDay: {
      type: String,
      required: false,
    },
    menu: {
      type: Array,
      required: false,
    },
    id: {
      type: Number,
      required: false,
    }
  },
  components: {
    RecipeLink,
  },
  data () {
    return {
      savedMenu: this.menu,
      day: this.startDay,
      weekdays: ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'],
      menudays: [],
      menuId: this.id,
    }
  },
  created() {
    MenuService.getLast()
      .then(response => {
        if (response.data.length > 0 && response.data[0].recipes){
          this.savedMenu = response.data[0].recipes
          this.menuId = response.data[0].id
          this.day = response.data[0].day
          this.createDays(response.data[0].day)
        }
    })
    .catch(
      this.savedMenu=[],
      this.menuId = ''
    )
  },
  methods: {
    createDays(day){
      let days1 = []
      let days2 = []
      const index = this.weekdays.indexOf(day)

      for (let i = 0; i < index; i++){
        days2[i] = this.weekdays[i]
      }
      // console.log(days2)

      for (let i = 0; i < this.weekdays.length; i ++){
        if (this.weekdays[i+index] === undefined){
          break;
        }
        days1[i] = this.weekdays[i+index]
      }
      // console.log(days1)
      this.menudays = days1.concat(days2)
      // console.log(this.menudays)
    },
    moveUp(id, index) {
      let newMenu = this.savedMenu
      const temp = newMenu[index]
      newMenu[index] = newMenu[index-1]
      newMenu[index-1] = temp

      let menu = {'recipes': newMenu}
      this.updateMenu(menu)
    },
    moveDown(id, index) {
      let newMenu = this.savedMenu
      const temp = newMenu[index]
      newMenu[index] = newMenu[index+1]
      newMenu[index+1] = temp

      let menu = {'recipes': newMenu}
      this.updateMenu(menu)
    },
    swapRecipe(id, index){
      let newMenu = this.savedMenu

      RecipeService.getRandom(id)
      .then(response => {
        newMenu.splice(index, 1, response.data.id)
        let menu = {'recipes': newMenu}
        this.updateMenu(menu)
      })
    },
    updateMenu(menu) {
      MenuService.update(this.menuId, menu)
      .catch(e => {
        console.log(e);  
      })
      .then( response => {
      MenuService.getLast()
          .then(response => {
          this.savedMenu = response.data[0].recipes
          this.menuId = response.data[0].id
        })
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';
@import '../assets/styles/main.scss';

.content_box {
  padding: 0;
  padding-bottom: 20px;
}

  .menu_item {
    display: grid;
    grid-template-columns: auto 10%;
    border-bottom: 1px dashed $dark-accent;
    padding: 15px 0;
    // height: 20vh;
  }

  .menu_item:last-of-type {
    border-bottom: none;
  }

  .menu_item:first-of-type .move_buttons .move_up {
    display: none;
  }

  .menu_item:last-of-type .move_buttons .move_down {
    display: none;
  }

.move_buttons {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
  color: $dark-accent;
    
  .move_up {
    grid-row: 1;
    cursor: pointer;
  }

  .swap {
    grid-row: 2;
    cursor: pointer;
  }
  
  .move_down {
    grid-row: 3;
    cursor: pointer;
  }  
}



</style>