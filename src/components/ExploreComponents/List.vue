<template>
    <section>
        <div class="list-container">
            <ul>
                <li class="prev" :key="index" v-for="(trip,index) in tripsForDisplay">
                    <Preview :trip="trip"></Preview>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import Preview from "./Preview";
import { eventBus, OPEN_EXPLORE } from "../../service/eventBus.js";

export default {
  name: "ListExplore",
  components: {
    Preview
  },
  data() {
    return {
      trips: null
    };
  },
  created() {
    
  },
  computed: {
    tripsForDisplay() {      
      return this.$store.getters.tripsForDisplay;
    }
  },
  methods: {
    toDetails(tripId) {
      this.$router.push(`/trip/${tripId}`);
    }
  }
};
</script>


<style lang="scss" scoped>
.list-container {
  @media(max-width: 1300px) {
      font-family: "roboto-medium";
      color: #383633;
      width: 90%;
      margin: 4rem auto;
      ul {
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-around;
        margin: 0;
        padding: 0;
        li {
          margin-left: 1.5rem;
        }
      }
      }
  @media (max-width: 700px) {
    ul {
      justify-content: center;
    }
  }
}
</style>
