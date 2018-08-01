<template>
    <section>
        <div class="list-container">
            <h1>Trips in Canada</h1>
            <ul v-if="trips">
                <li class="h-list-item" v-for="(trip,idx) in trips" :key="idx" >
                    <router-link :to="`trips/${trip._id}`">  
                            <img class="item-img" :src="`${trip.image}`">
                    </router-link>
                    <div class=title></div>
                    <div class="rank">Reviews<img class="review-dot" src="../../../public/img/home/dot-and-circle.svg"/></div>
                    <div class="country">Canada</div>
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
      this.displayTripsByText();
  },
  methods: {
    displayTripsByText() {
      let searchedText = "Tel";
      this.$store.dispatch({ type: "loadTrips", searchedText }).then(() => {
        this.setTripsForDisplay();
      });
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
    background:#0e95f094;
    position:absolute;
    text-align: center;
    display: flex;
    align-items: center;
    z-index: 1;
  }
  .h-list-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5em;

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
    .review-dot {
      width: 12px;
    }
  }
  h1 {
    margin-bottom: 2rem;
  }
}
</style>
