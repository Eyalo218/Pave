<template>
    <section>
        {{setReviews._id}}
        <ul>
            <li v-for="(review,idx) in reviews" :key="idx">
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
        reviews:[]
    }
},
computed:{
    setCurrTripId(){
        return this.$store.getters.getCurrTrip
    },
},
methods:{
    setReviews(){
        this.reviews = reviewService.getByTripId(this.$route.params.tripId);
    }
},
}
</script>

<style>

</style>
