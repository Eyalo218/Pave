<template>
   <section v-if="getCurrTrip" class="flex center align-center">
       <div class="tripImg" :style="`background-image:url('${getCurrTrip.image}')`">
       </div>
        <div class="flex column details">
           <h1> {{getCurrTrip.title}} </h1>
           <h3>{{getCurrTrip.country}}</h3>
           <p>{{getCurrTrip.description}}</p>
        </div>
   </section>
</template>

<script>
export default {
    data(){
        return {
            trip:null
        }
    },
    computed:{
        getCurrTrip(){
            this.trip = this.$store.getters.getCurrTrip;
            console.log('lalala', this.trip)
            return this.$store.getters.getCurrTrip;
        }
    }
}
</script>

<style lang="scss" scoped>
section{
    .tripImg{
        height:175px;
        width:100%;
        background-position: center;
    }
    .details{
        position: absolute;
        z-index: 1;
        text-align: center;
        color:white;
        margin:0 auto;
    }

}
</style>
