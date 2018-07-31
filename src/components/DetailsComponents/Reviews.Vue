<template>
    <section>
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

<style>

</style>
