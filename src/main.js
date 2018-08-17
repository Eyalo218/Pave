import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import '../public/css/helpers.css'
import '../public/css/main.css'
import './registerServiceWorker'
import * as VueGoogleMaps from 'vue2-google-maps'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import StarRating from 'vue-star-rating'
library.add(fas);
import VueCarousel from 'vue-carousel';

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('star-rating', StarRating);
Vue.use(VueCarousel);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBK-PV1V8IShmHQTUAmrsKsNmm-eSk6nIo',
    libraries: 'places',
  }
});


Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
