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
