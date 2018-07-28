<template>
    <section>
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
    name: 'PreviewExplore',
    components:{},
    props: ['trip'],
    data(){
        return {
          trips: null,
        }
    },
    created() {
      this.loadTrips()
    },
    computed:{
      tripsForDisplay() {
          return this.$store.getters.tripsForDisplay
      },
    },
    methods:{
        loadTrips() {
            this.$store.dispatch({type:'loadTrips'})
        },
        toDetails(tripId) {
            this.$router.push(`/trips/${tripId}`)
        }
    }
}
</script>


<style lang="scss" scoped>

        .h-list-item {

            display: flex;
            flex-direction: column;
            margin-bottom: 1rem;

            .item-img {
                width: 14.5rem;
                height: 17.5rem;
                border-top-left-radius: 0.6rem;
                border-top-right-radius: 0.6rem;
            }
            .location {
                font-size: 1rem;
            }
            .reviews {
                font-family: 'roboto-regular';
            }
            .country {
                font-size: 0.8rem;
                font-family: 'roboto-regular';
            }
            .review-dot {
                width: 12px;
            }

        }
        .card {
            display: inline-block;
        }
</style>
