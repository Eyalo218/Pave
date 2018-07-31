<template>
<section>
    <div ref="image" class="img" :style="{ 'background-image': `url(${currPhoto})` }">
        <div class="flex space-between arrows">    
              <font-awesome-icon @click="lastPhoto" class="arrow btn btn2" icon="angle-left" size="3x" />  
              <font-awesome-icon @click="nextPhoto" class="arrow btn btn1"  icon="angle-right" size="3x" />
        </div>
    </div>
</section>
</template>

<script>
import { eventBus, MARKER_ADDED } from "@/service/eventBus.js";
export default {
  name: "photoDisplay",

  data: () => {
    return {
      photosUrls: [],
      currPhoto: null,
      currTrip: null
    };
  },
  created() {
    eventBus.$on("setTripPhotos", trip => {
      this.currTrip = trip;
        console.log('event');
      
      this.insertPhotosUrls(this.currTrip.markers);
      this.setFirstPhoto();
    });
    eventBus.$on("markerClicked", this.setPhotosByClickedMarker);
  },
  computed: {
    getCurrPhotoUrl() {}
  },
  methods: {
    lastPhoto() {
      let urls = this.photosUrls;
      for (var i = 0; i < urls.length; i++) {
        for (var j = 0; j < urls[i].length; j++) {
          if (urls[i][j] === this.currPhoto) {
            if (i === 0 && j === 0) {
              let newUrls = ("" + urls).split(",");
              this.currPhoto = newUrls[newUrls.length - 1];
              let currMarkerIdx = urls.length - 1;
              eventBus.$emit("changeMarker", {
                currMarkerIdx,
                marker: this.currTrip.markers[currMarkerIdx]
              });
              return;
            }
            this.currPhoto = urls[i][j - 1]
              ? urls[i][j - 1]
              : urls[i - 1][urls[i - 1].length - 1];
            if (!urls[i][j - 1]) {
              let currMarkerIdx = i - 1;
              eventBus.$emit("changeMarker", {
                currMarkerIdx,
                marker: this.currTrip.markers[currMarkerIdx]
              });
            }
            if (!this.currPhoto) this.currPhoto = urls[0][0];
            return;
          }
        }
      }
    },
    nextPhoto() {
      let urls = this.photosUrls;
      for (var i = 0; i < urls.length; i++) {
        for (var j = 0; j < urls[i].length; j++) {
          if (urls[i][j] === this.currPhoto) {
            if (i === urls.length - 1 && j === urls[i].length - 1) {
              let currMarkerIdx = 0;
              this.currPhoto = urls[0][0];
              eventBus.$emit("changeMarker", {
                currMarkerIdx,
                marker: this.currTrip.markers[currMarkerIdx]
              });
              return;
            }
            this.currPhoto = urls[i][j + 1] ? urls[i][j + 1] : urls[i + 1][0];
            if (!urls[i][j + 1]) {
              let currMarkerIdx = i + 1;
              eventBus.$emit("changeMarker", {
                currMarkerIdx,
                marker: this.currTrip.markers[currMarkerIdx]
              });
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
      console.log(this.photosUrls);
    },
    setFirstPhoto() {
      this.currPhoto = this.photosUrls[0][0];
    },
    setPhotosByClickedMarker(markerIdx) {
      this.currPhoto = this.photosUrls[markerIdx][0];
      
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  padding: 1rem;
}
.img {
  height: 350px;
  background-position: center;
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  &:hover > .arrows {
    transition: all 0.2s;
    opacity: 0.4;
  }
}
.arrows {
  transition: all 0.2s;
  width: 90%;
  position: absolute;
  z-index: 1;
  opacity: 0;
  top: 40%;
  left: 5%;
  color: black;
  .arrow:hover {
    cursor: pointer;
    opacity: 1;
  }
}
</style>
