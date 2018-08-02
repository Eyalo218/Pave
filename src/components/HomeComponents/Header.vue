<template>
    <section class="header" :class="{ 'explore-open': isExploreOpen, 'explore-open-flex': isExploreOpen,  }">
        <div class="mobile-home-nav-bar flex align-center">
            <div class="flex space-between align-center">
                <div @click="updateExplore(false)" class="mobile-logo">Pave</div>
                <input v-if="isExploreOpen" class="search" type="text" placeholder="Seach"/>
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
            <div class="logo-search-container flex space-between align-center">
                <div @click="updateExplore(false)" class="logo">Pave</div>
                <input v-if="isExploreOpen" class="search-desc" type="text" placeholder="Seach"/>
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
        </div>
        <div v-if="!isExploreOpen" class="title-input-container">
            <h1>Explore and share walks <br/> around the world</h1>
            <input v-model="searchedText" @keyup.enter="setFilter" placeholder="Take yourself to..." />
        </div>
        <div class="app-data" v-if="!isExploreOpen">
            <p>6500+ <span>walks</span> 130 <span>countries</span> 80k+ <span>users</span></p>
        </div>
    </section>
</template>

<script>

import userService from '../../service/userService.js'
import storageService from './../../service/storageService.js'
import {eventBus, LOGGED_IN, OPEN_EXPLORE, CLOSE_EXPLORE} from '../../service/eventBus.js'

export default {
  name: "HomeHeader",
  data() {
      return {
          isOpen: false,
          searchedText:'',
          toggle: false,
          // isExploreOpen: false
          // user: userService.getLoggedinUser() ? userService.getLoggedinUser() : null
      }
  },
  created(){
      eventBus.$on(OPEN_EXPLORE, () => this.isExploreOpen = true)
      eventBus.$on(CLOSE_EXPLORE, () => this.isExploreOpen = false)
      this.checkIfUserInStorage()
  },
  computed: {
      user() {
          return this.$store.getters.loggedIn
      },
      isExploreOpen() {
          return this.$store.getters.isExploreOpen
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
        this.updateExplore(true)
        // this.$router.push('/explore');
      },
      checkIfUserInStorage() {
          let user = storageService.loadFromStorage('loggedInUser')
          if (user){
              this.$store.dispatch({type: 'loggedIn', user})
          }
      },
      closeExplore() {
        eventBus.$emit(CLOSE_EXPLORE)
      },
      updateExplore(currStatus) {
        console.log('BYEBYEBYE')
            this.$store.dispatch({type: 'updateExplore', currStatus: currStatus})
      }
  },
};
</script>

<style scoped lang="scss">
@import "../../../public/css/helpers.css";
$main-black: #383633;
  section .explore-open{
    height: 9vh;
      margin: 0;
  }
  .header{
    margin: 0;
    background-image: url("../../../public/img/home/homeImg.jpeg");
    background-size: cover;
    background-position: center;
    height: 100vh;
    margin-bottom: 4rem;
    position: relative;
    transition: all ease-in 0.3s;
  }

.home-nav-bar{
  padding: 0.5rem 1.5rem 1.5rem 1.5rem;
    @media(max-width: 740px) {
      display: none;
    }
  .logo{
    font-family: 'Chalkduster';
    font-size: 2.5rem;
    cursor: pointer;
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
        background-color: transparent;
        padding: 0.3rem 0;
        .mobile-logo {
          padding-left: 1rem;
          font-family: 'Chalkduster';
          font-size: 1.6rem;
          cursor: pointer;
        }
        .hamburger{
          cursor: pointer;
          padding-right: 1rem;
          width: 20px;
          padding-top: 2px;
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
    .search {
        width: 30vw;
        height: 30px;
        padding: 0.25rem 2.5rem;
        border-radius: 5px;
        font-size: 1rem;
        // background-color: #efefef;
        border: none;
        &:focus {
          outline: none !important;
          box-shadow: 1px 1px 2px 3px #85bef3;
        }
    }
    section .explore-open-flex {
      display: flex;
      align-items: center;
    }
}
  .search-desc{
      margin-left: 2rem;
      width: 30vw;
      height: 30px;
      padding: 0.25rem 2.5rem;
      border-radius: 5px;
      font-size: 1rem;
      // background-color: #efefef;
      border: none;
      &:focus {
          outline: none !important;
          box-shadow: 1px 1px 2px 3px #85bef3;
      }
  }
  .logo-search-container{

  }

</style>
