<template>
<section>
    <div class="flex space-between">
        <h1>{{reviews.length}} Trip Reviews</h1>
        <h1 >Average Rating: {{setCurrTripId}}</h1>
    </div>
        <ul>
            <li v-for="(review,idx) in reviews" :key="idx">
                <div class="flex column">
                <h1>user</h1>
                <span>{{review.title}}</span> {{review.review}}<!-- {{review.title}} -->
                <!--review.userId  -->
                </div>
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
            return this.$store.getters.getCurrTrip.avgReviews
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
    padding:0;
    
    
    li{
        margin-bottom:1rem;
        color: #363833;
        background-color:#eff1f3;
        padding:8px 10px;
        border-radius: 5px;
        span{
            font-weight:bold;  
        }
        h1{
            color: #44809e;
            margin-bottom:0.5rem;
        }
    }
}
h1{
    padding:0;
    margin-bottom: 1.1rem;
}
p{
    padding:0;
}

/* width */
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 5px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    background: #44809e; 
    border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #1c3b4b; 
}
</style>
