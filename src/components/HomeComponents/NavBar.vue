<template>
    <section>
        <nav class="nav-container flex space-between align-center">
            <div class="left-nav flex align-center">
                <div @click="updateExplore(false)" class="logo">Pave</div>
                <input v-model="searchedText" @keyup.enter="setFilter" v-if="isExploreOpen" class="search" type="text" placeholder="Seach"/>
            </div>
            <div class="right-nav-mobile">
                <div class="hamburger">
                    <img @click="dropDownOpen=!dropDownOpen" class="hamburger" src="../../../public/img/hamburger.svg">
                </div>
                <div>
                    <div v-if="user" class="links-container flex space-between">
                        <router-link  :to="'/how'"><button>Explore</button></router-link>
                        <button @click="logOut" >Log out</button>
                        <router-link :to="`/profile/${user._id}`"><button class="user-link" >{{user.name}}</button></router-link>
                    </div>
                    <div v-else class="links-container flex space-between">
                    <!-- <router-link  :to="'/how'"><bottun>How it works</bottun></router-link> -->
                        <router-link  :to="'/signup'"><button>Sign up</button></router-link>
                        <router-link  :to="'/login'"><button>Log in</button></router-link>
                    </div>
                </div>
            </div>
        </nav>
        <div v-if="dropDownOpen" class="drop-down">
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
    </section>
</template>

<script>
export default {
    name: "navBar",
    data() {
        return {
            dropDownOpen: false,
            searchedText:'',
        };
    },
    components: {},
    created() {},
    computed: {
        user() {
            return this.$store.getters.loggedIn
        },
        isExploreOpen() {
            return this.$store.getters.isExploreOpen
        }
    },
    methods: {
        updateExplore(currStatus) {
            this.$store.dispatch({type: 'updateExplore', currStatus: currStatus})
        },
        logOut() {
        this.$store.dispatch({type: 'loggedOut'})
        },
        setFilter() {
        let searchedText = this.searchedText;
        this.$store.dispatch({type:'setFilter',searchedText})
        }
    }
}
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
                            height: 1.6rem;
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
