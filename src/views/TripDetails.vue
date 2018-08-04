<template>
    <section>
      <div v-if="checkMobile">
        <div class="nav-bar">
         <router-link :to="'/'">
          <font-awesome-icon class="home-link" icon="arrow-circle-left" size="1x" />
          </router-link>
        </div>
<div class="flex">
  <div class="map">
    <trip-map :mapHeight="setMapHeightInMobile"></trip-map>
  </div>
  <div class="components-container">
    <transition name="fade">
    <div v-if="photoMode" class="createMark">
      <create-mark></create-mark>
    </div>
    </transition>
    <div class="details">
      <div class="photos">
        <photo-display></photo-display>
      </div>
      <div class="buttons-container">
        <button @click="showCategory('markerDetails')"  :class="{'trip-det-button':true,
        'active-cat-btn':catWindow=== 'markerDetails'}">marker details</button>
        <button @click="showCategory('reviews')" class="trip-det-button" >comments</button>
        <button @click="togglePhotoMode()" class="trip-det-button">take a photo</button>
      </div>
      <transition mode="in-out" name="fade">
      <div key="1" v-show="catWindow === 'markerDetails'" v-if="getMarkers.length!==0" class="category-desc-container">
        <p> 
          <span class="category">Category: &nbsp;</span>
          <span>{{getCurrMarker.category}}</span>
        </p>
        <p class="desc">{{getCurrMarker.desc}}</p>
      </div>
      </transition>
      <transition name="fade">
      <div key="2" v-show="catWindow === 'reviews'" class="reviews">
        <Reviews></Reviews>
      </div>
      </transition>
    </div>
  </div>
</div>
</div>
<!-- mobile -->
<div v-if="!checkMobile">
   <div class="banner flex space-between align-center">
    <font-awesome-icon  class="icon" icon="map-marked-alt" size="2x" />
    <font-awesome-icon  class="icon" icon="camera-retro" size="2x" />
    <font-awesome-icon  class="icon" icon="comments" size="2x" />
  </div>
  <div class="flex all-container">
      <div v-show="showMobile==='map'" class="map">
        <trip-map :mapHeight="setMapHeightInMobile"></trip-map>
        <div class="camera-container">
        <font-awesome-icon @click="togglePhotoMode()" class="camera" icon="camera" style="padding:0 1rem;" size="1x" />
        </div>
      </div>
      
        <div v-if="photoMode" class="createMark">
          <create-mark></create-mark>
        </div>
        <div class="details">
          <div v-show="true" class="photos" >
             <div :class="{'desc-modal-shown':false}" class="desc-modal">
        </div>
            <photo-display></photo-display>
            <!-- @click="showMarkerDesc" -->
        <font-awesome-icon  class="info" icon="info"  />
          </div>
          <router-link :to="'/'" >
         <font-awesome-icon class="home-link" icon="arrow-circle-left" size="2x" />
         </router-link>
           <div  :class="{'category-desc-container-shown':false}" 
           v-if="getMarkers.length!==0" class="category-desc-container">
            <p>
              <span  class="category">Category: &nbsp;</span>
              <span>{{getCurrMarker.category}}</span>
            </p>
            <p class="desc">{{getCurrMarker.desc}}</p>
          </div>
          <div v-show="false" class="reviews">
            <Reviews></Reviews>
          </div>
        </div>
               
  </div>
  <div>
  </div>
</div>
    </section>
</template>

<script>
import tripMap from "@/components/DetailsComponents/Map.vue";
import photoDisplay from "@/components/DetailsComponents/PhotoDisplay.vue";
import Reviews from "@/components/DetailsComponents/Reviews.vue";
import createMark from "@/components/DetailsComponents/CreateMark.vue";
// import tripBanner from "@/components/DetailsComponents/TripBanner.vue";
import { eventBus, CHANGE_MARKER } from "@/service/eventBus.js";

