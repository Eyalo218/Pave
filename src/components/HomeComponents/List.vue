<template>
    <section>
        <div class="list-container">
            <h1 class="active-trips-header">Active Trips</h1>
            <ul v-if="activeTrips" class="trips">
                <li class="h-list-item" v-for="(trip,idx) in activeTrips" :key="idx" >
                    <active-pulse v-if="trip.isActive" class="active-pulse"></active-pulse>
                    <router-link :to="`trips/${trip._id}`">  
                            <img class="item-img" :src="`${trip.image}`">
                    </router-link>
                    <div class="trip-info">
                      <div class=title>{{trip.title}}</div>
                      <div class="rank">
                    <star-rating class="stars" active-color="#44809e" :rating="trip.avgReviews" :read-only="true" :increment="0.5" :show-rating="false"  :star-size="13">
                    </star-rating> 
                      </div>
                      <div class="country">{{trip.country}}</div>
                    </div>
                </li>
                <li li class="h-list-item">
                    <a @click="openExplore('active')">
                     <div class="cover"><p>Show me more &nbsp; <font-awesome-icon icon="angle-right" class="icon" size="1x" />  </p> </div>
                    </a>
                      <img class="item-img" src="https://images.pexels.com/photos/546157/pexels-photo-546157.jpeg?auto=compress&cs=tinysrgb&h=650&w=940">
                </li>
            </ul>
            <hr/>
            <!-- sorted: -->
           <h1 class="active-trips-header">Highly rated trips</h1>
            <ul v-if="activeTrips" class="trips">
                <li class="h-list-item" v-for="(trip,idx) in sortedTrips" :key="idx" >
                    <active-pulse v-if="trip.isActive" class="active-pulse"></active-pulse>
                    <router-link :to="`trips/${trip._id}`">  
                            <img class="item-img" :src="`${trip.image}`">
                    </router-link>
                    <div class="trip-info">
                      <div class=title>{{trip.title}}</div>
                      <div class="rank">
                    <star-rating class="stars" active-color="#44809e" :rating="trip.avgReviews" :read-only="true" :increment="0.5" :show-rating="false"  :star-size="13">
                    </star-rating> 
                      </div>
                      <div class="country">{{trip.country}}</div>
                    </div>
                </li>
                <li li class="h-list-item">
                    <a  @click="openExplore('active')">
                     <div class="cover"><p>For all the trips &nbsp; <font-awesome-icon icon="angle-right" class="icon" size="1x" />  </p> </div>
                    </a>
                      <img class="item-img" src="https://images.pexels.com/photos/546157/pexels-photo-546157.jpeg?auto=compress&cs=tinysrgb&h=650&w=940">
                </li>
            </ul>
        </div>
        <hr/>
    </section>
</template>

