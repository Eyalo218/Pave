<template>
<section>
    <Camera v-if="!isPhotoTaken"></Camera>
    <div v-else>
        <div>
            <h1>Category</h1>
            <input list="categories">
            <datalist id="categories">
                <option value="Landscape"></option>
                <option value="Urban"></option>
                <option value="Food"></option>
                <option value="Historical"></option>
                <option value="Shopping"></option>
                <option value="Party"></option>
                <option value="Animals"></option>
            </datalist>
        </div>
        <div>
            <h1>Description</h1>
            <textarea name="" id="" cols="30" rows="5"></textarea>
        </div>
    </div>
</section>
</template>

<script>
import Camera from "../components/DetailsComponents/Camera.vue";
import {eventBus, PHOTO_TAKEN} from '../service/eventBus.js';

export default {
  data() {
    return {
      isPhotoTaken: false
    };
  },
  components: {
    Camera
  },
  created(){
      eventBus.$on(PHOTO_TAKEN, this.toggleScreen)
  },
  methods:{
      toggleScreen(){
          this.isPhotoTaken = true;
      }
  }
};



</script>

<style>
</style>
