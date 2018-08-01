<template>
    <section class="header">
        <div class="mobile-home-nav-bar flex align-center">
            <div class="flex space-between align-center">
                <div class="mobile-logo">Pave</div>
                <div class="hamburger">
                    <img @click="isOpen=!isOpen" class="hamburger" src="../../../public/img/hamburger.svg">
                </div>
            </div>
            <div class="drop-down" v-if="isOpen">
                <div v-if="user" class="mobile-links-container flex column align-center">
                    <router-link  :to="'/how'"><button>How it works</button></router-link>
                    <button @click="logOut" >Log Out</button>
                    <router-link :to="`/profile/${user._id}`"><button>{{user.name}}</button></router-link>
                </div>
                <div v-else class="mobile-links-container flex column align-center">
                    <router-link  :to="'/login'"><button>Log in</button></router-link>
                    <router-link  :to="'/signup'"><button>Sign up</button></router-link>
                    <router-link  :to="'/how'"><button>How it works</button></router-link>
                </div>
            </div>
        </div>
        <div class="home-nav-bar flex space-between align-center">
            <div class="logo">Pave</div>
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
        isOpen: false,
          searchedText:'',
          toggle: false,
          // user: userService.getLoggedinUser() ? userService.getLoggedinUser() : null
      }
  },
  created(){
      // eventBus.$on(LOGGED_IN, user => this.user = user)
      this.checkIfUserInStorage()
  },
  computed: {
      user() {
          return this.$store.getters.loggedIn
      }
  },
  methods: {
      logOut() {
        storageService.removeUser('loggedinUser');
        this.$store.dispatch({type: 'loggedOut'})
      },
      setFilter() {
        let searchedText = this.searchedText;
        this.$store.commit({type:'setFilter',searchedText})
        this.$router.push('/explore');
      },
      checkIfUserInStorage() {
          let user = storageService.loadFromStorage('loggedInUser')
          if (user){
              this.$store.dispatch({type: 'loggedIn', user})
          }
      }
  },
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
    height: 100vh;
    margin-bottom: 4rem;
    position: relative;
  }

.home-nav-bar{
  padding: 0.5rem 1.5rem 1.5rem 1.5rem;
    @media(max-width: 740px) {
      display: none;
    }
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
    @media(max-width: 520px) {
      width: 82%;
    }
    h1{
      color: white;
      font-size: 3rem;
      @media(max-width: 920px) {
        font-size: 2.5rem;
      }
        @media(max-width: 860px) {
          font-size: 2.4rem;
        }
            @media(max-width: 660px) {
              font-size: 2.1rem;
            }
              @media(max-width: 580px) {
               font-size: 1.9rem;
              }
                @media(max-width: 430px) {
                  font-size: 1.7rem;
                }
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
    padding-bottom: 1rem;
    span{
      font-size: 1rem;
      opacity: 0.8;
    }
    @media(max-width: 960px) {
      font-size: 2rem;
    }
    @media(max-width: 840px) {
      font-size: 1.7rem;
    }
    @media(max-width: 840px) {
      display: flex;
      flex-direction: column;
      padding: 0;
      font-size: 1.7rem;
    }
  }
}
.drop-down {
  z-index: 100000;
}
.mobile-home-nav-bar{
  display: none;

    
    @media(max-width: 740px) {
        display: block;
        background-color: #fff;
        padding: 0.3rem 0;
        .mobile-logo {
          padding-left: 1rem;
          font-family: 'Chalkduster';
          font-size: 1.6rem;
        }
        .hamburger{
          cursor: pointer;
          padding-right: 1rem;
          width: 20px;
        }
        .mobile-links-container{
          button {
            background: none;
            border: none;
            font-size: 1.2rem;
            font-family: 'roboto-medium';
            cursor: pointer;
            margin-bottom: 1rem;
          }
          button:hover {
            color: #44809e;
          }
          button:first-child{
            margin-top: 1rem;
          }
        }
    }
  
}

</style>
