// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design';
import vuescroll from 'vuescroll'
// import style
import 'view-design/dist/styles/iview.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.prototype.$http = axios
Vue.use(VueAxios,axios);
Vue.use(ViewUI);
Vue.config.productionTip = false
Vue.use(vuescroll); // install the vuescroll first
Vue.prototype.$vuescrollConfig = {
  bar: {
    background: '#000'
  }
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
