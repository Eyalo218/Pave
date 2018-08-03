<template>
    <section>
        <div class="hover-opacity"></div>
        <div class="h-list-item" @click="toDetails(`${trip._id}`)">
            <div ><img class="item-img" :src="trip.image"></div>
            <div class="flex column txt-container">
                <div class="location">{{trip.title}}</div>
                <div class="country">Canada</div>
                <star-rating v-bind:star-size="15"></star-rating>
            </div>
        </div>
    </section>
</template>

<script>

export default {
  name: "PreviewExplore",
  components: {
  },
  props: ["trip"],
  data() {
    return {
      trips: null
    };
  },
  created() {},
  computed: {
    tripsForDisplay() {
      return this.$store.getters.tripsForDisplay;
    }
  },
  methods: {
    toDetails(tripId) {
      this.$router.push(`/trips/${tripId}`);
    }
  }
};
</script>


<style lang="scss" scoped>
.h-list-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  box-shadow: 0px 3px 10px 1px rgba(84,81,84,0.78);
  height: 18rem;
  width: 15rem;

  .txt-container{
    padding: 0.5rem;
  }

  .item-img {
    width: 100%;
    height: 12rem;
  }
  .location {
    font-family: "roboto-medium";
    font-size: 1rem;
  }
  .reviews {
    font-family: "roboto-medium";
  }
  .country {
    font-size: 0.8rem;
    font-family: "roboto-medium";
  }
  .review-dot {
    width: 12px;
  }
  .stars{
    width: 50px;
  }
}
  .card {
    display: inline-block;
  }
  .hover-opacity {
      background-color: transparent;
      position: absolut;
      width:100%;
      height: 100%;
  }
  .hover-opacity:hover{
      cursor: pointer;
      z-index: 1000;
      border-radius: 5px;
      background-color: rgba( 100, 100, 100, 0.5);
  }
</style>
