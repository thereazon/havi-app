const toCelsius = (temp) => Number((5 / 9.0) * (temp - 32)).toFixed(1)

const toFahrenheit = (temp) => Number((temp * 9) / 5 + 32).toFixed(1)

const tempTransfer = (temp, degreeType) => (degreeType === 'C' ? toFahrenheit(temp) : toCelsius(temp))

export const TempModule = {
  toCelsius,
  toFahrenheit,
  tempTransfer,
}
