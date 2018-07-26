<template>
  <div>
    <div>
      <h2>Search and add a pin</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
      <br/>
    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="16"
      style="width:100%;  height: 400px;"
      ref="map"
    >
      <!-- <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.cords"
        @click="center=m.cords"
      ></gmap-marker> -->
    </gmap-map>
  </div>
</template>

<script>
import axios from "axios";
import { gmapApi } from "vue2-google-maps";
const TRIPS_LINK = "http://localhost:3000/trips/";

export default {
  name: "GoogleMap",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      waypoints: [],
      currentPlace: null,
      origin: null,
      dest: null,
      mid: null
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
        // console.log(marker);
        if (idx === 0 || idx === this.markers.length - 1) return;
        this.waypoints.push({
          location: new this.googleMapsObj.maps.LatLng(
            marker.cords.lat,
            marker.cords.lng
          ),
          stopover: true
        });
      });
      return this.waypoints;
    }
  },
  mounted() {
    this.geolocate();
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    setMarkers(markers) {
      this.origin = markers[0];
      this.dest = markers[markers.length - 1];
      this.markers = markers;
    },
    setRoutes() {
      var directionsService = new this.googleMapsObj.maps.DirectionsService();
      var directionsDisplay = new this.googleMapsObj.maps.DirectionsRenderer();
      directionsDisplay.setMap(this.$refs.map.$mapObject);
      //   console.log("directions service", this.googleMapsObj.maps);

      console.log("origin", this.googleMapsObj.maps);
      console.log("dest", this.dest.cords);

      var request = {
        origin: new this.googleMapsObj.maps.LatLng(
          this.origin.cords.lat,
          this.origin.cords.lng
        ),
        destination: new this.googleMapsObj.maps.LatLng(
          this.dest.cords.lat,
          this.dest.cords.lng
        ),
        waypoints: this.setWayPts,
        optimizeWaypoints: true,
        travelMode: this.googleMapsObj.maps.TravelMode.WALKING
      };
      directionsService.route(request, function(response, status) {
        if (status == "OK") {
          //   console.log(response);
          directionsDisplay.setDirections(response);
        }
      });
    },
    setPave() {
      axios.get(`${TRIPS_LINK}${this.$route.params.tripId}`).then(res => {
        this.setMarkers(res.data.markers);
        this.setRoutes();
      });
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
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