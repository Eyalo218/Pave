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
      <transition mode="out-in" name="fade">
      <div key="1"  v-if="getMarkers.length!==0 && catWindow === 'markerDetails'" class="category-desc-container">
        <p> 
          <span class="category">Category: &nbsp;</span>
          <span>{{getCurrMarker.category}}</span>
        </p>
        <p class="desc">{{getCurrMarker.desc}}</p>
      </div>
      <div key="2" v-if="catWindow === 'reviews'" class="reviews">
        <Reviews></Reviews>
      </div>
      </transition>
    </div>
  </div>
</div>
</div>
<!-- mobile -->
<div v-if="!checkMobile">
   <div :class="{header:true,'header-map': mobileWindow === 'map','header-reviews':mobileWindow === 'reviews' }">
    <font-awesome-icon @click="showOnMobile('map')" :class="{icon:true,'active-icon-category':mobileWindow === 'map'}"
     icon="map-marked-alt" size="2x" />
    <font-awesome-icon @click="showOnMobile('photos')"  :class="{icon:true,'active-icon-category':mobileWindow === 'photos'}"
     icon="camera-retro" size="2x" />
    <font-awesome-icon @click="showOnMobile('reviews')" :class="{icon:true,'active-icon-category':mobileWindow === 'reviews'}"
     icon="comments" size="2x" />
  </div>
  <div class="flex all-container">
     <transition name="slide-map" >
      <div v-show="mobileWindow ==='map'" class="map">
        <trip-map :mapHeight="setMapHeightInMobile"></trip-map>
        <div class="camera-container">
        <font-awesome-icon @click="togglePhotoMode()" class="camera" icon="camera" style="padding:0 1rem;" size="1x" />
        </div>
      </div>
     </transition>
        <div v-if="photoMode" class="createMark">
          <create-mark></create-mark>
        </div>
        <div class="details">
          <transition  :name="animationName" >
          <div v-show="mobileWindow ==='photos'" class="photos" >
            <!--  -->
             <div :class="{'desc-modal':true,'desc-modal-shown':markerDetShown}">
        </div>
            <photo-display></photo-display>
            <transition name="fade-info" mode="out-in">
        <font-awesome-icon key="1" v-if="!markerDetShown" @click="markerDetShown=true" class="info" icon="info"  />
        <font-awesome-icon key="2" v-if="markerDetShown" @click="markerDetShown=false" class="info" icon="times"  />
            </transition>
          </div>
     </transition>
          <router-link :to="'/'" >
         <font-awesome-icon class="home-link" icon="arrow-circle-left" size="2x" />
         </router-link>
         <!-- marker details -->
         <transition name="marker-det-slide">
           <div :class="{'category-desc-container-shown':true}" 
          v-show="markerDetShown" v-if="getMarkers.length!==0" class="category-desc-container">
            <p>
              <span  class="category">Category: &nbsp;</span>
              <span>{{getCurrMarker.category}}</span>
            </p>
            <p class="desc">{{getCurrMarker.desc}}</p>
          </div>
         </transition>
          <transition name="slide-reviews">
          <div v-show="mobileWindow ==='reviews'" class="reviews">
            reviews
            <Reviews></Reviews>
          </div>
          </transition>
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
import { eventBus, CHANGE_MARKER, CLOSE_CAMERA } from "@/service/eventBus.js";

