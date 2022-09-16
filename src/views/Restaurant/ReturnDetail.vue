<script setup>
import { ref, onMounted } from 'vue'
import { Collapse, CollapseItem, Button, NavBar, Switch, Field } from 'vant'
import RestaurantMenuPopup from './components/RestaurantMenuPopup.vue'
import useRestaurant from '@/views/Restaurant/store'
import { useRouter, useRoute } from 'vue-router'
import { useAlertModal } from '@/components/store/AlertModalStore'
const modal = useAlertModal()
const restaurantStore = useRestaurant()
const { currentReturned } = restaurantStore
const router = useRouter()
const route = useRoute()
const isShowMenu = ref(false)
const toggleSet = ref(true)
const togglePcs = ref(false)

onMounted(() => {
  if (!restaurantStore.currentReturned) {
    router.push({
      path: '/dispatch',
      query: {
        ...route.query,
      },
    })
  }
})

const onClickLeft = () => {
  router.push({
    path: '/restaurant/returned',
    query: {
      ...route.query,
    },
  })
}

const onClickRight = () => {
  isShowMenu.value = true
}

const collapseActiveNames = ref(['open'])

const handleUpdateDetail = () => {
  if (restaurantStore.returnDetail.m_qty > currentReturned.items.qty) {
    modal.open({
      type: 'error',
      title: '錯誤',
      content: '數量不可大於該品項的最大數',
    })
  } else {
    const data = {
      qty: restaurantStore.returnDetail.m_qty,
      set_qty: restaurantStore.returnDetail.m_set_qty,
      pcs_qty: restaurantStore.returnDetail.m_pcs_qty,
      note: restaurantStore.returnDetail.note2,
    }
    restaurantStore.postReturnDetailAction(currentReturned.items.id, data, onClickLeft)
  }
}
</script>

