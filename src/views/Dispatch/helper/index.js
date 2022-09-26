export const mockData = [
  {
    id: 'DL122345',
    dc: 'NDC',
    no: 'N1501-06-4',
    date: '01/26/2021',
    departure_time: '2020-12-22 23:30:00',
    temp_zone: 'F,C,D',
    cube: 2100.5,
    status: 1,
    sort: 0,
    is_loading: 0,
    store: [
      {
        id: 'SM12345',
        bu: 'MD',
        number: '12345678',
        name: '台北民生',
        address: '台北市民生東路三段135號',
        tel: '02-27130175',
        arrival_time: '2021-03-19 13:30:00',
        sort: 1,
        status: 0,
      },
    ],
  },
  {
    id: 'DL2222',
    dc: 'NDC',
    no: 'N1501-06-4',
    date: '01/26/2021',
    departure_time: '2020-12-22 23:30:00',
    temp_zone: 'F,C,D',
    cube: 2100.5,
    status: 1,
    sort: 1,
    is_loading: 0,
    store: [
      {
        id: 'SM12345',
        bu: 'MD',
        number: '12345678',
        name: '台北民生1',
        address: '台北市民生東路三段135號',
        tel: '02-27130175',
        arrival_time: '2021-03-19 16:30:00',
        sort: 1,
        status: 0,
      },
      {
        id: 'SM12345',
        bu: 'MD',
        number: '12345678',
        name: '台北民生2',
        address: '台北市民生東路三段135號',
        tel: '02-27130175',
        arrival_time: '2021-03-19 16:30:00',
        sort: 1,
        status: 0,
      },
    ],
  },
  {
    id: 'DL122345',
    dc: 'NDC',
    no: 'N1501-06-4',
    date: '01/26/2021',
    departure_time: '2020-12-22 23:30:00',
    temp_zone: 'F,C,D',
    cube: 2100.5,
    status: 1,
    sort: 0,
    is_loading: 0,
    store: [
      {
        id: 'SM12345',
        bu: 'MD',
        number: '12345678',
        name: '台北民生',
        address: '台北市民生東路三段135號',
        tel: '02-27130175',
        arrival_time: '2021-03-19 13:30:00',
        sort: 1,
        status: 0,
      },
    ],
  },
  {
    id: 'DL2222',
    dc: 'NDC',
    no: 'N1501-06-4',
    date: '01/26/2021',
    departure_time: '2020-12-22 23:30:00',
    temp_zone: 'F,C,D',
    cube: 2100.5,
    status: 1,
    sort: 1,
    is_loading: 0,
    store: [
      {
        id: 'SM12345',
        bu: 'MD',
        number: '12345678',
        name: '台北民生1',
        address: '台北市民生東路三段135號',
        tel: '02-27130175',
        arrival_time: '2021-03-19 16:30:00',
        sort: 1,
        status: 0,
      },
      {
        id: 'SM12345',
        bu: 'MD',
        number: '12345678',
        name: '台北民生2',
        address: '台北市民生東路三段135號',
        tel: '02-27130175',
        arrival_time: '2021-03-19 16:30:00',
        sort: 1,
        status: 0,
      },
    ],
  },
]

export const mockQuery = {
  container_id: 'container_id',
  car_id: 'car_id',
}

export const RestaurantStatusType = {
  PENDING_DELIVERY: 'PENDING_DELIVERY',
  DELIVERING: 'DELIVERING',
  ARRIVAL: 'ARRIVAL',
  TEMP_CONFIRMATION: 'TEMP_CONFIRMATION',
  DELIVERY_COMPLETED: 'DELIVERY_COMPLETED',
  DELAY: 'DELAY',
  UNABLE_DELIVERY: 'UNABLE_DELIVERY',
}

export const RestaurantStatusNumberToType = {
  0: RestaurantStatusType.PENDING_DELIVERY,
  1: RestaurantStatusType.DELIVERING, ///配送中(1)
  2: RestaurantStatusType.ARRIVAL, //配送中(1)
  12: RestaurantStatusType.TEMP_CONFIRMATION, //  攜回配銷中心(12)
  4: RestaurantStatusType.DELIVERY_COMPLETED, // 配送完成(4)
  11: RestaurantStatusType.DELAY, //延後配送(10)
  10: RestaurantStatusType.UNABLE_DELIVERY, //無法配送(10)
}