export default {
  components: {
    tripMap,
    photoDisplay,
    Reviews,
    createMark
  },
  data() {
    return {
      catWindow: "markerDetails",
      mobileWindow: "photos",
      photoMode: false,
      animationName: "slide-photos",
      markerDetShown: false
    };
  },
  created() {
    eventBus.$on(CLOSE_CAMERA, this.togglePhotoMode);
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
    setTransitionName() {
      if (this.mobileWindow === "map") {
        console.log("entered");
        return "slide-photos-from-map";
      } else return "slide-photos";
    },
    getMarkers() {
      return this.$store.getters.markersForDisplay;
    },
    checkMobile() {
      if (window.innerWidth >= 800) return true;
    },
    setMapHeightInMobile() {
      if (window.innerWidth > 1100) return "85vh";
      else if (window.innerWidth <= 1100) return "70vh";
    },
    checkMobile() {
      if (window.innerWidth <= 800) return false;
      else return true;
    }
  },
  methods: {
    togglePhotoMode() {
      console.log("swalalalalalalalal emit emit emit");

      this.photoMode = !this.photoMode;
    },
    showOnMobile(mobileWindow) {
      eventBus.$emit('changed-to-map');
      if (mobileWindow === "map") this.animationName = "slide-from-map";
      else this.animationName = "slide-photos";
      this.mobileWindow = mobileWindow;
      console.log(this.animationName);
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
  margin-top: 0.9rem;
  margin-left: 1.1rem;
}
.nav-bar {
  display: flex;
  align-items: center;
  background-color: black;
  height: 30px;
  opacity: 0.7;
  margin-bottom: 0.4rem;
}
.active-icon-category {
  color: #47809d;
}
.active-cat-btn {
  color: #383633;
  background-color: #ededed;
  border-radius: 2rem;
  border: none;
  cursor: pointer;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  // margin: 0 1rem;
  position: fixed;
  width: 100%;
  transition: all 0.5s;
}
.header-map {
  transform: translatex(45vw);
  transition: all 0.5s;
}
.header-reviews {
  transform: translatex(-45vw);
  transition: all 0.5s;
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
  background: #3836336e;
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
      bottom: 1.5%;
      right: 2%;
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
    font-size: 1.5em;
    // display: none;
    position: absolute;
    bottom: 3%;
    left: 5%;
    cursor: pointer;
  }
  .icon {
    padding: 0 0.5rem;
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
  .photos {
    width: 85vw;
    height: 80vh;
    background-color: #383633;
    box-shadow: 1px 1px 4px 1px black;
    border-radius: 3px;
  }
  .map {
    margin: 0;
    width: 90vw;
    height: $mobile-height;
    position: relative;
  }
  .category-desc-container {
    padding: 0;
    position: absolute;
    bottom: 2%;
    margin: 2%;
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
    margin: 0;
    padding-top: 3.5rem;
    justify-content: center;
  }
}

// vue animations:
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-info-enter-active,
.fade-info-leave-active {
  transition: opacity 0.4s;
}
.fade-info-enter,
.fade-info-leave-to {
  opacity: 0;
}
//map window:

.slide-map-enter-active {
  transition: all 0.5s;
}
.slide-map-leave-active {
  display: none;
}
.slide-map-enter {
  transform: translateX(-100vw);
  opacity: 1;
}
.slide-map-leave-to {
  transform: translateX(100vw);
  opacity: 1;
}

//photos window:
.slide-photos-leave-active {
  display: none;
}
.slide-photos-enter-active {
  transition: all 0.5s;
}
.slide-photos-enter {
  transform: translateX(70vw);
  opacity: 1;
}

//slide photos from map
.slide-from-map-enter {
  transform: translateX(100vw);
  opacity: 1;
}
.slide-from-map-enter-active {
  transition: all 0.5s;
}
.slide-from-map-leave-active {
  display: none;
}

//reviews window:
.slide-reviews-leave-active {
  display: none;
}
.slide-reviews-enter-active {
  transition: all 0.5s;
}
.slide-reviews-enter {
  transform: translateX(100vw);
  opacity: 1;
}
.slide-reviews-leave-to {
  transform: translateX(100vw);
  opacity: 1;
}

//marker details
.marker-det-slide-leave-active,
.marker-det-slide-enter-active {
  transition: all 1s;
}
.marker-det-slide-enter {
  transform: translateY(10vh);
  opacity: 0;
}
.marker-det-slide-leave-to {
  transform: translateY(10vh);
  opacity: 0;
}
</style>
