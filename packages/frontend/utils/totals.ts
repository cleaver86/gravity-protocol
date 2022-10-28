import currency from 'currency.js'

export const getLoanToValueFromBorrow = (borrowAmount, collateralValue) => {
  return currency(borrowAmount / collateralValue).value
}

export const getDebtFromBorrow = (borrowAmount, fee) => {
  return currency(borrowAmount + borrowAmount * fee).value
}

export const getLiquidationPriceFromBorrow = (
  debt,
  collateralUnits,
  maxLtv
) => {
  const liquidationColValue = (debt / maxLtv);
  const unitPrice = currency(liquidationColValue / collateralUnits)
  return unitPrice.subtract(0.01).value;
}
