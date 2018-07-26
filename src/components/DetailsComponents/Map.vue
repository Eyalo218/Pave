<template>
  <div>
    <div>
      <h2>map component</h2>
      <br/>
    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="16"
      style="width:100%;  height: 400px;"
      ref="map"
    >
      <gmap-marker
        :key="index"
        v-for="(marker, index) in markers"
        :position="marker.cords"
        @click="center=marker.cords"
        :icon="{url:displayIconUrl(marker.category)}"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import axios from "axios";
import { gmapApi } from "vue2-google-maps";
import googleService from "@/service/googleService.js";
const TRIPS_LINK = "http://localhost:3000/trips/";

export default {
  name: "GoogleMap",
  data() {
    return {
      center: { lat: 0, lng: 0 },
      markers: [],
      origin: null,
      dest: null,
      waypoints: []
    };
  },
  created() {
    this.setPave();
  },
  computed: {
    googleMapsObj() {
      return gmapApi();
    },
    setWayPts() {
      this.markers.forEach((marker, idx) => {
        if (idx === 0 || idx === this.markers.length - 1) return;
        this.waypoints.push(
          googleService.setWayPoint(
            marker.cords.lat,
            marker.cords.lng,
            this.googleMapsObj
          )
        );
      });
      return this.waypoints;
    }
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    displayIconUrl(category) {
      return googleService.getIconUrl(category);
    },
    setMarkers(markers) {
      this.origin = markers[0];
      this.dest = markers[markers.length - 1];
      this.markers = markers;
    },
    setRoutes() {
      var directionsService = googleService.getDirecService(this.googleMapsObj);
      var directionsDisplay = googleService.getDirecRender(this.googleMapsObj);
      directionsDisplay.setMap(this.$refs.map.$mapObject);

      var pave = {
        origin: googleService.setLatLng(
          this.origin.cords.lat,
          this.origin.cords.lng,
          this.googleMapsObj
        ),
        destination: googleService.setLatLng(
          this.dest.cords.lat,
          this.dest.cords.lng,
          this.googleMapsObj
        ),
        waypoints: this.setWayPts,
        optimizeWaypoints: true,
        travelMode: this.googleMapsObj.maps.TravelMode.WALKING
      };
      directionsService.route(pave, function(response, status) {
        if (status == "OK") {
          directionsDisplay.setDirections(response);
        }
      });
    },
    geolocate: () => {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    setPave() {
      axios.get(`${TRIPS_LINK}${this.$route.params.tripId}`).then(res => {
        this.setMarkers(res.data.markers);
        this.setRoutes();
      });
    }
  }
};
</script>