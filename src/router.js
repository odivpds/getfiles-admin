import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Welcome from './views/Welcome.vue'
import Player from './views/Player.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/generator',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/play/:slug',
    name: 'Player',
    component: Player
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
