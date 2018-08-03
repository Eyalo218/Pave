<template>

    <section class="header">
    <nav class="nav-container flex space-between align-center">
            <div class="left-nav flex align-center">
                <div @click="updateExplore(false)"><router-link :to="'/'"><button class="logo">Pave</button></router-link></div>
                <input v-model="searchedText" @keyup.enter="setFilter" class="search" type="text" placeholder="Seach"/>
            </div>
            <div class="right-nav-mobile">
                <div class="hamburger">
                    <img @click="dropDownOpen=!dropDownOpen" class="hamburger" src="../../../public/img/hamburger.svg">
                </div>
                <div>
                    <div v-if="user" class="links-container flex space-between">
                        <button @click="toHome">Home</button>
                        <button class="user-link" @click="logOut">Log out</button>
                    </div>
                    <div v-else class="links-container flex space-between">
                        <router-link :to="`/login`">
                            <button>Log in</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </nav>
        <div v-if="dropDownOpen" class="drop-down">
            <div v-if="user" class="mobile-links-container flex column align-center">
                <button @click="toHome">Home</button>
                <button @click="logOut">Log out</button>
            </div>
            <div v-else class="mobile-links-container flex column align-center">
                <button>Log in</button>
            </div>
        </div>
    </section>
</template>

<script>
import { eventBus, EMIT_SEARCH, OPEN_EXPLORE } from "../../service/eventBus.js";
import userService from "../../service/userService.js";

export default {
  name: "CtrPanelProfile",
  components: {},
  data() {
    return {
        searchedText: "",
        dropDownOpen: false,
        toggleHam: false
    };
  },
  created() {
    this.validate()
    this.searchedText = this.$store.state.currFilter;
    // eventBus.$on(LOGGED_IN, user => (this.user = user));
  },
  computed: {
      user() {
          return this.$store.getters.loggedIn
      }
  },
  methods: {
      setFilter() {
          let searchedText = this.searchedText;
          this.$store.dispatch({ type: "setFilter", searchedText });
          this.$store.dispatch({type: 'updateExplore', currStatus : true})
        //   eventBus.$emit(OPEN_EXPLORE)
          this.$router.push('/')
      },
      logOut() {
          // storageService.removeUser('loggedinUser');
          this.$store.dispatch({type: 'loggedOut'})
          this.$router.push('/')
      },
      validate() {
        if(!this.user) this.$router.push('/')
      },
      toHome() {
          this.$store.dispatch({type: 'updateExplore', currStatus : false})
          this.$router.push('/')
      },
      // displayTripsByText() {
      //   let searchedText = this.$store.state.currFilter;
      //   this.$store.dispatch({ type: "loadTrips", searchedText }).then(() => {
          
      //   });
      // }
  }
};
</script>


<style lang="scss" scoped>

.nav-container {
    background-color: #383633;
    padding: 0.6rem 0;

    .logo {
        padding-left: 1.3rem;
        font-family: 'Chalkduster';
        font-size: 1.8rem;
        cursor: pointer;
        color: #44809e;
        margin-right: 5rem;
        background: transparent;
        border: none;
        @media(max-width: 740px) {
            margin-right: 3rem;
        }
            @media(max-width: 650px) {
                margin-right: 2.0rem;
            }
    }
    .search {
        width: 30rem;
        height: 1.8rem;
        padding: 0.25rem 1.8rem;
        border-radius: 5px;
        font-size: 1rem;
        background-color: #efefef;
        border: none;
        &:focus {
          outline: none !important;
          box-shadow: 1px 1px 2px 3px #85bef3;
        }
        @media(max-width: 1150px){
            width: 25rem;
        }
            @media(max-width: 1000px){
                width: 20rem;
            }
                @media(max-width: 910px){
                    width: 15rem;
                }
                    @media(max-width: 810px){
                        width: 10rem;
                    }
                        @media(max-width: 740px){
                            width: 15rem;
                            height: 1.5rem;
                        }
                            @media(max-width: 650px){
                                width: 10rem;
                            }
                                @media(max-width: 450px){
                                    width: 6rem;
                                }
    }
    .hamburger{
        padding-right: 1.3rem;
        width: 1.25rem;
        color: #fff;
        cursor: pointer;
    }
    .links-container {
        display: none;
        font-family: 'roboto-medium';
        font-size: 1.2rem;
    }
    @media(min-width: 740px) {
        .hamburger{
            display: none;
        }
        .links-container {
            display: inline-block;
            button {
                font-family: 'roboto-regular';
                font-size: 1.2rem;
                padding-left: 1.6rem;
                border: none;
                background: transparent;
                color: #efefef;
                cursor: pointer;
            }
            button:hover {
                color: #44809e;
            }
            .user-link {
                margin-right: 1.3rem;
            }
        }
    }
}
.drop-down {
    background-color: #383633;
    button {
        font-size: 1rem;
        font-family: 'roboto-medium';
        color: #fff;
        background: transparent;
        border: none;
        margin-bottom: 0.6rem;
        cursor: pointer;
    }
    button:hover {
        color: #44809e;
    }
    @media(min-width: 740px) {
        display: none;
    }
}
</style>
