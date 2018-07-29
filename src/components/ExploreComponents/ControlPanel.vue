<template>
    <section>
        <div class="container">
            <div class="container-left">
                <router-link :to="'/'">
                    <div class="logo" ><span>P</span></div>
                </router-link>
                <input class="search" type="text" v-model="search" placeholder="Seach">
            </div>
            <div class="buttons contaienr-right">
                <router-link :to="'/'">
                    <button>Home</button>
                </router-link>
                <router-link :to="`/profile/${user._id}`">
                    <button>{{user.name}}</button>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>

import {eventBus, LOGGED_IN} from '../../service/eventBus.js'
import userService from '../../service/userService.js'

export default {
    name: 'CtrPanel',
    components:{},
    data(){
        return {
            search: '',
            user: userService.getLoggedinUser(),
        }
    },
    created() {
         eventBus.$on(LOGGED_IN, user => this.user = user)
    },
    computed:{
    },
    methods:{
    }
}
</script>


<style lang="scss" scoped>
    .container{

      border-bottom: 1px solid #EFEFEF;
      height: 70px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 2rem;
      align-items: center;
        .container-left{

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
          background-color: #EFEFEF;
          border:none;
        }
        }
        .contaienr-right {


          button {
            background-color: none;
            border: none;
            font-size: 1rem;
            font-family: 'roboto-bold';
            color: #383633;
            cursor: pointer;
            margin-right: 2rem;
          }
        }

    }
</style>
