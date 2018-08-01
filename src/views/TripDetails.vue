<template>
    <section>
        <div>
            <trip-banner></trip-banner>
        </div>
        <div class="flex">
            <div class="map">
                <trip-map></trip-map>
            </div>
            <div class="components-container">
                <div v-if="photoMode" class="createMark">
                <create-mark></create-mark>
                </div>
                <div class="details">
                    <div class="photos">
                        <photo-display></photo-display>
                    </div>
                <div v-if="getCurrMarker" class="category-desc-container">
                    <p><span class="category">Category: &nbsp;</span><span>{{getCurrMarker.category}}</span></p>
                    <p class="desc">{{getCurrMarker.desc}}</p>
                </div>
                    <div class="reviews">
                        <Reviews></Reviews>
                    </div>
                </div>
            </div>
        </div>
        <div> 
            <button @click="togglePhotoMode()"><img src="../../public/img/details/camera.png" alt=""></button>
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
  padding: 2rem 0;
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
  z-index: 2;
  background: white;
  height: 100vh;
}
.components-container {
  position: relative;
  width: 50%;
  padding: 1rem 5rem;
}
</style>
