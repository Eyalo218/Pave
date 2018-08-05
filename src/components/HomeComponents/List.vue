<template>
    <section>
        <div class="list-container">
            <h1 class="headline">Trips around the world</h1>
            <ul v-if="trips" class="trips">
                <li class="h-list-item" v-for="(trip,idx) in trips" :key="idx" >
                    <router-link :to="`trips/${trip._id}`">  
                            <img class="item-img" :src="`${trip.image}`">
                    </router-link>
                    <div class="trip-info">
                      <div class=title>{{trip.title}}</div>
                      <div class="rank">Reviews<img class="review-dot" src="../../../public/img/home/dot-and-circle.svg"/></div>
                      <div class="country">Canada</div>
                    </div>
                </li>
                <li li class="h-list-item">
                    <router-link :to="'/explore'">
                     <div class="cover">Check all the other trips from Canada ></div>
                    </router-link>
                      <img class="item-img" src="../../../public/img/home/home-list-demo.jpeg">
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
  name: "ListHome",
  data() {
    return {
      trips: null
    };
  },
  components: {},
  created() {
    this.displayActiveTrips();
  },
  methods: {
<<<<<<< HEAD
    displayActiveTrips() {
      let searchedText = "Tel";
      this.$store.dispatch({ type: "loadActiveTrips" }).then(() => {});
=======
    displayTripsByText() {
      let searchedText = "canada";
      this.$store.dispatch({ type: "loadTrips", searchedText }).then(() => {
        this.setTripsForDisplay();
      });
>>>>>>> dc82f0d4908e5de292651405b36b2b1e9cb88665
      this.$store.dispatch({ type: "loadSortedTrips" }).then(() => {});
    },
    setTripsForDisplay() {
      this.trips = this.$store.getters.tripsForDisplay.slice();
      console.log(this.trips);
      this.trips = this.trips.splice(0, 3);
    }
  }
};
</script>
<style lang="scss" scoped>
.headline {
  font-size: 1.5rem;
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
  box-shadow: 1px 2px 5px #262626;
}
.cover {
  width: 45%;
  height: 7rem;
  background: #0e95f094;
  position: absolute;
  text-align: center;
  display: flex;
  align-items: center;
  z-index: 1;
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
      font-size: 1.2rem;
    }
    .rank {
      font-family: "roboto-regular";
    }
    .country {
      font-size: 0.8rem;
      font-family: "roboto-regular";
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
      height: 12rem;
    }
    .h-list-item,
    .cover {
      height: 12rem;
    }
  }
}

@media screen and (min-width: 1024px) {
  .trips {
    .item-img {
      width: 100%;
      height: 12rem;
    }
    .h-list-item,
    .cover {
      width: 20%;
      height: 12rem;
    }
  }
}
</style>


 
