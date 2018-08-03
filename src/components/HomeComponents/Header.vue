<template>
    <section class="header" :class="{ 'explore-open': isExploreOpen, 'explore-open-flex': isExploreOpen,  }">
        <navBar></navBar>
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
import NavBar from './NavBar'

export default {
  name: "HomeHeader",
  components: {
      NavBar,
  },
  data() {
      return {
          isOpen: false,
          searchedText:'',
          toggle: false,
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
      setFilter() {
        let searchedText = this.searchedText;
        this.$store.dispatch({type:'setFilter',searchedText})
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
            this.$store.dispatch({type: 'updateExplore', currStatus: currStatus})
      }
  },
};
</script>

<style scoped lang="scss">
@import "../../../public/css/helpers.css";
$main-black: #383633;
  section .explore-open{
    height: 0px;
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
            margin-bottom: 0.5rem;
          }
          button:hover {
            color: #44809e;
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
