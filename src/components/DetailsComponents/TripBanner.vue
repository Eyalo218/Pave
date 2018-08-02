<template>
   <section class="flex space-between align-center banner">
              <!-- <font-awesome-icon icon="map-marked-alt"  size="2x" /> 
              <font-awesome-icon icon="camera-retro"  size="2x" />  
              <font-awesome-icon icon="comments"  size="2x" />   -->

       <!-- <div class="tripImg" :style="`background-image:url('${getCurrTrip.image}')`">
       </div>
        <div class="flex column details">
           <h1> {{getCurrTrip.title}} </h1>
           <h3>{{getCurrTrip.country}}</h3>
           <p>{{getCurrTrip.description}}</p>
           
        </div> -->
        <!-- <div class="home-nav-bar flex space-between align-center">
            <div class="logo-search-container flex space-between align-center">
                <div class="logo">Pave</div>
            </div>
            <div v-if="user" class="links-container flex space-between">
                <router-link  :to="'/how'">How it works</router-link>
                <button @click="logOut" >Log Out</button>
                <router-link :to="`/profile/${user._id}`">{{user.name}}</router-link>
            </div>
            <div v-else class="links-container flex space-between">
                <router-link  :to="'/how'">How it works</router-link>
                <router-link  :to="'/signup'">Sign up</router-link>
                <router-link  :to="'/login'">Log in</router-link>
            </div>
        </div> -->
   </section>
</template>

<script>
export default {
  data() {
    return {
      trip: null
    };
  },
  computed: {
    getCurrTrip() {
      this.trip = this.$store.getters.getCurrTrip;
      console.log("lalala", this.trip);
      return this.$store.getters.getCurrTrip;
    }
  }
};
</script>

<style lang="scss" scoped>
  .details {
    position: absolute;
    z-index: 1;
    text-align: center;
    color: white;
    margin: 0 auto;
  }
  .banner{
      padding: 0.5rem;
  }
</style>
