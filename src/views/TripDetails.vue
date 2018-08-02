<template>
    <section>
        <div>
            <trip-banner></trip-banner>
        </div>
        <div>
            <div class="flex space-between">
                <div class="map">
                    <trip-map></trip-map>
                    <button @click="togglePhotoMode()"><img src="../../public/img/details/camera.png" alt=""></button>
                </div>
                <div class="components-container">
                    <div v-if="photoMode" class="createMark">
                        <create-mark></create-mark>
                    </div>
                    <div v-else class="details">
                        <div class="photos flex center">
                            <photo-display></photo-display>
                        </div>
                        <div  v-if="getMarkers.length!==0" class="category-desc-container">
                            <p><span onselectstart="return false;"  unselectable="on" class="category">Category: &nbsp;</span><span>{{getCurrMarker.category}}</span></p>
                            <p  class="desc">{{getCurrMarker.desc}}</p>
                        </div>
                        <div class="reviews">
                            <Reviews></Reviews>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </section>
</template>

<script>
import tripMap from "@/components/DetailsComponents/Map.vue";
import photoDisplay from "@/components/DetailsComponents/PhotoDisplay.vue";
import Reviews from "@/components/DetailsComponents/Reviews.vue";
import createMark from "@/components/DetailsComponents/CreateMark.vue";
import tripBanner from "@/components/DetailsComponents/TripBanner.vue";
import { eventBus, CHANGE_MARKER } from "@/service/eventBus.js";

export default {
  created() {
    console.log("trip details created");
  },
  components: {
    tripMap,
    photoDisplay,
    Reviews,
    createMark,
    tripBanner
  },
  data() {
    return {
      photoMode: false
    };
  },
  created() {
    console.log(this.getCurrTrip);
    // eventBus.$on(CHANGE_MARKER,)
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
    }
  },
  methods: {
    togglePhotoMode() {
      this.photoMode = !this.photoMode;
    }
  }
};
</script>

<style lang="scss" scoped>
$main-black: #383633;
.map {
  width: 50%;
}
.category-desc-container {
//   padding: 2rem 0;
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
    // padding: 0.5rem 0;
    width: 80%;
    font-weight: bold;
  }
}
button {
  width: 10%;
  z-index: 2;
  img {
    width: 80%;
  }
}
.createMark {
  position: absolute;
  width: 100%;
  z-index: 2;
  background: white;
  height: 100vh;
}
.components-container {
  position: relative;
  width: 50%;
  padding: 1rem 5rem;
}
.category-desc-container{
    p{
        margin-bottom:1.25rem;
        padding:0 40px;
    }
}
</style>