<template>
  <div class="bg-[#F2F8FB] pb-5">
    <RestaurantMenuPopup v-model:isShow="isShowMenu" />
    <NavBar
      safe-area-inset-top
      fixed
      left-arrow
      title="更改退貨數量"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      ><template #right> <van-icon name="wap-nav" size="14" color="black" /> </template>
    </NavBar>
    <div v-if="restaurantStore.currentReturned" class="px-[26px] pt-20">
      <div class="rounded-t-[20px] overflow-hidden">
        <div class="flex border-b-0 px-[20px] py-[15px] justify-between items-center bg-white">
          <div>
            <div class="flex text-[14px] text-primary mb-4 items-center">
              <div class="font-bold">單號</div>
              <div>{{ currentReturned.no }}</div>
            </div>
            <div class="flex items-center gap-2">
              <img class="w-[20px]" src="/dispatching_calendar.png" alt="icon" />
              <div class="bg-[#f2f2f2] text-gray p-1 text-[12px]">{{ currentReturned.date }}</div>
            </div>
          </div>
        </div>
      </div>
      <Collapse v-model="collapseActiveNames">
        <CollapseItem readonly="true" name="open">
          <template #title>
            <div class="flex gap-4">
              <div class="w-full">
                <div class="flex items-center">
                  <div class="text-[12px] mr-5">
                    <div
                      class="w-[20px] h-[20px] bg-primary flex rounded-full text-white font-bold items-center justify-center"
                    >
                      {{ currentReturned.code }}
                    </div>
                  </div>
                  <div class="flex-1">
                    <div class="text-primary font-bold">
                      {{ currentReturned.name }}
                    </div>
                    <div class="text-gray text-[12px]">{{ currentReturned.return_no }}</div>
                    <div class="flex justify-between text-[12px] pr-5">
                      <div class="text-primary font-bold">
                        {{ currentReturned.m_qty > 0 ? currentReturned.m_qty : currentReturned.qty }}
                      </div>
                      <div>{{ currentReturned.unit }}</div>
                      <div class="text-primary font-bold">
                        {{ currentReturned.m_set_qty > 0 ? currentReturned.m_set_qty : currentReturned.set_qty }}
                      </div>
                      <div>{{ currentReturned.set_unit }}</div>
                      <div class="text-primary font-bold">
                        {{ currentReturned.m_pcs_qty > 0 ? currentReturned.m_pcs_qty : currentReturned.pcs_qty }}
                      </div>
                      <div>{{ currentReturned.pcs_unit }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <li class="detail-list list-none mx-4 leading-snug h-11 flex items-center text-gray">
            <div class="bg-[#f2f2f2] w-full">
              <div class="flex">
                <div class="w-full">
                  <div class="flex items-center">
                    <div class="mr-5">
                      <div class="w-[20px] h-[20px]" />
                    </div>
                    <div class="flex-1">
                      <div class="flex text-gray text-[12px] mb-2 gap-12">
                        <div>{{ currentReturned.items.exp }}</div>
                        <div v-if="currentReturned.items.batch_no">#{{ currentReturned.items.batch_no }}</div>
                      </div>
                      <div class="flex justify-between text-[12px] mr-5">
                        <div class="text-primary font-bold">
                          {{
                            currentReturned.items.m_qty > 0 ? currentReturned.items.m_qty : currentReturned.items.qty
                          }}
                        </div>
                        <div>{{ currentReturned.items.unit }}</div>
                        <div class="text-primary font-bold">
                          {{
                            currentReturned.items.m_set_qty > 0
                              ? currentReturned.items.m_set_qty
                              : currentReturned.items.set_qty
                          }}
                        </div>
                        <div>{{ currentReturned.items.set_unit }}</div>
                        <div class="text-primary font-bold">
                          {{
                            currentReturned.items.m_pcs_qty > 0
                              ? currentReturned.items.m_pcs_qty
                              : currentReturned.items.pcs_qty
                          }}
                        </div>
                        <div>{{ currentReturned.items.pcs_unit }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </CollapseItem>
      </Collapse>
      <div class="mt-5 p-5 rounded-[20px] border border-solid bg-white">
        <div class="text-[#707070] text-center">備註</div>
        <div>
          <input v-model="restaurantStore.returnDetail.note2" type="text" class="input" />
          <div class="note">{{ restaurantStore.returnDetail.note }}</div>
        </div>
      </div>

      <div class="mt-5 p-5 rounded-[20px] border border-solid bg-white">
        <div class="mb-[13px] text-[#707070] text-center">變更實際退貨量</div>
        <div class="grid grid-cols-6 w-full mb-[9px] items-center">
          <div class="text-[15px] text-[#707070] col-span-1">{{ currentReturned.items.unit }}</div>
          <Field v-model="restaurantStore.returnDetail.m_qty" type="digit" class="havi-input col-span-4" />
        </div>
        <div class="grid grid-cols-6 w-full items-center mb-[9px]">
          <div class="text-[15px] text-[#707070] col-span-1" :class="{ 'text-[#bbb]': !toggleSet }">內包</div>
          <Field
            v-model="restaurantStore.returnDetail.m_set_qty"
            :disabled="!toggleSet"
            type="digit"
            class="havi-input col-span-4"
          />
          <Switch v-model="toggleSet" active-color="#6dbe5b" size="15px" class="mx-auto"></Switch>
        </div>
        <div class="grid grid-cols-6 w-full items-center mb-[9px]">
          <div class="text-[15px] text-[#707070] col-span-1" :class="{ 'text-[#bbb]': !togglePcs }">零散</div>
          <Field
            v-model="restaurantStore.returnDetail.m_pcs_qty"
            :disabled="!togglePcs"
            type="digit"
            class="havi-input col-span-4"
          />
          <Switch v-model="togglePcs" active-color="#6dbe5b" size="15px" class="mx-auto"></Switch>
        </div>
      </div>
      <Button :onClick="handleUpdateDetail" class="bg-success mt-8" loading-type="spinner" round block type="success"
        >完成</Button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input {
  border: none;
  margin-top: 15px;
  width: 100%;
  background-color: inherit;
  border-bottom: 1px solid #c8c8c8;
}

.note {
  color: #707070;
  margin-top: 8px;
  padding: 0 5px;
}

.slide-leave-active,
.slide-enter-active {
  transition: all 0.5s ease;
}

.slide-enter-to {
  margin-top: 0px;
}

.active {
  border: solid 2px #eb5e55;
}

.tab-active {
  border: 2px solid #eb5e55;
}
:deep(.van-cell__right-icon) {
  display: none;
}
:deep(.van-collapse-item > .van-cell) {
  border-radius: 0 0 0.75rem 0.75rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
:deep(.van-collapse-item:last-child) {
  border-bottom: 0;
}
:deep(.van-collapse-item__content) {
  padding: 10px 0;
  background: #f2f2f2;
}
.detail-list {
  border-bottom: 1px solid #707070;
}
.detail-list:last-child {
  border-bottom: 0;
}
</style>
