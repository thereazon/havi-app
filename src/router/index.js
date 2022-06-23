import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Cars from '@/views/Cars/index.vue'
import Temperature from '@/views/Temperature/index.vue'
import Containers from '@/views/Containers/index.vue'
import Dispatch from '@/views/Dispatch/index.vue'
import EntryRecord from '@/views/EntryRecord/index.vue'
import DeliveryNoteDetails from '@/components/DeliveryNoteDetails.vue'

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
    {
      path: '/containers',
      component: Containers,
    },
    {
      path: '/dispatch',
      component: Dispatch,
    },
    {
      path: '/entryRecord',
      component: EntryRecord,
    },
    {
      path: '/deliveryNoteDetails',
      component: DeliveryNoteDetails,
    },
  ],
})

export default router
