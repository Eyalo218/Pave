<template>
    <section class="header">
        <div class="container">
            <div class="container-left">
                <router-link :to="'/'">
                    <div class="logo">Pave</div>
                </router-link>
                <div class="input-container">
                <input @keyup.enter="setFilter" class="search" type="text" v-model="searchedText" placeholder="Seach"/>
                </div>
            </div>
            <div class="container-right">
               <!--  <router-link :to="'/'">Home</router-link>
                <router-link class="flex" :to="'/'">
                <div class="user-img"></div>
                <span>username</span>
                </router-link>
                 <font-awesome-icon class="search-icon" icon="comments" size="lg" />
                 <font-awesome-icon class="search-icon" icon="bell" size="lg" />-->
                <div v-if="user">
                        <button @click="toHome">Home</button>
                    <button @click="logOut">Log out</button>
                </div>
                <div v-else>
                    <router-link :to="`/login`">
                        <p>Log in</p>
                    </router-link>
                </div>
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
        // user: userService.getLoggedinUser() ? userService.getLoggedinUser() : null
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
          this.$store.commit({ type: "setFilter", searchedText });
          eventBus.$emit(EMIT_SEARCH, this.searchedText);
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
      }
      // displayTripsByText() {
      //   let searchedText = this.$store.state.currFilter;
      //   this.$store.dispatch({ type: "loadTrips", searchedText }).then(() => {
          
      //   });
      // }
  }
};
</script>


<style lang="scss" scoped>
.container {
  height: 70px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  align-items: center;
  .container-left {
    display: flex;
    align-items: center;
    margin-left: 2rem;
    .logo {
        color: #383633;
        font-family: 'Chalkduster';
        font-size: 2.5rem;
        cursor: pointer;
    }
    .input-container {
      position: relative;
      .search-icon {
        position: absolute;
        left: 2.5%;
        top: 30%;
        color: #b4b4b4;
      }
    }
    .search {
      margin-left: 2rem;
      width: 30vw;
      height: 30px;
      padding: 0.25rem 2.5rem;
      border-radius: 5px;
      font-size: 1rem;
      background-color: #fff;
      border: none;
      &:focus {
        outline: none !important;
        box-shadow: 1px 1px 2px 3px #85bef3;
      }
    }
  }
  .container-right {
    display: flex;
    width: 50vw;
    justify-content: flex-end;
    align-items: center;
    a {
      align-items: center;
      .user-img {
        margin-right: 0.3rem;
        width: 30px;
        height: 30px;
        background-image: url("../../../public/img/aboutUs/Ofir.jpeg");
        background-size: cover;
        border-radius: 50%;
      }
    }
    button {
      background-color: transparent;
      color: #fff;
      border: none;
      font-size: 1.2rem;
      font-family: "roboto-regular";
      cursor: pointer;
      margin-right: 2rem;
      outline: none;
    }
    button:hover {
        color: #44809e;
    }
  }
}
  .header{
    margin: 0;
    background-image: url("../../../public/img/home/homeImg.jpeg");
    background-size: cover;
    background-position: center;
    height: 9vh;
    margin-bottom: 4rem;
    position: relative;
    transition: all ease-in 0.3s;
  }
</style>
