<template>
    <section>
        <div class="hover-opacity"></div>
        <div class="h-list-item" @click="toDetails(`${trip._id}`)">
            <div><img class="item-img" src="../../../public/img/home/home-list-demo.jpeg"></div>
            <div class="location">{{trip.title}}</div>
            <div class="reviews">Reviews<img class="review-dot" src="../../../public/img/home/dot-and-circle.svg"/></div>
            <div class="country">Canada</div>
        </div>
    </section>
</template>

<script>
export default {
  name: "PreviewExplore",
  components: {},
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

  .item-img {
    width: 14.5rem;
    height: 17.5rem;
    border-radius: 0.3rem;
  }
  .location {
    font-size: 1rem;
  }
  .reviews {
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
