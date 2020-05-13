<template>
  <div class="dropdown" v-on-clickaway="away" v-on:click="showDropdown=!showDropdown">
      <span v-bind:value="selected" v-bind:name="name">{{selected}}</span>
        <ul v-if="showDropdown" >
          <li v-for="(item, index) in content" :key="index" v-on:click="setSelected(item)" >
            {{item}}
          </li>
        </ul>
    </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
	props: {
    content: {
      type: Array,
      required: true,
		},
		name: {
			type: String,
			required: true,
		},
	},
  mixins: 
    [ clickaway ],
  data() {
    return {
      selected: '',
      showDropdown: false,
    }
  },
  methods: {
    away(){
      this.showDropdown = false
		},
		setSelected(value){
			this.selected = value;
			this.$emit('selected', value)
		}
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';
@import '../assets/styles/main.scss';

  .dropdown {
		position: relative;
		border-bottom: 2px solid pink;
		padding: 0 50px 0 5px;
  }


	ul {
    z-index: 100;
    position: absolute;
    left: 0;
    top: 0;
    background-color: white;
    padding-inline-start: 10px;
	}
</style>