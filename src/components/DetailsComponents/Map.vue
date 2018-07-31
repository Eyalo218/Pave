<template>
  <section class="map-cmp">
    <gmap-map zoom="12" :center="center" style="width:100%; height:95vh" ref="map">
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
import { eventBus, MARKER_ADDED } from "@/service/eventBus.js";

export default {
  name: "GoogleMap",
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
    eventBus.$on(MARKER_ADDED, currTripId => {
      location.reload();
      this.currTripId = currTripId;
    });
    eventBus.$on("changeMarker", currMarker => {
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
  mounted() {},
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
        console.log("trip", this.trip);
        //TODO:change to !hasMarkers later
        if (this.trip.markers.length === 0) {
          this.geolocate();
        } else {
          eventBus.$emit("setTripPhotos", this.trip);
          this.setPave();
        }
      });
    },
    setCurrMarker(currMarker, index) {
      this.$store.commit({ type: "setCurrMarker", currMarker });
      this.$refs[`marker${index}`][0].$markerObject.setAnimation(
        this.google.maps.Animation.BOUNCE
      );
      setTimeout(() => {
        this.$refs[`marker${index}`][0].$markerObject.setAnimation(null);
      }, 2100);
      this.$refs.map.$mapObject.panTo(
        googleService.setLatLng(
          currMarker.coords.lat,
          currMarker.coords.lng,
          this.google
        )
      );
      eventBus.$emit("markerClicked", index);
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
      var directionsService = googleService.getDirecService(this.google);
      var directionsDisplay = googleService.getDirecRender(this.google);
      console.log("in set routes:", this.$refs);
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
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>

<style scoped lang="scss">
.map-cmp {
  // padding: 0.5rem;
  padding: 1rem;
}
</style>