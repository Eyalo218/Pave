<template>
<section>
    <Camera v-if="!isPhotoTaken"></Camera>
    <div v-else>
        <div>
            <h1>Category</h1>
            <input v-model="category" list="categories">
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
            <textarea v-model="desc" name="" id="" cols="40" rows="5" maxlength="200"></textarea>
        </div>
        <button @click="createMark()">Accept</button>
    </div>
</section>
</template>

<script>
import Camera from "../components/DetailsComponents/Camera.vue";
import { eventBus, PHOTO_TAKEN, MARKER_ADDED } from "../service/eventBus.js";
import tripService from "../service/tripService.js";

export default {
  data() {
    return {
      isPhotoTaken: false,
      marker: null,
      category: null,
      desc: null,
      position: null
    };
  },
  components: {
    Camera
  },
  created() {
    eventBus.$on(PHOTO_TAKEN, this.toggleScreen);
    console.log(this.$store.state);
    
  },
  methods: {
    toggleScreen(marker) {
      this.marker = marker;
      this.isPhotoTaken = true;
    },
    createMark() {
      console.log(this.category, this.desc);
      this.marker.desc = this.desc;
      this.marker.category = this.category;
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
          this.position = position;
          resolve(position);
        });
      }).then(() => {
        this.marker.coords = {
          lat: this.position.coords.latitude,
          lng: this.position.coords.longitude
        };
        this.marker.createdAt = this.position.timestamp;
        this.updateTrip()
        
      });
    },
    updateTrip(){
        console.log(this.marker)
        var trip = this.$store.state.tripModule.currTrip;
        trip.markers.push(this.marker)
        tripService.editTrip(trip._id, trip)
        eventBus.$emit(MARKER_ADDED);
        this.$router.push('/trips/'+trip._id)
    }
  }
};
</script>

<style>
</style>
