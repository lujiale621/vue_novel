import Vue from 'vue'
import Router from 'vue-router'
import home from '../home'
import detail from '../detail'
import searchdetail from '../searchdetail'
import showsort from '../showsort'
import showrank from '../showrank'
import readcontent from '../readcontent'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: home },
    { path: '/detail',component: detail},
    { path: '/searchdetail', component: searchdetail},
    { path: '/showsort', component: showsort},
    { path: '/showrank',component: showrank},
    { path: '/readcontent',component: readcontent}
  ]
})
