import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
Vue.config.productionTip = false;
import 'ant-design-vue/dist/antd.css';
import VueAliplayerV2 from 'vue-aliplayer-v2';

Vue.use(VueAliplayerV2);
Vue.use(Antd);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
