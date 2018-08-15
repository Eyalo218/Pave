<template>
    <section class="wrapper">
        <nav class="nav-container flex space-between align-center">
            <div class="left-nav flex align-center">
                <div @click="updateExplore(false)" class="logo">Pave</div>
                <input v-model="searchedText" @input="setFilter" v-if="isExploreOpen" class="search" type="text" placeholder="Seach"/>
            </div>
                <div class="hamburger">
                  <transition name="switch-hamburger" mode="out-in">
              <font-awesome-icon :key="1" v-if="!dropDownOpen" icon="bars" @click="dropDownOpen=!dropDownOpen" />
              <font-awesome-icon :key="2" v-else icon="times" @click="dropDownOpen=!dropDownOpen" />
                  </transition>
                </div>
                    <div v-if="user" class="links-container flex space-between">
                        <router-link  :to="'/how'"><button>Explore</button></router-link>
                        <a><button @click="logOut" >Log out</button></a>
                        <router-link :to="`/profile/${user._id}`"><button class="user-link">{{user.name}}</button></router-link>
                    </div>
                    <div v-else class="links-container">
                    <!-- <router-link  :to="'/how'"><bottun>How it works</bottun></router-link> -->
                        <router-link  :to="'/signup'"><button>Sign up</button></router-link>
                        <router-link  :to="'/login'"><button>Log in</button></router-link>
                        <router-link  :to="'/how'"><button>How it works</button></router-link>
                    </div>
        </nav>
        <!-- mobile -->
        <transition name="drop-down" >
        <div v-if="dropDownOpen" class="drop-down">
          <hr/>
            <div v-if="user" class="mobile-links-container flex column align-center">
                <router-link :to="`/profile/${user._id}`"><button>{{user.name}}</button></router-link>
                <router-link  :to="'/how'"><button>Explore</button></router-link>
                <button @click="logOut" >Log out</button>
            </div>
            <div v-else class="mobile-links-container flex column align-center">
                <router-link  :to="'/login'"><button>Log in</button></router-link>
                <router-link  :to="'/signup'"><button>Sign up</button></router-link>
                <router-link  :to="'/how'"><button>How it works</button></router-link>
            </div>
        </div>
        </transition>
    </section>
</template>

<script>
export default {
  name: "navBar",
  data() {
    return {
      dropDownOpen: false,
      searchedText: ""
    };
  },
  components: {},
  created() {},
  computed: {
    user() {
      return this.$store.getters.loggedIn;
    },
    isExploreOpen() {
      return this.$store.getters.isExploreOpen;
    }
  },
  methods: {
    updateExplore(currStatus) {
      this.$store.dispatch({ type: "updateExplore", currStatus: currStatus });
    },
    logOut() {
      this.$store.dispatch({ type: "loggedOut" });
    },
    setFilter() {
      let searchedText = this.searchedText;
      this.$store.dispatch({ type: "setFilter", searchedText });
    }
  }
};
</script>
<style lang="scss" scoped>
$main-blue: #44809e;
.wrapper {
  position: absolute;
  width: 100%;
  z-index: 1;
  // opacity: 0.7;
  @media (max-width: 740px) {
    opacity: 0.9;
    background-color: #383633;
  }
}
.nav-container {
  z-index: 4;
  // position: absolute;
  width: 100%;
  // background-color: #383633;
  height: 50px;
  .links-container {
  }
  .logo {
    padding-left: 1.3rem;
    font-family: "Chalkduster";
    font-size: 2.1rem;
    cursor: pointer;
    color: $main-blue;
    margin-right: 5rem;
    @media (max-width: 740px) {
      margin-right: 3rem;
      font-size: 1.6rem;
    }
    @media (max-width: 650px) {
      margin-right: 2rem;
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
    @media (max-width: 1150px) {
      width: 25rem;
    }
    @media (max-width: 1000px) {
      width: 20rem;
    }
    @media (max-width: 910px) {
      width: 15rem;
    }
    @media (max-width: 810px) {
      width: 10rem;
    }
    @media (max-width: 740px) {
      width: 15rem;
      height: 1.6rem;
    }
    @media (max-width: 650px) {
      width: 10rem;
    }
    @media (max-width: 450px) {
      width: 6rem;
    }
  }
  .hamburger {
    padding-right: 1.3rem;
    width: 1.25rem;
    color: black;
    cursor: pointer;
    font-size: 1.5em;
  }
  .links-container {
    display: none;
    font-family: "roboto-medium";
    font-size: 1.2rem;
  }
  @media (min-width: 740px) {
    .hamburger {
      display: none;
    }
    .links-container {
      height: 100%;
      height: 100%;
      justify-content: space-around;
      width: 25vw;
      min-width: 320px;
      display: flex;
      a {
        margin-top: 12.5px;
        transition: all 150ms ease-in-out;
        border-bottom: solid 0px $main-blue;
        // &:hover {
        //   border-bottom: solid 3px $main-blue;
        // }
        &::after {
          margin-top: 0.5rem;
          display: block;
          content: "";
          border-bottom: solid 3px $main-blue;
          transform: scaleX(0);
          transition: transform 250ms ease-in-out;
        }
        &:hover:after {
          transform: scaleX(1);
        }
        &:hover > button {
          color: $main-blue;
        }
      }
      button {
        padding: 0;
        font-family: "roboto-regular";
        font-size: 1rem;
        border: none;
        background: transparent;
        color: white;
        cursor: pointer;
        transition: all 150ms ease-in-out;
      }
      .user-link {
        // margin-right: 1.3rem;
      }
    }
  }
}
.drop-down {
  background-color: #383633;
  z-index: -100;
  position: absolute;
  width: 100%;
  hr {
    height: 12px;
    border: 0;
    box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 1);
    margin: 0;
  }
  button {
    font-size: 1rem;
    font-family: "roboto-medium";
    color: #fff;
    background: transparent;
    border: none;
    margin-bottom: 0.6rem;
    cursor: pointer;
    transition: all 250ms ease-in-out;
  }
  button:hover {
    color: $main-blue;
  }
  @media (min-width: 740px) {
    display: none;
  }
}

// vue animations:
.drop-down-enter-active {
  transition: all 0.7s;
  opacity: 1;
}
.drop-down-leave-active {
  transition: all 0.7s;
}
.drop-down-enter {
  opacity: 0;
  z-index: -100;
}
.drop-down-leave-to {
  opacity: 0;
}

.switch-hamburger-enter-active {
  transition: all 1s;
}
.switch-hamburger-enter {
  opacity: 0;
}
</style>
