import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
    get,
    post,
    msg
} from './utils/axios'

// 导入字体图标
import './assets/fonts/iconfont.css'

import './plugins/element.js'

Vue.config.productionTip = false
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$msg = new msg()

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')