<template>
    <section>
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

import {eventBus, LOGGED_IN, OPEN_EXPLORE, CLOSE_EXPLORE} from '../service/eventBus.js'

// Home imports
import Header from '../components/HomeComponents/Header.vue'
import List from '../components/HomeComponents/List.vue'
import AboutSection from '../components/HomeComponents/AboutSection.vue'
import Footer from '../components/HomeComponents/Footer.vue'
import NavBar from '../components/HomeComponents/NavBar'

// Explore imports

import tripList from "../components/ExploreComponents/List.vue";
// import controlPanel from "../components/ExploreComponents/ControlPanel.vue";
import relatedSearches from "../components/ExploreComponents/relatedSearches.vue";


export default {
    name: 'Home',
    created(){},
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
            // explore: false,
        }
    },
    created() {
        eventBus.$on(OPEN_EXPLORE, () => this.explore = true)
        eventBus.$on(CLOSE_EXPLORE, () => this.explore = false)
    },
    computed: {
        explore() {
            return this.$store.getters.isExploreOpen
        }
    },
    methods: {
        openExplore() {
            this.explore = true;
        },
        updateExplore(currStatus) {
            this.$store.dispatch({type: 'updateExplore', currStatus})
        }
    }
}
</script>
<style lang="scss">
</style>
