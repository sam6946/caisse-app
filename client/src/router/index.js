import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginRegister from '../views/LoginRegister.vue'
import Dashboard from '../views/Dashboard.vue'
import Statistique from '../views/Statistique.vue'
import Retrait from '../views/Retrait.vue'
import Depot from '../views/Depot.vue'
import Notification from '../views/Notification.vue'
import Historique from '../views/Historique.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/loginRegister',
    name: 'loginRegister',
    component: LoginRegister
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/statistique',
    name: 'statistique',
    component: Statistique
  },
  {
    path: '/retrait',
    name: 'retrait',
    component: Retrait
  },
  {
    path: '/depot',
    name: 'depot',
    component: Depot
  },
  {
    path: '/notification',
    name: 'notification',
    component: Notification
  },
  {
    path: '/historique',
    name: 'historique',
    component: Historique
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.fullPath === '/dashboard'){
    if(!localStorage.getItem('user')){
      next('/')
    }
  }
  if(to.fullPath === '/loginRegister'){
    if(localStorage.getItem('user')){
      next('/profile')
    }
  }
  if(to.fullPath === '/transaction'){
    if(!localStorage.getItem('user')){
      next('/')
    }
  }
  if(to.fullPath === '/statitique'){
    if(!localStorage.getItem('user')){
      next('/')
    }
  }
  if(to.fullPath === '/retrait'){
    if(!localStorage.getItem('user')){
      next('/')
    }
  }
  if(to.fullPath === '/notification'){
    if(!localStorage.getItem('user')){
      next('/')
    }
  }
  if(to.fullPath === '/historique'){
    if(!localStorage.getItem('user')){
      next('/')
    }
  }
  if(to.fullPath === '*'){
    if(!localStorage.getItem('user')){
      next('/')
    }
  }


  next()
})

export default router

