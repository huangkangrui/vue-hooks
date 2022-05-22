/*
 * @Author: CodeDragon 1505207242@qq.com
 * @Date: 2022-05-20 22:32:13
 * @LastEditors: CodeDragon 1505207242@qq.com
 * @LastEditTime: 2022-05-20 22:57:01
 * @FilePath: \vue-hooks\src\router\index.ts
 * @Description: 
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoadingDelay from '../views/LoadingDelay.vue'
import Polling from '../views/Polling.vue'
import AutoRun from '../views/AutoRun.vue'
import RefreshOnWindowFocus from '../views/RefreshOnWindowFocus.vue'
import Debounce from '../views/Debounce.vue'
import Throttle from '../views/Throttle.vue'
import Retry from '../views/Retry.vue'

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
  {
    path: '/throttle',
    name: 'Throttle',
    component: Throttle,
  },
  {
    path: '/retry',
    name: 'Retry',
    component: Retry,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
