import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Cars from '@/views/Cars/index.vue'
import Temperature from '@/views/Temperature/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Login,
    },
    {
      path: '/cars',
      component: Cars,
    },
    {
      path: '/temperature',
      component: Temperature,
    },
  ],
})

export default router