export default {
  created() {
    console.log("trip details created");
  },
  components: {
    tripMap,
    photoDisplay,
    Reviews,
    createMark
  },
  data() {
    return {
      catWindow: "markerDetails",
      window: "map",
      photoMode: false
    };
  },
  created() {
    console.log(this.getCurrTrip);
  },
  computed: {
    getCurrTrip() {
            
      return this.$store.getters.getCurrTrip;
    },
    getCurrMarker() {
      if (!this.$store.getters.getCurrMarker) {
        return this.getMarkers[0];
      }
      return this.$store.getters.getCurrMarker;
    },
    getMarkers() {
      return this.$store.getters.markersForDisplay;
    },
    checkMobile() {
      if (window.innerWidth >= 800) return true;
    },
    setMapHeightInMobile() {
      if (window.innerWidth > 1100) return "90vh";
      else if (window.innerWidth <= 1100) return "70vh";
    },
    checkMobile() {
      if (window.innerWidth <= 800) return false;
      else return true;
    }
  },
  methods: {
    togglePhotoMode() {
      this.photoMode = !this.photoMode;
    },
    showMobile(window) {
      this.window = window;
    },
    showCategory(category) {
      this.catWindow = category;
    }
  }
};
</script>
<style lang="scss" scoped>
$main-black: #383633;
$mobile-height: 80vh;
$mobile-width: 80vw;
.map {
  width: 60%;
  box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.75);
}
.nav-bar {
  background-color: black;
  height: 25px;
  opacity: 0.7;
  margin-bottom: 0.4rem;
}
.active-cat-btn {
  color: #383633;
  background-color: #ededed;
  border-radius: 2rem;
  border: none;
  cursor: pointer;
}
.banner {
  padding: 0.5rem;
}
.photos {
  width: 95%;
  height: 300px;
  margin: 0 auto;
}
.buttons-container {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding-top: 1rem;
}

.home-link {
  margin: 0.2rem;
  color: #47809d;
  font-size: 1.15em;
  &:hover {
    transform: scale(1.15);
    color: #47809d;
  }
}
hr {
  border: 0;
  height: 1px;
  background: #333;
  background-image: linear-gradient(to right, #ccc, #333, #ccc);
}
.camera {
  cursor: pointer;
  color: $main-black;
  &:hover {
    transform: scale(1.15);
  }
}
.trip-det-button {
  color: #c9c9c9;
  background-color: transparent;
  border: none;
  font-family: "roboto-bold";
  font-size: 1rem;
  width: auto;
  &:hover {
    color: #383633;
    background-color: #ededed;
    border-radius: 2rem;
    border: none;
    // font-size: 1.2rem;
    cursor: pointer;
  }
}

.category-desc-container {
  padding: 3rem 0;
  margin-left: 6%;
  .category {
    color: $main-black;
    font-size: 1.3rem;
    font-weight: bold;
  }
  span {
    color: #47809d;
    font-weight: bold;
  }
  .desc {
    font-size: 0.8rem;
    padding: 0.5rem 0;
    width: 80%;
    font-weight: bold;
  }
}
button {
  width: 25%;
  z-index: 2;
  img {
    width: 80%;
  }
}
.createMark {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  background:#3836336e ;
  height: 100vh;
}
.components-container {
  // position: relative;
  width: 50%;
  padding: 1rem 2rem;
}
// media queries:
@media (max-width: 1100px) {
  .map {
    width: 70%;
  }
  .photos {
    width: 100%;
    height: 40vh;
    position: relative;
    .info {
      position: absolute;
      bottom: 2%;
      right: 4%;
      z-index: 2;
      color: white;
      cursor: pointer;
      font-size: 1.5em;
    }
    .info:hover {
      transform: scale(1.2);
    }
  }
  .components-container {
    position: relative;
    width: 50%;
    padding: 1rem 2rem;
  }
}
@media (max-width: 800px) {
  .home-link {
    // display: none;
    position: absolute;
    bottom: 3%;
    left: 5%;
    cursor: pointer;
  }
  .icon:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  .photos {
    width: 90vw;
    height: $mobile-height;
    box-shadow: 1px 1px 7px 1px black;
    // margin: 0 auto;
  }
  .map {
    width: 90vw;
    height: $mobile-height;
    position: relative;
  }
  .category-desc-container {
    position: absolute;
    bottom: 2%;
    transition: all 0.5s;
    // padding: 0 2rem;
    z-index: -1;
    opacity: 0;
    color: white;
    .category {
      color: white;
    }
    span {
      color: white;
    }
  }
  .desc-modal {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
    background-color: black;
    transition: all 0.5s;
  }
  .desc-modal-shown {
    // z-index: 1;
    opacity: 0.5;
    transition: all 0.5s;
  }
  .category-desc-container-shown {
    z-index: 3;
    bottom: 65%;
    transition: all 1s;
    opacity: 1;
    // z-index: 1;
  }
  .camera-container {
    background-color: white;
    border-radius: 50%;
    width: 20px;
    position: absolute;
    /* left: 0%; */
    bottom: 8%;
    padding: 1rem;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .reviews {
    width: $mobile-width;
    height: $mobile-height;
  }
  .all-container {
    margin: 0 1rem;
    padding-top: 1rem;
  }
}

// vue animations:
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
