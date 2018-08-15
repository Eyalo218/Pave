  <template>
  <section class="map-cmp">
    <gmap-map  :zoom="18" :center="center" :style="`width:100%; height:${mapHeight}`" ref="map">
      <gmap-marker
        :key="index"
        v-for="(marker, index) in markersForDisplay"
        :position="marker.coords"
        @click="setCurrMarker(marker,index)"
        :icon="{url:displayIconUrl(marker.category)}"
        :ref="'marker'+index"
      ></gmap-marker>
    </gmap-map>
  </section>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import googleService from "@/service/googleService.js";
import tripService from "@/service/tripService.js";
import {
  eventBus,
  MARKER_ADDED,
  CHANGE_MARKER,
  SET_TRIP_PHOTOS,
  MARKER_CLICKED
} from "@/service/eventBus.js";

export default {
  name: "GoogleMap",
  props: ["mapHeight"],
  data() {
    return {
      trip: null,
      origin: null,
      dest: null,
      center: { lat: 0, lng: 0 },
      currTripId: null
    };
  },
  created() {
    eventBus.$on("changed-to-map", () => {
      this.setZoomOnMobile();
    });
    eventBus.$on(MARKER_ADDED, currTripId => {
      location.reload();
      this.currTripId = currTripId;
    });
    eventBus.$on(CHANGE_MARKER, currMarker => {
      this.$refs.map.$mapObject.panTo(
        googleService.setLatLng(
          currMarker.marker.coords.lat,
          currMarker.marker.coords.lng,
          this.google
        )
      );
    });
    this.setCurrTrip(this.currTripId);
  },
  computed: {
    google() {
      if (!gmapApi()) location.reload();
      return gmapApi();
    },
    markersForDisplay() {
      return this.$store.getters.markersForDisplay;
    },
    setWayPts() {
      return googleService.getWayPts(this.markersForDisplay, this.google);
    }
  },
  methods: {
    setPave() {
      this.setMarkers();
      this.setRoutes();
    },
    setPlace(place) {
      this.currentPlace = place;
    },
    displayIconUrl(category) {
      return googleService.getIconUrl(category);
    },
    setCurrTrip(currTripId) {
      if (!currTripId) currTripId = this.$route.params.tripId;
      this.$store.dispatch({ type: "setCurrTrip", currTripId }).then(() => {
        this.trip = this.$store.state.tripModule.currTrip;
        if (this.checkMarkersCount()) return;
        eventBus.$emit(SET_TRIP_PHOTOS, this.trip);
        this.setPave();
      });
    },
    setCurrMarker(currMarker, index) {
      this.$store.commit({ type: "setCurrMarker", currMarker });
      this.setselectedIconUrl(index);
      this.$refs.map.$mapObject.panTo(
        googleService.setLatLng(
          currMarker.coords.lat,
          currMarker.coords.lng,
          this.google
        )
      );
      eventBus.$emit(MARKER_CLICKED, index);
      this.switchToPhotosOnMobile();
    },
    setMarkers() {
      let markers = this.trip.markers;
      this.$store.commit({ type: "setMarkers", markers });
      this.origin = markers[0];
      this.dest = markers[markers.length - 1];
    },
    setBounds() {
      return googleService.getBounds(this.markersForDisplay, this.google);
    },
    setRoutes() {
      if (this.trip.markers.length <= 1) if (!this.checkMarkersCount()) return;
      var directionsService = googleService.getDirecService(this.google);
      var directionsDisplay = googleService.getDirecRender(this.google);
      directionsDisplay.setMap(this.$refs.map.$mapObject);
      let request = googleService.getRequest(
        this.origin,
        this.dest,
        this.setWayPts,
        this.google
      );
      directionsService.route(request, (response, status) => {
        if (status == "OK") {
          directionsDisplay.setDirections(response);
          this.$refs.map.fitBounds(this.setBounds());
          this.$refs.map.panToBounds(this.setBounds());
        }
      });
    },
    setZoomOnMobile() {
      if (window.innerWidth <= 800) this.$refs.map.$mapObject.setZoom(13);
    },
    switchToPhotosOnMobile() {
      if (window.innerWidth > 800) return;
      eventBus.$emit("switch-to-photos");
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    checkMarkersCount() {
      if (!this.trip.markers.length) {
        this.geolocate();
        return true;
      }
      if (this.trip.markers.length === 1) {
        this.center = this.trip.markers[0].coords;
        return false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.map-cmp {
  padding: 1rem;
}
</style>