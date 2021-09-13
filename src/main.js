import Vue from 'vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import "normalize.css/normalize.css"
import 'lib-flexible'

Vue.use(ElementUI,{ size: 'small', zIndex: 3000 });
Vue.config.productionTip = false

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
