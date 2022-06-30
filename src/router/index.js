import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Cars from '@/views/Cars/index.vue'
import Temperature from '@/views/Temperature/index.vue'
import Containers from '@/views/Containers/index.vue'
import ExceptionRegistration from '@/views/ExceptionRegistration/index.vue'
import Dispatch from '@/views/Dispatch/index.vue'
import Main from '@/views/Main/index.vue'
import EntryRecord from '@/views/EntryRecord/index.vue'
import Restaurant from '@/views/Restaurant/index.vue'

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
      path: '/ExceptionRegistration',
      component: ExceptionRegistration,
    },
    {
      path: '/main',
      component: Main,
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
    {
      path: '/entryRecord',
      component: EntryRecord,
    },
    {
      path: '/restaurant',
      component: Restaurant,
    },
  ],
})

export default router
