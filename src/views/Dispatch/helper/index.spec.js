import { expect, describe, test } from 'vitest'
import { dispatchToDict, resturantByStatus } from '.'

const mockStores = [
  {
    id: 'DS62a976485a631',
    bu: 'MD',
    number: '00000506',
    name: 'test-store2',
    address: 'test-address2',
    tel: '03-3239975',
    arrival_time: '2022-06-16 13:30:00',
    sort: 1,
    status: 1,
  },
  {
    id: 'DS62a976485a632',
    bu: 'MD',
    number: '00000506',
    name: 'test-store2',
    address: 'test-address2',
    tel: '03-3239975',
    arrival_time: '2022-06-16 13:30:00',
    sort: 1,
    status: 0,
  },
  {
    id: 'DS62a976485a633',
    bu: 'MD',
    number: '00000506',
    name: 'test-store2',
    address: 'test-address2',
    tel: '03-3239975',
    arrival_time: '2022-06-16 13:30:00',
    sort: 1,
    status: 0,
  },
  {
    id: 'DS62a976485a634',
    bu: 'MD',
    number: '00000506',
    name: 'test-store2',
    address: 'test-address2',
    tel: '03-3239975',
    arrival_time: '2022-06-16 13:30:00',
    sort: 1,
    status: 4,
  },
  {
    id: 'DS62a976485a635',
    bu: 'MD',
    number: '00000506',
    name: 'test-store2',
    address: 'test-address2',
    tel: '03-3239975',
    arrival_time: '2022-06-16 13:30:00',
    sort: 1,
    status: 2,
  },
  {
    id: 'DS62a976485a636',
    bu: 'MD',
    number: '00000506',
    name: 'test-store2',
    address: 'test-address2',
    tel: '03-3239975',
    arrival_time: '2022-06-16 13:30:00',
    sort: 1,
    status: 2,
  },
]

const mockStoreByStatus = {
  PENDING_DELIVERY: [
    {
      id: 'DS62a976485a632',
      bu: 'MD',
      number: '00000506',
      name: 'test-store2',
      address: 'test-address2',
      tel: '03-3239975',
      arrival_time: '2022-06-16 13:30:00',
      sort: 1,
      status: 0,
    },
    {
      id: 'DS62a976485a633',
      bu: 'MD',
      number: '00000506',
      name: 'test-store2',
      address: 'test-address2',
      tel: '03-3239975',
      arrival_time: '2022-06-16 13:30:00',
      sort: 1,
      status: 0,
    },
  ],
  DELIVERING: [
    {
      id: 'DS62a976485a631',
      bu: 'MD',
      number: '00000506',
      name: 'test-store2',
      address: 'test-address2',
      tel: '03-3239975',
      arrival_time: '2022-06-16 13:30:00',
      sort: 1,
      status: 1,
    },
  ],
  ARRIVAL: [
    {
      id: 'DS62a976485a635',
      bu: 'MD',
      number: '00000506',
      name: 'test-store2',
      address: 'test-address2',
      tel: '03-3239975',
      arrival_time: '2022-06-16 13:30:00',
      sort: 1,
      status: 2,
    },
    {
      id: 'DS62a976485a636',
      bu: 'MD',
      number: '00000506',
      name: 'test-store2',
      address: 'test-address2',
      tel: '03-3239975',
      arrival_time: '2022-06-16 13:30:00',
      sort: 1,
      status: 2,
    },
  ],
  DELIVERY_COMPLETED: [
    {
      id: 'DS62a976485a634',
      bu: 'MD',
      number: '00000506',
      name: 'test-store2',
      address: 'test-address2',
      tel: '03-3239975',
      arrival_time: '2022-06-16 13:30:00',
      sort: 1,
      status: 4,
    },
  ],
}

const mockDispatch = [
  {
    id: 'DL62a976485009b',
    dc: 'NDC',
    no: 'N4031-12-2-E01',
    date: '10/14/2021',
    departure_time: '2022-06-16 13:13:00',
    temp_zone: 'F,C,D',
    cube: 401.06,
    status: 3,
    is_loading: 1,
    sort: 0,
    store: [
      {
        id: 'DS62a976485a638',
        bu: 'MD',
        number: '00000506',
        name: 'test-store',
        address: 'test-address',
        tel: '03-3239975',
        arrival_time: '2022-06-16 13:30:00',
        sort: 1,
        status: 2,
      },
    ],
  },
  {
    id: 'DL62a976485009c',
    dc: 'NDC',
    no: 'N4031-12-2-E01',
    date: '10/14/2021',
    departure_time: '2022-06-16 13:13:00',
    temp_zone: 'F,C,D',
    cube: 401.06,
    status: 3,
    is_loading: 1,
    sort: 0,
    store: mockStores,
  },
]

const mockDispatchDict = {
  DL62a976485009b: {
    id: 'DL62a976485009b',
    dc: 'NDC',
    no: 'N4031-12-2-E01',
    date: '10/14/2021',
    departure_time: '2022-06-16 13:13:00',
    temp_zone: 'F,C,D',
    cube: 401.06,
    status: 3,
    is_loading: 1,
    sort: 0,
    store: [
      {
        id: 'DS62a976485a638',
        bu: 'MD',
        number: '00000506',
        name: 'test-store',
        address: 'test-address',
        tel: '03-3239975',
        arrival_time: '2022-06-16 13:30:00',
        sort: 1,
        status: 2,
      },
    ],
  },
  DL62a976485009c: {
    id: 'DL62a976485009c',
    dc: 'NDC',
    no: 'N4031-12-2-E01',
    date: '10/14/2021',
    departure_time: '2022-06-16 13:13:00',
    temp_zone: 'F,C,D',
    cube: 401.06,
    status: 3,
    is_loading: 1,
    sort: 0,
    store: mockStores,
  },
}

describe('dispatchToDict', () => {
  test('dict should be null when dispatch is null', () => {
    expect(dispatchToDict(null)).toEqual(null)
  })
  test('dict should be null when dispatch is empty', () => {
    expect(dispatchToDict([])).toEqual(null)
  })
  test('dispatch should be converted to Dict correctly', () => {
    expect(dispatchToDict(mockDispatch)).toEqual(mockDispatchDict)
  })
})

describe('resturantByStatus', () => {
  test('resturantByStatus should be null when stores is null', () => {
    expect(resturantByStatus(null)).toEqual(null)
  })
  test('should be null when dispatch is empty', () => {
    expect(resturantByStatus([])).toEqual(null)
  })
  test('should be categorized correctly', () => {
    expect(resturantByStatus(mockStores)).toEqual(mockStoreByStatus)
  })
})
