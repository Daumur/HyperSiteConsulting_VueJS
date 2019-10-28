import Vue from 'vue'
import Menu from './Menu.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import VueSession from 'vue-session'
import VueSessionStorage from 'vue-sessionstorage'

Vue.config.productionTip = false
Vue.use(vuetify)
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(VueSessionStorage)
Vue.use(VueSession)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: require('@/components/Home.vue').default
  },
  {
    path: '/login',
    name: 'Login',
    component: require('@/View/Login.vue').default
  },
  {
    path: '/about',
    name: 'About',
    component: require('@/View/About.vue').default
  },
  {
    path: '/register',
    name: 'Register',
    component: require('@/View/Register.vue').default
  },
  {
    path: '/article',
    name: 'Article',
    component: require('@/components/Article.vue').default
  },
  {
    path: '/todo',
    name: 'ToDo',
    component: require('@/components/ToDo.vue').default
  },
  {
    path: '/',
    name: 'about',
    component: require('@/View/About.vue').default
  },
  { path: '*', redirect: '/about' }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  vuetify,
  render: h => h(Menu)
}).$mount('#app')
