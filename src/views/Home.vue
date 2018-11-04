<template>
    <section>
        <transition name="slide">
        <div class="pinned-modal" v-if="shouldShowPinnedModal">
Pinned successfully!
        </div>
        </transition>
        <Header @openExplore="openExplore"></Header>
        <div v-if="!explore">
            <List></List>
            <AboutSection></AboutSection>
            <Footer></Footer>
        </div>

        <div v-if="explore">
            <related-searches></related-searches>
            <trip-list></trip-list>
        </div>

    </section>
</template>

<script>
// Event bus

import {
  eventBus,
  LOGGED_IN,
  OPEN_EXPLORE,
  CLOSE_EXPLORE,
  PINNED_TRIP
} from "../service/eventBus.js";

// Home imports
import Header from "../components/HomeComponents/Header.vue";
import List from "../components/HomeComponents/List.vue";
import AboutSection from "../components/HomeComponents/AboutSection.vue";
import Footer from "../components/HomeComponents/Footer.vue";
import NavBar from "../components/HomeComponents/NavBar";

// Explore imports

import tripList from "../components/ExploreComponents/List.vue";
// import controlPanel from "../components/ExploreComponents/ControlPanel.vue";
import relatedSearches from "../components/ExploreComponents/relatedSearches.vue";

export default {
  name: "Home",
  created() {},
  components: {
    // Home imports
    Header,
    List,
    AboutSection,
    Footer,
    NavBar,
    // Explore import
    tripList,
    relatedSearches
  },
  data() {
    return {
      shouldShowPinnedModal: false
      // explore: false,
    };
  },
  created() {
    eventBus.$on(PINNED_TRIP, this.showPinnedModal);
    // eventBus.$on(OPEN_EXPLORE, () => this.explore = true)
    eventBus.$on(CLOSE_EXPLORE, () => (this.explore = false));
  },
  computed: {
    explore() {
      return this.$store.getters.isExploreOpen;
    }
  },
  methods: {
    showPinnedModal() {
      this.shouldShowPinnedModal = true;
      setTimeout(() => {
        this.shouldShowPinnedModal = false;
      }, 2000);
    },
    openExplore() {
      this.explore = true;
    },
    updateExplore(currStatus) {
      this.$store.dispatch({ type: "updateExplore", currStatus });
    }
  }
};
</script>
<style lang="scss">
$main-blue: #44809e;
.slide-enter-active,
.slide-leave-active {
  transition: all 1s;
}
.slide-enter,
.slide-leave-to {
  top: -10vh;
}
.slide-enter-to,
.slide-leave {
  top: 0;
}

.pinned-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "PoiretOne-Regular";
  font-weight: bold;
  color: $main-blue;
  font-size: 1.2rem;
  text-align: center;
  vertical-align: middle;
  position: fixed;
  width: 30vw;
  height: 10vh;
  left: 50%;
  transform: translateX(-50%);
  background: rgb(255, 255, 255);
  z-index: 100000000000;
  border: 2px solid $main-blue;
  border-radius: 0 0 0.5rem 0.5rem;
  border-top: none;
  //   transform: translateY(-8vh);
}
</style>
