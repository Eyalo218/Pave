<template>
<section>
    <h1>Reviews</h1>
        <ul>
            <li v-for="(review,idx) in reviews" :key="idx">
                <!-- {{review.title}} -->
                {{review.review}}
                {{review.rank}}
                <!--review.userId  -->
            </li>
        </ul>
    </section>
</template>

<script>
import axios from "axios";
import reviewService from "@/service/reviewService.js";

export default {
 data(){
        return {
            reviews:null
        }
    },
    computed:{
        setCurrTripId(){
            return this.$store.getters.getCurrTrip
        },
    },
    methods:{
        setReviews(){
            reviewService.getByTripId(this.$route.params.tripId).then(res=>{
                this.reviews = res;
            })
        }
    },
    created(){
        this.setReviews();
    }   
}
</script>

<style lang="scss" scoped>;
ul{
    height: 100px;
    overflow-y: scroll;
    li{
        margin-bottom:1rem;
        border: solid 1px #44809e;
    }
}
h1{
    padding:0 40px;
    margin-bottom: 1.1rem;
}

</style>
