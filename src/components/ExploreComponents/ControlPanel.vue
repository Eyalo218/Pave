<template>
    <section>
        <div class="container">
            <div class="container-left">
                <router-link :to="'/'">
                    <div class="logo" ><span>P</span></div>
                </router-link>
                <div class="input-container">
                    <font-awesome-icon class="search-icon" icon="search" size="sm" />
                <input @keyup.enter="setFilter" class="search" type="text" v-model="searchedText" placeholder="Seach"/>
                </div>
            </div>
            <div class="container-right">
                <router-link :to="'/'">Home</router-link>
                <router-link class="flex" :to="'/'">
                <div class="user-img"></div>
                <span>username</span>
                </router-link>
                 <font-awesome-icon class="search-icon" icon="comments" size="lg" />
                 <font-awesome-icon class="search-icon" icon="bell" size="lg" />

                <!-- <router-link v-if="user" :to="`/profile/${user._id}`">
                <div>img</div>
                    {{user.name}}
                </router-link>
                <router-link v-else :to="`/login`">
                    <button>login</button>
                </router-link> -->
            </div>
        </div>
    </section>
</template>

<script>
import { eventBus, LOGGED_IN } from "../../service/eventBus.js";
import userService from "../../service/userService.js";

export default {
  name: "CtrPanel",
  components: {},
  data() {
    return {
      searchedText: "",
      user: userService.getLoggedinUser() ? userService.getLoggedinUser() : null
    };
  },
  created() {
    this.searchedText = this.$store.state.currFilter;
    this.displayTripsByText();
    eventBus.$on(LOGGED_IN, user => (this.user = user));
  },
  methods: {
    setFilter() {
      let searchedText = this.searchedText;
      this.$store.commit({ type: "setFilter", searchedText });
      this.displayTripsByText();
    },
    displayTripsByText() {
      let searchedText = this.$store.state.currFilter;
      this.$store.dispatch({ type: "loadTrips", searchedText }).then(() => {
        
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.container {
  border-bottom: 1px solid #efefef;
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
      border-radius: 2px;
      background-color: #44809e;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.3rem;
      margin-right: 2rem;
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
      width: 40vw;
      height: 30px;
      padding: 0.25rem 2.5rem;
      border-radius: 5px;
      font-size: 1rem;
      background-color: #efefef;
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
    justify-content: space-around;
    align-items: center;
    * {
      color: #b4b4b4;
    }
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
      background-color: none;
      border: none;
      font-size: 1rem;
      font-family: "roboto-bold";
      color: #383633;
      cursor: pointer;
      margin-right: 2rem;
    }
  }
}
</style>
