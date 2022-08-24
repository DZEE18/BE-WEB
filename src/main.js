import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import VueRouter from './router'
import router from './router/index'
import _ from 'lodash'
import ToggleButton from 'vue-js-toggle-button'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import * as Helper from './utils/Helper' 

Vue.use(Vuex)
Vue.use(axios)
Vue.prototype.$axios = axios
Vue.prototype.$helper = Helper.default
Vue.use(VueCookies)
Vue.config.productionTip = false
Vue.use(VueRouter)
Object.defineProperty(Vue.prototype, '$_', { value: _ })
Vue.use(require('vue-moment'))
Vue.use(ToggleButton)
Vue.use(Toast, {
    position: 'top-right',
    newestOnTop: true,
    maxToasts: 5,
    transition: 'Vue-Toastification__bounce',
    transitionDuration: 750,
    draggable: true,
    draggablePercent: 0.6,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    closeOnClick: true,
    timeout: 2000,
    hideProgressBar: false,
    hideCloseButton: false,
    icon: true
});

// Vue.use(VueCharts)
// Vue.use

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')