import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Explore from './views/Explore.vue'
import HowItWorks from './views/HowItWorks.vue'
import signUp from './views/SignUp.vue'
import tripDetails from './views/TripDetails.vue'
// import 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/explore',
      name: 'explore',
      component: Explore
    },
    {
      path: '/how',
      name: 'howItWorks',
      component: HowItWorks
    },
    {
      path: '/signup',
      name: 'signup',
      component: signUp
    },
    {
      path: '/trips/:tripId?',
      name: 'tripDetails',
      component: tripDetails
    },
  ]
})
