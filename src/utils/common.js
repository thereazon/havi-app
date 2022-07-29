const toCelsius = (temp) => Number((5 / 9.0) * (temp - 32)).toFixed(1)

const toFahrenheit = (temp) => Number((temp * 9) / 5 + 32).toFixed(1)

const tempTransfer = (temp, degreeType) => (degreeType === 'C' ? toFahrenheit(temp) : toCelsius(temp))

const between = (x, min, max) => x >= min && x <= max

/**
 * 區間判斷
 * 規範冷藏溫度；1個數字代表小於，2個數字代表區間 []
 * 規範冷凍溫度；1個數字代表小於，2個數字代表區間 []
 */
const isTempRangeInvalid = (isCelsius, frozenRange, coldRange, frozenTemp, coldTemp) => {
  let isInValid = false

  if (frozenRange.length === 1) {
    isInValid = isCelsius ? frozenTemp > TempModule.toCelsius(frozenRange[0]) : frozenTemp > frozenRange[0]
  } else {
    isInValid = isCelsius
      ? !between(frozenTemp, TempModule.toCelsius(frozenRange[0]), TempModule.toCelsius(frozenRange[1]))
      : !between(frozenTemp, frozenRange[0], frozenRange[1])
  }

  if (coldRange.length === 1) {
    isInValid = isCelsius ? coldTemp > TempModule.toCelsius(coldRange[0]) : coldTemp > coldRange[0]
  } else {
    isInValid = isCelsius
      ? !between(coldTemp, TempModule.toCelsius(coldRange[0]), TempModule.toCelsius(coldRange[1]))
      : !between(coldTemp, coldRange[0], coldRange[1])
  }

  return isInValid
}

export const TempModule = {
  toCelsius,
  toFahrenheit,
  tempTransfer,
  isTempRangeInvalid,
}
