<template>
<section class="photos">
  <div ><carousel ref="carousel" :loop="true" :perPage=1 :paginationEnabled="false" :navigationEnabled="true">
    <slide class="label" v-if="urls" :key="index" v-for="(url,index) in urls">
      <img :src="url" style="width: 100%;"/>
      </slide>
    </carousel></div>
    <!-- <div ref="image" class="img" :style="{ 'background-image': `url(${currPhoto})` }">
        <div class="flex space-between arrows">    
              <font-awesome-icon @click="lastPhoto" class="arrow btn btn2" icon="angle-left" size="3x" />  
              <font-awesome-icon @click="nextPhoto" class="arrow btn btn1"  icon="angle-right" size="3x" />
        </div>
    </div> -->
</section>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";
import {
  eventBus,
  MARKER_ADDED,
  CHANGE_MARKER,
  SET_TRIP_PHOTOS,
  MARKER_CLICKED
} from "@/service/eventBus.js";
export default {
  name: "photoDisplay",
  components: {
    Carousel,
    Slide
  },
  data: () => {
    return {
      photosUrls: [],
      currPhoto: null,
      currTrip: null
    };
  },
  // VueCarousel-navigation-button VueCarousel-navigation-next
  // VueCarousel-slide-active
  created() {
    eventBus.$on(SET_TRIP_PHOTOS, trip => {
      this.currTrip = trip;
      this.insertPhotosUrls(this.currTrip.markers);
      this.setFirstPhoto();
    });
    eventBus.$on(MARKER_CLICKED, this.setPhotosByClickedMarker);
  },
  mounted() {
    //  VueCarousel-slide label VueCarousel-slide-active VueCarousel-slide-center
    console.log(document.querySelectorAll(".VueCarousel-slide"));
    document
      .querySelector(".VueCarousel-navigation-next")
      .addEventListener("click", this.nextPhoto);
    document
      .querySelector(".VueCarousel-navigation-prev")
      .addEventListener("click", this.lastPhoto);
  },
  computed: {
    urls() {
      let urls;
      if (this.photosUrls.length !== 0) {
        urls = ("" + this.photosUrls).split(",");
        return urls;
      }
    },
    markersForDisplay() {
      return this.$store.getters.markersForDisplay;
    }
  },
  methods: {
    lastPhoto() {
      const carousel = this.$refs.carousel;
      console.log(carousel.currentPage);
      let urls = [];
      carousel.$el.querySelectorAll("img").forEach(img => {
        urls.push(img.currentSrc);
      });
      console.log(urls);
      for (let i = 0; i < this.markersForDisplay.length; i++) {
        for (let j = 0; j < this.markersForDisplay[i].photos.length; j++) {
          let markerPhotos = this.markersForDisplay[i].photos;
          // TODO: got the curr image by current page, just check the marker for it in i index
          if (urls[carousel.currentPage] === markerPhotos[j]) {
            console.log("i", i);

            console.log(markerPhotos[j]);
          }
        }
      }
      console.log();

      // let urls = this.photosUrls;
      // let newUrls = ("" + urls).split(",");
      // for (var i = 0; i < urls.length; i++) {
      //   for (var j = 0; j < urls[i].length; j++) {
      //     if (urls[i][j] === this.currPhoto) {
      //       if (i === 0 && j === 0) {
      //         this.currPhoto = newUrls[newUrls.length - 1];
      //         let currMarkerIdx = urls.length - 1;
      //         let currMarker = this.currTrip.markers[currMarkerIdx];
      //         this.$store.commit({ type: "setCurrMarker", currMarker });
      //         eventBus.$emit(CHANGE_MARKER, {
      //           currMarkerIdx,
      //           marker: this.currTrip.markers[currMarkerIdx]
      //         });
      //         return;
      //       }
      //       this.currPhoto = urls[i][j - 1]
      //         ? urls[i][j - 1]
      //         : urls[i - 1][urls[i - 1].length - 1];
      //       if (!urls[i][j - 1]) {
      //         let currMarkerIdx = i - 1;
      //         let currMarker = this.currTrip.markers[currMarkerIdx];
      //         this.$store.commit({ type: "setCurrMarker", currMarker });
      //         eventBus.$emit(CHANGE_MARKER, {
      //           currMarkerIdx,
      //           marker: this.currTrip.markers[currMarkerIdx]
      //         });
      //       }
      //       if (!this.currPhoto) this.currPhoto = urls[0][0];
      //       return;
      //     }
      //   }
      // }
    },
    nextPhoto() {
      let urls = this.photosUrls;
      for (var i = 0; i < urls.length; i++) {
        for (var j = 0; j < urls[i].length; j++) {
          if (urls[i][j] === this.currPhoto) {
            if (i === urls.length - 1 && j === urls[i].length - 1) {
              let currMarkerIdx = 0;
              this.currPhoto = urls[0][0];
              eventBus.$emit(CHANGE_MARKER, {
                currMarkerIdx,
                marker: this.currTrip.markers[currMarkerIdx]
              });
              let currMarker = this.currTrip.markers[currMarkerIdx];
              this.$store.commit({ type: "setCurrMarker", currMarker });
              return;
            }
            this.currPhoto = urls[i][j + 1] ? urls[i][j + 1] : urls[i + 1][0];
            if (!urls[i][j + 1]) {
              let currMarkerIdx = i + 1;
              eventBus.$emit(CHANGE_MARKER, {
                currMarkerIdx,
                marker: this.currTrip.markers[currMarkerIdx]
              });
              let currMarker = this.currTrip.markers[currMarkerIdx];
              this.$store.commit({ type: "setCurrMarker", currMarker });
            }
            return;
          }
        }
      }
    },
    insertPhotosUrls(markers) {
      this.photosUrls = markers.map(marker => {
        return marker.photos.map(photo => photo);
      });
    },
    setFirstPhoto() {
      this.currPhoto = this.photosUrls[0][0];
      console.log(this.currTrip.markers[0]);
    },
    setPhotosByClickedMarker(markerIdx) {
      // this.currMarkerIdx = markerIdx;
      let currMarker = this.$store.getters.markersForDisplay[markerIdx];
      this.$store.commit({ type: "setCurrMarker", currMarker });
      const carousel = this.$refs.carousel;
      // MARKER HAS TWO PHOTOS >
      carousel.goToPage(markerIdx + 1);
    }
  }
};
</script>

<style lang="scss" scoped>
$main-black: #383633;
section {
  // padding: 1rem;
  width: 100%;
  // max-width: 450px;
  // min-width: 200px;
}

.img {
  height: 100%;
  border-radius: 5px;
  background-position: center;
  position: relative;
  background-repeat: no-repeat;
  background-size: contain;
  border: 2px solid #47809d;
  background-color: $main-black;
  &:hover > .arrows {
    transition: all 0.2s;
    opacity: 0.4;
  }
  align-self: center;
}
.photos {
  height: auto;
}
.arrows {
  transition: all 0.2s;
  width: 90%;
  position: absolute;
  z-index: 1;
  opacity: 0;
  top: 40%;
  left: 5%;
  color: white;
  .arrow:hover {
    cursor: pointer;
    opacity: 1;
  }
}
</style>
