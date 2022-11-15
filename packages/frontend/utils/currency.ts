import currencyJs from 'currency.js'

export const getDecimalCount = (num: number) => {
  // Convert to String
  const numStr = String(num)
  // String Contains Decimal
  if (numStr.includes('.')) {
    return numStr.split('.')[1].length
  }
  // String Does Not Contain Decimal
  return 0
}

export const getFormattedCurrency = (value:number, precision = 2, symbol = '') => {
  return currencyJs(value, { precision, symbol }).format(
    (currency, options = {}) => {
      if (typeof currency !== 'object' || typeof currency.value !== 'number') {
        throw new Error('getFormattedCurrency: currency value must exist');
      } else if (!options.format) {
        throw new Error('getFormattedCurrency: format method must exist');
      } else {
        const format = options.format(currency, options)
        const valueWithoutTrailingZeroes = currency.value.toFixed(options.precision);
        const decimalCount = getDecimalCount(
          parseFloat(valueWithoutTrailingZeroes)
        )
        const precision = options.precision || 2;
        let trimLength = 0;
   
        // Only trim zeros after the second decimal
        if (precision > 2 ) {
          trimLength = decimalCount > 0
              ? precision - decimalCount
              : precision + 1
        }
  
        return format.slice(0, format.length - trimLength)
      }
    }
  )
}

export const getCurrency = (value: number, precision = 2, symbol = '') => {
  return currencyJs(value, { precision, symbol }).value;
}
