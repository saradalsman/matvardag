<template>
  <div class="page_content">
    <h1>Skapa meny</h1>
    <form class="content_box" @submit.prevent="createMenu()">
      <fieldset>
        <div class="input_container" >
          <label for="startDay" >Menyn börjar på</label>
          <select v-model="startDay" v-validate="'required'" name="days" id="startDay" >
            <option v-for="(day, index) in weekdays" :key="index">{{day}}</option>
          </select>
        </div>
        <div v-if="submitted && errors.has('days')" class="text_warning">
          {{errors.first('days')}}
        </div>
          <!-- <Dropdown
            v-on:selected="startDay = $event"
            :content="weekdays"
            :name="'startDay'"
          /> -->
        <br>
        <div class="input_container">
          <label for="numberOfDays">Menyn varar i</label>
          <input v-model="numberOfDays" v-validate="'min_value:1|max_value:7|required'" type="number" id="numberOfDays" name="numberOfDays" placeholder="3" >
          <span> dagar </span>
        </div>
          <div v-if="submitted && errors.has('numberOfDays')" class="text_warning">
            {{errors.first('numberOfDays')}}
          </div>
      </fieldset>

      <!-- <fieldset>
        <legend>Menyn ska innehålla taggarna</legend>
        <div>
          <div v-for="(tag, index) in tags" :key="index">
            <input v-model="tagName" type="text" name="tag" placeholder="Soppa">
          </div>
          <br>
          <button v-on:click="addTag" type="button">Lägg till</button>
          <button v-on:click="removeTag" type="button">Ta bort</button>
        </div>
      </fieldset>
      <fieldset>
        <legend>Jag är sugen på...</legend>
        <div>
          <div v-for="(ingredient, index) in ingredients" :key="index">
            <input v-model="ingredientName" type="text" name="ingredient" placeholder="Quinoa">
          </div>
          <br>
          <button v-on:click="addTag" type="button">Lägg till</button>
          <button v-on:click="removeTag" type="button">Ta bort</button>
        </div>
      </fieldset> -->
      <button type="submit">Skapa</button>
    </form>
  </div>
</template>

<script>
import MenuService from "../services/menu.service";
import router from "../router"
import Dropdown from '../components/Dropdown'

export default {
  components: {
    Dropdown
  },
  data() {
    return {
      startDay: '',
      numberOfDays: '',
      tagName: '',
      tags: [1],
      ingredientName: '',
      ingredients: [1],
      recipes: [],
      weekdays: ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'],
      submitted: false,
    }
  },
  methods: {
    createMenu(){
      this.submitted = true;

      this.$validator.validate().then(isValid => {
        if (isValid) {
          let menu = {'days': this.numberOfDays, 'startDay': this.startDay}
          MenuService.create(menu)
          .catch(e => {
            console.log(e);  
          })
          .then(response => {
            router.push({
              name: 'mymenu',
              params: {startDay: response.data.day, menu: response.data.recipes, id: response.data.id}
            })
          })
        }
      })
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

.input_container {
  display: flex;
  margin: 0 auto;
  width: 50vw;

  select  {
    width: 50%;
    background-color: transparent;
  }
  
  input {
    width: 15%;
  }
}





</style>