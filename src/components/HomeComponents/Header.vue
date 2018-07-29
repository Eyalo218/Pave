<template>
    <section class="header">
        <div class="home-nav-bar flex space-between">
            <div class="logo">Pave</div>
            <div v-if="!user" class="links-container flex space-between">
                <router-link  :to="'/how'">How it works</router-link>
                <router-link  :to="'/signup'">Sign up</router-link>
                <router-link  :to="'/login'">Log in</router-link>
            </div>
            <div v-else class="links-container flex space-between">
                <router-link  :to="'/how'">How it works</router-link>
                <button @click="logOut" >Log Out</button>
                <router-link :to="`/profile/${user._id}`">{{user.name}}</router-link>
            </div>
        </div>
        <div class="title-input-container">
            <h1>Explore and share walks <br/> around the world</h1>
            <input v-model="searchedText" @keyup.enter="setFilter" placeholder="Take yourself to..." />
        </div>
        <div class="app-data">
            <p>6500+ <span>walks</span> 130 <span>countries</span> 80k+ <span>users</span></p>
        </div>
    </section>
</template>

<script>

import userService from '../../service/userService.js'
import storageService from './../../service/storageService.js'
import {eventBus, LOGGED_IN} from '../../service/eventBus.js'

export default {
  name: "HomeHeader",
  data() {
      return {
          searchedText:'',
          user: userService.getLoggedinUser()
      }
  },
  created(){
      eventBus.$on(LOGGED_IN, user => this.user = user)
  },
  methods: {
      setFilter() {
          let searchedText = this.searchedText;
          this.$store.commit({type:'setFilter',searchedText})
          console.log(this.$store);
      },
      logOut() {
        storageService.removeUser('loggedinUser');
        this.user = null;
      }
  },
  components: {}
};
</script>

<style scoped lang="scss">
@import "../../../public/css/helpers.css";
$main-black: #383633;
  .header{
    margin: 0;
    background-image: url("../../../public/img/home/homeImg.jpeg");
    background-size: cover;
    background-position: center;
    height: 90vh;
    margin-bottom: 4rem;
    position: relative;
  }
 
.home-nav-bar{
  padding: 1.5rem;
  .logo{
    font-family: 'Chalkduster';
    font-size: 2.5rem;
  }
  .links-container{
  font-size: 1.2rem;
  width: 300px;
    // font-family: 'roboto-medium';
    color: white;
  a {
    color: white;
    &:hover{
      color:$main-black;
      transform: scale(1.1);
      transition: .3s
    }
  }
}
}

 .title-input-container{
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 65%;
    // padding-top: 4rem;
    h1{
      color: white;
      font-size: 3rem;
      // text-align: center;
    }
    input{
      border: none;
      margin-top: 2rem;
      height: 3rem;
      width: 100%;
      border-radius: 0.3rem;
      padding-left: 1rem;
      color: $main-black;
      font-family: 'roboto-bold';
      font-size: 1rem;
    }
    ::placeholder{
      color: $main-black;
      font-family: 'roboto-bold';
      font-size: 1rem;
    }
  }

.app-data{
  position: absolute;
  bottom: 2%;
  left: 50%;
  transform: translate(-50%,-50%);
  p{
    color: white;
    font-family: 'roboto-medium';
    font-size: 2.5rem;
    span{
      font-size: 1rem;
      opacity: 0.8;
    }
  }
}

</style>
