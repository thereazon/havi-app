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