export const RestaurantTab = {
  DELIVERING: RestaurantStatusType.DELIVERING, // //配送中(1) 已抵達(2)
  PENDING_DELIVERY: RestaurantStatusType.PENDING_DELIVERY, //待配送(0) 延後配送(11)
  DELIVERY_COMPLETED: RestaurantStatusType.DELIVERY_COMPLETED, ////配送完成(4)
  UNABLE_DELIVERY: RestaurantStatusType.UNABLE_DELIVERY, //無法配送(12) 攜回配銷中心(3)
}

export const RestaurantStatusBackgroundColor = {
  DELIVERING: 'delivery',
  PENDING_DELIVERY: 'pending',
  DELIVERY_COMPLETED: 'completed',
  UNABLE_DELIVERY: 'unable',
}

export const RestaurantStatusTypeToZh = {
  DELIVERING: '配送中',
  ARRIVAL: '已抵達',
  PENDING_DELIVERY: '待配送',
  DELIVERY_COMPLETED: '配送完成',
  TEMP_CONFIRMATION: '攜回DC',
  DELAY: '延後配送',
  UNABLE_DELIVERY: '無法配送',
}

export const restaurantStatusFromStatusToZh = (status) => RestaurantStatusTypeToZh[RestaurantStatusNumberToType[status]]

export const DispatchStatusType = {
  NO_CHECK_IN: 'NO_CHECK_IN',
  NO_CHECK_OUT: 'NO_CHECK_OUT',
  PRE_COOLING: 'PRE_COOLING',
  CHECK_OUT: 'CHECK_OUT',
}

//	狀態 0:未報到 1:未出車 2:完成預冷 3:已出車
export const DispatchStatusNumberToType = {
  0: DispatchStatusType.NO_CHECK_IN,
  1: DispatchStatusType.NO_CHECK_OUT,
  2: DispatchStatusType.PRE_COOLING,
  3: DispatchStatusType.CHECK_OUT,
}

export const showPreCoolChecked = (status) =>
  status === DispatchStatusType.PRE_COOLING || status === DispatchStatusType.CHECK_OUT

export const dispatchToDict = (dispatchs) => {
  if (!dispatchs || dispatchs.length === 0) return null
  return dispatchs.reduce(
    (dict, curr) => ({
      ...dict,
      [curr.id]: curr,
    }),
    {},
  )
}

export const restaurantByStatus = (resturants) => {
  if (!resturants || resturants.length === 0) return null
  return resturants.reduce((prev, curr) => {
    const type = RestaurantStatusNumberToType[curr.status]
    if (prev[type]) {
      return {
        ...prev,
        [type]: prev[type].concat(curr),
      }
    } else {
      return {
        ...prev,
        [type]: [curr],
      }
    }
  }, {})
}

export const LockTempType = {
  UNLOCKED: 'UNLOCKED',
  GET_TEMP: 'GET_TEMP',
  PICTURE_TEMP: 'PICTURE_TEMP',
  MISS_TEMP: 'MISS_TEMP',
  NORMAL_TEMP: 'NORMAL_TEMP',
}

// 0:尚未鎖定 1:擷取溫度 2:拍照溫度 3:略過溫度 4:常溫....
export const LockTempNumberToType = {
  0: LockTempType.UNLOCKED,
  1: LockTempType.GET_TEMP,
  2: LockTempType.PICTURE_TEMP,
  3: LockTempType.MISS_TEMP,
  4: LockTempType.NORMAL_TEMP,
}

export const PluginStatusType = {
  PENDING_DELIVERY: 'PENDING_DELIVERY',
  DELIVERING: 'DELIVERING',
  ARRIVAL: 'ARRIVAL',
}

export const PluginNumberToType = {
  0: PluginStatusType.PENDING_DELIVERY,
  1: PluginStatusType.DELIVERING,
  2: PluginStatusType.ARRIVAL,
}

export const PluginStatusToButtonName = {
  PENDING_DELIVERY: '開始配送',
  DELIVERING: '抵達位置',
  ARRIVAL: '已抵達餐廳',
}
