import currencyJs from 'currency.js'

export const getDecimalCount = (num) => {
  // Convert to String
  const numStr = String(num)
  // String Contains Decimal
  if (numStr.includes('.')) {
    return numStr.split('.')[1].length
  }
  // String Does Not Contain Decimal
  return 0
}

export const getFormattedCurrency = (value, precision, symbol = '') => {
  return currencyJs(value, { precision, symbol }).format(
    (currency, options) => {
      const format = options.format(currency, options)
      const decimalCount = getDecimalCount(
        parseFloat(currency.value.toFixed(options.precision))
      )
      const trimLength =
        decimalCount > 0
          ? options.precision - decimalCount
          : options.precision + 1

      return format.slice(0, format.length - trimLength)
    }
  )
}