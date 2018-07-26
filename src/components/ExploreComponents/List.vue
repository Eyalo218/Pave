<template>
    <section>
        <div class="list-container" v-if="trips">
        <ul>
            <li class="h-list-item">
                <div><img class="item-img" src="../../../public/img/home/home-list-demo.jpeg"></div>
                <div class="location">Red Deer, AL</div>
                <div class="reviews">Reviews<img class="review-dot" src="../../../public/img/home/dot-and-circle.svg"/></div>
                <div class="country">Canada</div>
            </li>
        </ul>
        </div>
    </section>
</template>

<script>

export default {
    name: 'ListHome',
    components:{},
    data(){
        return {
          trips: null,
        }
    },
    created() {
      this.loadTrips()
    },
    computed:{},
    methods:{
        loadTrips() {
            this.$store.dispatch({type:'loadTrips'})
        }
    }
}
</script>


<style lang="scss" scoped>
    .list-container {
        font-family: 'roboto-medium';
        color: #383633;
        width: 90%;
        margin: 0 auto;
        margin-bottom: 4rem;
        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin: 0;
            padding: 0;
        }

        .h-list-item {

            display: flex;
            flex-direction: column;
            margin-bottom: 1.5em;

            .item-img {
                width: 14.5rem;
                height: 17.5rem;
                border-top-left-radius: 0.6rem;
                border-top-right-radius: 0.6rem;
            }
            .location {
                font-size: 1.2rem;
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
    }
</style>
