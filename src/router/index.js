import { createRouter, createWebHistory } from 'vue-router'
import useAccountInfo from '@/views/Login/store'
import Login from '@/views/Login/index.vue'
import Cars from '@/views/Cars/index.vue'
import Temperature from '@/views/Temperature/index.vue'
import Containers from '@/views/Containers/index.vue'
import Dispatch from '@/views/Dispatch/index.vue'
import Main from '@/views/Main/index.vue'
import EntryRecord from '@/views/EntryRecord/index.vue'
import Restaurant from '@/views/Restaurant/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Login',
      path: '/',
      component: Login,
    },
    {
      name: 'Cars',
      path: '/cars',
      component: Cars,
    },
    {
      path: '/main',
      component: Main,
      children: [
        {
          name: 'Temperature',
          path: 'temperature',
          component: Temperature,
          alias: '/temperature',
        },
        {
          name: 'Dispatch',
          path: 'dispatch',
          component: Dispatch,
          alias: '/dispatch',
        },
      ],
    },
    {
      name: 'Containers',
      path: '/containers',
      component: Containers,
    },
    {
      name: 'EntryRecord',
      path: '/entryRecord',
      component: EntryRecord,
    },
    {
      name: 'Restaurant',
      path: '/restaurant',
      component: Restaurant,
    },
  ],
})

router.beforeEach(async (to, from) => {
  const accountStore = useAccountInfo()
  const isAccountStored = !!accountStore.account

  if (!isAccountStored) {
    if (to.name === 'Login') return true

    return { name: 'Login' }
  }

  if (to.name === 'Login') {
    return { name: 'Dispatch' }
  }
})

export default router
