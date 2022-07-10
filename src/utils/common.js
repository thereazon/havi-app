const toCelsius = (temp) => (5 / 9.0) * (temp - 32)

const toFahrenheit = (temp) => (temp * 9) / 5 + 32

const tempTransfer = (temp, degreeType) => (degreeType === 'C' ? toFahrenheit(temp) : toCelsius(temp))

export const TempModule = {
  toCelsius,
  toFahrenheit,
  tempTransfer,
}
