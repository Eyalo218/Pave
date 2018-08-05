<template>
<section>
    <Camera v-if="!isPhotoTaken"></Camera>
    <div v-else class="input-container flex column center align-center">
      <div class="card flex column align-center center">
        <h1>New Marker</h1>
        <div class="input flex column center align-center">
          <input  class="title" v-model="title" type="text" placeholder="Title">
            <input class="title" v-model="category" list="categories" placeholder="Categories">
            <datalist id="categories">
                <option value="Landscape"></option>
                <option value="Urban"></option>
                <option value="Food"></option>
                <option value="Historical"></option>
                <option value="Shopping"></option>
                <option value="Party"></option>
                <option value="Animals"></option>
            </datalist>
            <textarea class="description" placeholder="Description" v-model="desc" name="" id="" rows="5" maxlength="200"></textarea>
            <button class="createBtn" @click="createMark()">Accept</button>
    </div>
  </div>
  </div>
</section>
</template>

<script>
import Camera from "./Camera.vue";
import { eventBus, PHOTO_TAKEN, MARKER_ADDED } from "@/service/eventBus.js";
import tripService from "@/service/tripService.js";

export default {
  data() {
    return {
      isPhotoTaken: false,
      marker: null,
      category: null,
      desc: null,
      position: null,
      title:null
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
      this.marker.title = this.title;
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
        this.updateTrip();
      });
    },
    updateTrip() {
      console.log(this.marker);
      var trip = this.$store.state.tripModule.currTrip;
      trip.markers.push(this.marker);
      tripService.editTrip(trip._id, trip);
      eventBus.$emit(MARKER_ADDED, trip._id);
      this.$router.push("/trips/" + trip._id);
    }
  }
};
</script>

<style lang="scss" scoped>
.input-container{
  height: 100vh;
  input, textarea{
    width:300px;
  }
  h1{
    margin:1.1rem 0;
  }
  .card{
  background:#ffffff;
  box-shadow: 0px 0px 20px -2px rgba(38,38,38,1);
  width:520px;
  padding:1rem 1rem;
  }
.title {
    padding: 0.8rem;
    margin: 1.2rem 0;
    border-radius: 5px;
    border: 1px solid #EDEDED;
    width:100%;
  }

.description  {
    margin-bottom: 1rem;
    padding: 0.8rem;
    height: 4rem;
    border-radius: 5px;
    border: 1px solid #EDEDED;
    width:100%;
  }
  .input{
    width:80%;
    
  }
  .createBtn{
    width:107%;
    height:1.8rem;
    border-radius: 5px;
    background-color: #363833;
    color:#44809e;
    box-shadow: none;
    border:none;
    margin-bottom:1rem;
}
}

</style>
