<template>
<section>
    <div class="flex space-between align-center">
        <h1 v-if="reviews.length">{{reviews.length}} Trip Reviews</h1>
        <button @click="toggleComment" class="commentBtn">Add Comment</button>
        <!-- <h1 >Average Rating: {{setCurrTripId}}</h1> -->
    </div>
        <div class="relative">
            <ul>
                <li v-for="(review,idx) in reviews" :key="idx">
                    <div class="flex column">
                    <h1>{{review.user}}</h1>
                    <span>{{review.title}}</span> {{review.review}}
                    <!--review.userId  -->
                    </div>
                </li>
            </ul>
            <div v-if="comment" class="addComment absolute flex column  center align-center">
                <input v-model="title" type="text" class="title" maxlength="15" placeholder="Title">
                <textarea v-model="description" class="description" cols="25" rows="6" maxlength="150" placeholder="Description"></textarea>
                <button class="commentBtn" @click="addReview">Add</button>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import reviewService from "@/service/reviewService.js";

export default {
 data(){
        return {
            reviews:[],
            comment:false,
            title: null,
            description:null, 
        }
    },
    computed:{
        setCurrTripId(){
            return this.$store.getters.getCurrTrip.avgReviews
        },
        userlol(){
            return this.$store.getters.loggedIn
        }
    },
    methods:{
        setReviews(){
            reviewService.getByTripId(this.$route.params.tripId).then(res=>{
                this.reviews = res;
            })
        },
        toggleComment(){
            this.comment = !this.comment;
        },
        addReview(){
            var review ={} 
            review.title = this.title;
            review.review = this.description;
            review.user = this.$store.getters.loggedIn;
            review.tripId = this.$route.params.tripId;
            console.log('user: ', review.user)
            reviewService.addReview(review)
            this.toggleComment();
        }
    },
    created(){
        this.setReviews();
    }   
}
</script>

<style lang="scss" scoped>;
ul{
    height: 200px;
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

.commentBtn{
    height:1.4rem;
    border-radius: 5px;
    background-color: #363833;
    color:#44809e;
    box-shadow: none;
    border:none;
    margin-bottom:1rem;
}

.addComment{
    height:200px;
    background-color:#ffffff;
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.75);
    // box-shadow: 0px 1px 10px 2px #4d494d;
    // box-shadow: 1px 10px 55px 2px #4d494d;
    width:100%;
    top:0;
}
section{
    margin-top:1.5rem;
}

.title {
    padding: 0.8rem;
    margin: 1.2rem 0;
    border-radius: 5px;
    border: 1px solid #EDEDED;
    width:60%;
}

.description  {
    margin-bottom: 1rem;
    padding: 0.8rem;
    height: 4rem;
    border-radius: 5px;
    border: 1px solid #EDEDED;
    width:60%;
}
</style>
