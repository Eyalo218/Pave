<template>
    <section>
        <div class="container">
            <div class="container-left">
                <router-link :to="'/'">
                    <div class="logo" ><span>P</span></div>
                </router-link>
                <input @keyup.enter="setFilter" class="search" type="text" v-model="searchedText" placeholder="Seach">
            </div>
            <div class="buttons contaienr-right">
                <router-link :to="'/'">
                    <button>Home</button>
                </router-link>
                <router-link :to="'/profile'">
                    <button>Profile</button>
               </router-link>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: "CtrPanel",
  components: {},
  data() {
    return {
      searchedText: ""
    };
  },
  created() {
    this.searchedText = this.$store.state.currFilter;
    this.displayTripsByText();
  },
  computed: {},
  methods: {
    setFilter() {
      let searchedText = this.searchedText;
      this.$store.commit({ type: "setFilter", searchedText });
      this.displayTripsByText();
    },
    displayTripsByText() {
      let searchedText = this.$store.state.currFilter;
      this.$store.dispatch({ type: "loadTrips", searchedText });
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
    .search {
      width: 600px;
      height: 30px;
      padding: 5px 20px;
      border-radius: 5px;
      font-size: 1rem;
      background-color: #efefef;
      border: none;
    }
  }
  .contaienr-right {
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
