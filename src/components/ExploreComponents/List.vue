<template>
    <section>
        <div class="list-container">
            <ul>
                <li :key="index" v-for="(trip,index) in tripsForDisplay">
                    <Preview :trip="trip"></Preview>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>

import Preview from './Preview'

export default {
    name: 'ListExplore',
    components:{
        Preview,
    },
    data(){
        return {
          trips: null,
        }
    },
    created() {
    //   this.loadTrips()
    },
    computed:{
      tripsForDisplay() {
          return this.$store.getters.tripsForDisplay
      },
    },
    methods:{
        toDetails(tripId) {
            this.$router.push(`/trip/${tripId}`)
        }
    }
}
</script>


<style lang="scss" scoped>
    .list-container {
        font-family: 'roboto-medium';
        color: #383633;
        width: 70%;
        margin: 0 auto;
        margin-bottom: 4rem;
        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            margin: 0;
            padding: 0;
        }
    }

</style>
