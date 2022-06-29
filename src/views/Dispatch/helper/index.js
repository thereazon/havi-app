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
  1: RestaurantStatusType.DELIVERING,
  2: RestaurantStatusType.ARRIVAL,
  3: RestaurantStatusType.TEMP_CONFIRMATION,
  4: RestaurantStatusType.DELIVERY_COMPLETED,
  11: RestaurantStatusType.DELAY,
  12: RestaurantStatusType.UNABLE_DELIVERY,
}

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

export const resturantByStatus = (resturants) => {
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
