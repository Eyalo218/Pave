/* <div class="mobile-home-nav-bar flex align-center">
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
</div> */