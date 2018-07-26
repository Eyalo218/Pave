import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import '../public/css/helpers.css'
import '../public/css/main.css'
import './registerServiceWorker'
import * as VueGoogleMaps from 'vue2-google-maps'
// const API_KEY = 'AIzaSyAtV_-P7Dy8mEqJh4X39HrKQheE9gu5Jns';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAtV_-P7Dy8mEqJh4X39HrKQheE9gu5Jns',
    libraries: 'places',
  }});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