<script>
import activePulse from "@/components/HomeComponents/ActivePulse.vue";
import { eventBus, OPEN_EXPLORE } from "../../service/eventBus.js";
export default {
  name: "ListHome",
  data() {
    return {
      activeTrips: null,
      sortedTrips: null
    };
  },
  components: {
    activePulse
  },
  created() {
    this.loadActiveTrips();
    this.loadSortedTrips();
  },
  computed: {},
  methods: {
    loadActiveTrips() {
      this.$store.dispatch({ type: "loadActiveTrips" }).then(() => {
        this.activeTrips = this.setTripsForDisplay(
          this.$store.getters.activeTripsForDisplay
        );
      });
    },
    loadSortedTrips() {
      this.$store.dispatch({ type: "loadSortedTrips" }).then(() => {
        this.sortedTrips = this.setTripsForDisplay(
          this.$store.getters.sortedTripsForDisplay
        );
      });
    },
    setTripsForDisplay(trips) {
      trips = trips.slice();
      return trips.splice(0, 3);
    },
    openExplore(filterBy) {
      if (filterBy === "active")
        eventBus.$emit(OPEN_EXPLORE, this.$store.getters.activeTripsForDisplay);
    }
  }
};
</script>
<style lang="scss" scoped>
$main-black: #383633;
$main-blue: #44809e;
hr {
  margin: 2rem 0;
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(201, 194, 194, 0),
    rgba(201, 194, 194, 0.75),
    rgba(201, 194, 194, 0)
  );
}
li {
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
  }
  &:hover .title{
    color: $main-blue;
  }
  position: relative;
  .active-pulse {
    position: absolute;
    top: 2%;
    left: -11%;
  }
}
section {
  padding: 0 13%;
  margin-bottom: 5rem;
}
.active-trips-header {
  font-size: 1.5rem;
  text-align: left;
  color: $main-black;
  @media (max-width: 800px) {
    font-size: 1.3rem;
  }
  @media (max-width: 450px) {
    font-size: 1.1rem;
  }
}
.trips {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
}
h1 {
  text-align: center;
}
.h-list-item {
  width: 45%;
  margin: 5px 5px 3rem 5px;
}
section .list-container {
  margin: 0 0;
}
.item-img {
  width: 100%;
  // box-shadow: 1px 2px 5px #262626;
}
.cover {
  // width: 45%;
  // height: 7rem;
  cursor: pointer;
  color: white;
  background-color: rgba(0, 132, 137, 0.6);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  p {
    text-align: center;
    font-size: 1.2rem;
    .icon {
      // padding-top: 10%;
    }
  }
}
.review-dot {
  width: 12px;
}

@media screen and (min-width: 415px) {
  .list-container {
    font-family: "roboto-medium";
    color: #383633;
    width: 85%;
    margin: 0 auto;
    margin-bottom: 4rem;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 0;
      padding: 0;
    }
    .cover {
      width: 14.5rem;
      height: 10rem;
    }
    .h-list-item {
      display: flex;
      flex-direction: column;
      margin-bottom: 4rem;
      width: 14.5rem;
    }
    .item-img {
      position: relative;
      width: 14.5rem;
      height: 10rem;
    }
    .title {
      font-size: 1rem;
      padding-top: 0.2rem;
    }
    .rank {
      font-family: "roboto-regular";
    }
    .country {
      font-size: 0.8rem;
      font-family: "roboto-medium";
    }
  }
  h1 {
    margin-bottom: 2rem;
  }
  .list-container {
    width: 100%;
  }
}

@media screen and (min-width: 550px) {
  .trips {
    display: flex;
    justify-content: space-around;
  }
}
@media screen and (min-width: 600px) {
  .trips {
    display: flex;
    justify-content: space-around;
    .h-list-item,
    .cover {
      width: 45%;
      height: 10rem;
      min-height: 10rem;
    }
    .item-img {
      width: 100%;
    }
  }
}

@media screen and (min-width: 900px) {
  .trips {
    .item-img {
      width: 100%;
      height: 170px;
    }
    .h-list-item,
    .cover {
      height: 170px;
    }
  }
}

@media screen and (min-width: 1024px) {
  .trips {
    .item-img {
      width: 16vw;
      height: 170px;
    }
    .h-list-item,
    .cover {
      width: 16vw;
      height: 170px;
    }
  }
}
@media (max-width: 415px) {
  section{
    margin-bottom: 3rem;
  }
  .active-trips-header {
    margin-bottom: 0.5rem;
    padding-left: 1%;
  }
  .item-img {
    height: 90px;
  }
  .trips {
    justify-content: space-between;
  }
  .trip-info {
    margin-top: 0.5rem;
    .title {
      font-size: 0.8rem;
    }
    .country {
      font-size: 0.8rem;
    }
  }
  hr{
    margin: 0;
    margin-bottom: 1rem;
  }
  .h-list-item {
    .cover {
      height: 90px;
      width: 100%;
      p {
        text-align: center;
        font-size: 0.9rem;
        padding-left: 3%;
      }
    }
  }
}
</style>


 
