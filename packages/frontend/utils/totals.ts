import currency from 'currency.js'

export const getLoanToValueFromBorrow = (borrowAmount:number, collateralValue:number) => {
  return currency(borrowAmount / collateralValue).value
}

export const getDebtFromBorrow = (borrowAmount:number, fee:number) => {
  return currency(borrowAmount + borrowAmount * fee).value
}

export const getLiquidationPriceFromBorrow = (
  debt:number,
  collateralUnits:number,
  maxLtv:number
) => {
  const liquidationColValue = (debt / maxLtv);
  const unitPrice = currency(liquidationColValue / collateralUnits)
  return unitPrice.subtract(0.01).value;
}
