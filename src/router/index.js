import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Cars from '@/views/Cars/index.vue'
import Temperature from '@/views/Temperature/index.vue'
import Containers from '@/views/Containers/index.vue'
import Dispatch from '@/views/Dispatch/index.vue'
import Group from '@/views/Group/index.vue'

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
      path: '/group',
      component: Group,
      children: [
        {
          path: 'temperature',
          component: Temperature,
          alias: '/temperature',
        },
        {
          path: 'dispatch',
          component: Dispatch,
          alias: '/dispatch',
        },
      ],
    },
    {
      path: '/containers',
      component: Containers,
    },
  ],
})

export default router
