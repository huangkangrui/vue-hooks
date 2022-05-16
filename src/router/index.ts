import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoadingDelay from '../views/LoadingDelay.vue'
import Polling from '../views/Polling.vue'
import AutoRun from '../views/AutoRun.vue'
import RefreshOnWindowFocus from '../views/RefreshOnWindowFocus.vue'
import Debounce from '../views/Debounce.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/loadingDelay',
    name: 'LoadingDelay',
    component: LoadingDelay
  },
  {
    path: '/polling',
    name: 'Polling',
    component: Polling
  },
  {
    path: '/autoRun',
    name: 'AutoRun',
    component: AutoRun,
  },
  {
    path: '/refreshOnWindowFocus',
    name: 'RefreshOnWindowFocus',
    component: RefreshOnWindowFocus,
  },
  {
    path: '/debounce',
    name: 'Debounce',
    component: Debounce,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
