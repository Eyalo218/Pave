<template>
  <div>
    <div>
      <h2>map component</h2>
      <br/>
    </div>
    <br>
    <gmap-map
      :center="center"
      style="width:100%;  height: 400px;"
      ref="map"
    >
      <gmap-marker
        :key="index"
        v-for="(marker, index) in markersForDisplay"
        :position="marker.cords"
        @click="setCurrMarker(marker,index)"
        :icon="{url:displayIconUrl(marker.category)}"
        :ref="'marker'+index"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import googleService from "@/service/googleService.js";
import tripService from "@/service/tripService.js";

export default {
  name: "GoogleMap",
  data() {
    return {
      trip: null,
      origin: null,
      dest: null,
      center: { lat: 0, lng: 0 }
    };
  },
  created() {
    this.setCurrTrip();
  },
  computed: {
    googleMapsObj() {
      return gmapApi();
    },
    markersForDisplay() {
      return this.$store.getters.markersForDisplay;
    },
    setWayPts() {
      let wayPts = [];
      this.markersForDisplay.forEach((marker, idx) => {
        if (idx === 0 || idx === this.markersForDisplay.length - 1) return;
        wayPts.push(
          googleService.setWayPoint(
            marker.cords.lat,
            marker.cords.lng,
            this.googleMapsObj
          )
        );
      });
      console.log(wayPts);
      return wayPts;
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
    setCurrTrip() {
      let currTripId = this.$route.params.tripId;
      this.$store.dispatch({ type: "setCurrTrip", currTripId }).then(() => {
        this.trip = this.$store.state.tripModule.currTrip;
        console.log("curr trip: ", this.trip);
        this.setPave();
      });
    },
    setCurrMarker(currMarker, index) {
      this.$store.commit({ type: "setCurrMarker", currMarker });
      console.log(this.$refs.map);
      //   this.$refs.marker.$markerObject.setAnimation(google.maps.Animation.BOUNCE)
      this.$refs[`marker${index}`][0].$markerObject.setAnimation(
        this.googleMapsObj.maps.Animation.BOUNCE
      );
      setTimeout(() => {
        this.$refs[`marker${index}`][0].$markerObject.setAnimation(null);
      }, 2100);
      //   this.$refs.map.$mapObject.panTo()
      //   this.$refs.map.$mapObject.panTo(
      //     googleService.setLatLng(
      //       currMarker.cords.lat,
      //       currMarker.cords.lat,
      //       this.googleMapsObj
      //     )
      //   );
      //   this.$refs.map.$mapObject.getCenter().lat();
      //   this.$refs.map.$mapObject.getCenter().lng();

      this.$refs.map.$mapObject.panBy(
        (this.$refs.map.$mapObject.getCenter().lat() - currMarker.cords.lat)*428,
        this.$refs.map.$mapObject.getCenter().lng() - currMarker.cords.lng
      );

      //   this.center = currMarker.cords;
      console.log(this.$refs.map);
    },
    setMarkers() {
      let markers = this.trip.markers;
      this.$store.commit({ type: "setMarkers", markers });
      this.origin = markers[0];
      this.dest = markers[markers.length - 1];
    },
    setBounds() {
      return googleService.getBounds(
        this.markersForDisplay,
        this.googleMapsObj
      );
    },
    setRoutes() {
      var directionsService = googleService.getDirecService(this.googleMapsObj);
      var directionsDisplay = googleService.getDirecRender(this.googleMapsObj);
      directionsDisplay.setMap(this.$refs.map.$mapObject);
      // BUGS:
      // ONLY ONE AND TWO WAYPTS-NEED TO FIX
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
      directionsService.route(pave, (response, status) => {
        if (status == "OK") {
          console.log(this.googleMapsObj.maps);

          directionsDisplay.setDirections(response);
        }
      });
      //   this.$refs.map.$children[0].animation = 'BOUNCE';
      this.$refs.map.fitBounds(this.setBounds());
      this.$refs.map.panToBounds(this.setBounds());
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