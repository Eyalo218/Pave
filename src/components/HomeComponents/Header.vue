<template>
    <section class="header" >
      <navBar></navBar>
      <div  :class="{'background-carousel':true, 'explore-open': isExploreOpen, 'explore-open-flex': isExploreOpen}">
        <carousel :autoplayTimeout="4000" :autoplay="true" :loop="true" :perPage="1" :paginationEnabled="false" :navigationEnabled="false">
    <slide :key="index" v-for="(img,index) in headerImgs">
      <img :class="{'slide-img':!isExploreOpen, 'explore-open': isExploreOpen}" :src="img.img"/>
      </slide>
        </carousel> 
        </div>
        <div v-if="!isExploreOpen" class="title-input-container">
            <h1>Explore and share walks <br/> around the world</h1>
            <div class="input-container">
              <font-awesome-icon @click="setFilter" class="icon" icon="search" />            
            <input v-model="searchedText" @keyup.enter="setFilter" placeholder="Take yourself to..." />
            </div>
        </div>
        <div class="app-data" v-if="!isExploreOpen">
            <p>6500+ <span>walks</span> 130 <span>countries</span> 80k+ <span>users</span></p>
        </div>
    </section>
</template>

<script>
import userService from "../../service/userService.js";
import storageService from "./../../service/storageService.js";
import {
  eventBus,
  LOGGED_IN,
  OPEN_EXPLORE,
  CLOSE_EXPLORE
} from "../../service/eventBus.js";
import NavBar from "./NavBar";
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "HomeHeader",
  components: {
    NavBar,
    Carousel,
    Slide
  },
  data() {
    return {
      isOpen: false,
      searchedText: "",
      toggle: false
      // user: userService.getLoggedinUser() ? userService.getLoggedinUser() : null
    };
  },
  created() {
    eventBus.$on(OPEN_EXPLORE, () => {
      this.setFilter();
    });
    eventBus.$on(CLOSE_EXPLORE, () => (this.isExploreOpen = false));
    this.checkIfUserInStorage();
  },
  computed: {
    user() {
      return this.$store.getters.loggedIn;
    },
    isExploreOpen() {
      return this.$store.getters.isExploreOpen;
    },
    headerImgs() {
      return [
        {
          img:
            "https://images.pexels.com/photos/297642/pexels-photo-297642.jpeg?auto=compress&cs=tinysrgb&h=6590&w=4540",
          desc: "Walks",
          num: "6500+"
        },
        {
          img:
            "https://images.pexels.com/photos/235648/pexels-photo-235648.jpeg?auto=compress&cs=tinysrgb&h=3456&w=5184",
          desc: "Walks",
          num: "6500+"
        },
        {
          img:
            "https://images.pexels.com/photos/269850/pexels-photo-269850.jpeg?auto=compress&cs=tinysrgb&h=5472&w=3648",
          desc: "Walks",
          num: "6500+"
        },
        {
          img:
            "https://images.pexels.com/photos/691637/pexels-photo-691637.jpeg?auto=compress&cs=tinysrgb&h=3456&w=5184",
          desc: "Countries",
          num: "130"
        },
        {
          img:
            "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&h=3456&w=5184",
          desc: "Users",
          num: "80K"
        }
      ];
    }
  },
  methods: {
    setFilter() {
      let searchedText = this.searchedText;
      this.$store.dispatch({ type: "setFilter", searchedText });
      this.updateExplore(true);
      // this.$router.push('/explore');
    },
    checkIfUserInStorage() {
      let user = storageService.loadFromStorage("loggedInUser");
      if (user) {
        this.$store.dispatch({ type: "loggedIn", user });
      }
    },
    closeExplore() {
      eventBus.$emit(CLOSE_EXPLORE);
    },
    updateExplore(currStatus) {
      this.$store.dispatch({ type: "updateExplore", currStatus: currStatus });
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../../public/css/helpers.css";
$main-black: #383633;
section .explore-open {
  transition: all 0.3s;
  height: 0px;
  width: 100%;
  // transform: translateY(-100vh);
  // margin: 0;
}
.background-carousel {
  position: fixed;
  z-index: -1000;
  height: 100vh;
  margin-bottom: 4rem;
  position: relative;
  transition: all 0.5s;
  @media (max-width: 800px) {
    height: 50vh;
    margin-bottom: 1rem;
  }
  .slide-img {
    height: 100vh;
    width: 100%;
    transition: all 0.5s;
  }
}
.input-container {
  position: relative;
  .icon {
    position: absolute;
    top: 60%;
    left: 1.5%;
    font-size: 0.9em;
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
}
.home-nav-bar {
  padding: 0.5rem 1.5rem 1.5rem 1.5rem;
  @media (max-width: 740px) {
    display: none;
  }
  .logo {
    font-family: "Chalkduster";
    font-size: 2.5rem;
    cursor: pointer;
  }
  .links-container {
    font-size: 1.2rem;
    width: 300px;
    // font-family: 'roboto-medium';
    color: white;
    a {
      color: white;
      &:hover {
        color: $main-black;
        transform: scale(1.1);
        transition: 0.3s;
      }
    }
  }
}

.title-input-container {
  // z-index: -2;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 65%;
  @media (max-width: 520px) {
    width: 82%;
  }
  @media (max-width: 800px) {
    top: 22%;
  }
  h1 {
    color: white;
    font-size: 3rem;
    text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
    @media (max-width: 920px) {
      font-size: 2.5rem;
    }
    @media (max-width: 860px) {
      font-size: 2.4rem;
    }
    @media (max-width: 660px) {
      font-size: 2.1rem;
    }
    @media (max-width: 580px) {
      font-size: 1.9rem;
    }
    @media (max-width: 430px) {
      font-size: 1.3rem;
    }
  }
  input {
    border: none;
    margin-top: 2rem;
    height: 3rem;
    width: 60vw;
    border-radius: 0.3rem;
    padding-left: 2.5rem;
    color: #383633;
    font-family: "roboto-bold";
    font-size: 1rem;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
    @media (max-width: 600px) {
      margin-top: 1rem;
      height: 2rem;
      font-size: 0.7rem;
    }
  }
  ::placeholder {
    color: $main-black;
    font-family: "roboto-bold";
    font-size: 1rem;
    @media (max-width: 600px) {
      font-size: 0.7rem;
    }
  }
}

.app-data {
  position: absolute;
  bottom: 2%;
  left: 50%;
  transform: translate(-50%, -50%);
  p {
    color: white;
    font-family: "roboto-medium";
    font-size: 2.5rem;
    padding-bottom: 1rem;
    text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
    span {
      font-size: 1rem;
      opacity: 0.8;
      @media (max-width: 800px) {
        font-size: 0.7rem;
      }
    }
    @media (max-width: 960px) {
      font-size: 2rem;
    }
    @media (max-width: 840px) {
      font-size: 1.7rem;
    }
    @media (max-width: 840px) {
      padding: 0;
      font-size: 1.4rem;
    }
    @media (max-width: 400px) {
      font-size: 1.2rem;
    }
  }
  @media (max-width: 800px) {
    bottom: 50%;
    width: 100%;
    text-align: center;
  }
}
.drop-down {
  z-index: 100000;
}
.mobile-home-nav-bar {
  display: none;

  @media (max-width: 740px) {
    display: block;
    background-color: transparent;
    padding: 0.3rem 0;
    .mobile-logo {
      padding-left: 1rem;
      font-family: "Chalkduster";
      font-size: 1.6rem;
      cursor: pointer;
    }
    .hamburger {
      cursor: pointer;
      padding-right: 1rem;
      width: 20px;
      padding-top: 2px;
    }
    .mobile-links-container {
      button {
        background: none;
        border: none;
        font-size: 1.2rem;
        font-family: "roboto-medium";
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
.search-desc {
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
@media (max-width: 415px) {
  .title-input-container {
    input {
      padding-left: 1.5rem;
    }
  }
  .input-container {
    margin: 0;
    margin-top: 0;
    .icon {
      font-size: 0.7rem;
      top: 55%;
      left: 2.5%;
    }
  }
}
.logo-search-container {
}
</style>
