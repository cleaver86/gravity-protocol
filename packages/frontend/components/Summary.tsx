import { Box, Button, Divider, SimpleGrid } from '@chakra-ui/react'
import Label from './Label'
import MonetaryText from './MonetaryText'
import {
  getLoanToValueFromBorrow,
  getDebtFromBorrow,
  getLiquidationPriceFromBorrow,
} from '../utils/totals'

const SummaryLabel = ({ children, muted }) => (
  <Label
    textTransform="capitalize"
    orientation="horizontal"
    color={muted ? 'gray.300' : 'gray.100'}
    fontWeight="medium"
    fontSize="md"
    marginBottom="10px"
    info
  >
    {children}
  </Label>
)

const SummaryText = ({ children, currency, muted }) => (
  <MonetaryText
    marginBottom="10px"
    align="right"
    currency={currency}
    color={muted ? 'gray.300' : 'gray.100'}
  >
    {children}
  </MonetaryText>
)

/**
 * Component
 */
function Summary({
  received,
  collateralUnits,
  collateralPrice,
  maxLoanToValue,
  onBorrow,
}) {
  const collateralValue = collateralUnits * collateralPrice
  const loanToValue = getLoanToValueFromBorrow(received, collateralValue)

  return (
    <Box
      w="100%"
      padding="20px 30px 40px 30px"
      background="purple.900"
      borderRadius="10px"
    >
      <SimpleGrid templateColumns="2fr 1fr" spacing={10}>
        <Box>
          <SummaryLabel>Loan-to-Value</SummaryLabel>
          <SummaryLabel>Collateral Value</SummaryLabel>
          <SummaryLabel>Received VUSD</SummaryLabel>
          <SummaryLabel>Liquidation Reserve</SummaryLabel>
          <SummaryLabel>Base Borrowing Fee</SummaryLabel>
          <SummaryLabel>Estimated Total Debt</SummaryLabel>
        </Box>
        <Box>
          <SummaryText>{loanToValue * 100}</SummaryText>
          <SummaryText currency="USD">{collateralValue}</SummaryText>
          <SummaryText currency="VUSD">{received}</SummaryText>
          <SummaryText currency="VUSD">{200}</SummaryText>
          <SummaryText>{0.5}</SummaryText>
          <SummaryText currency="VUSD">
            {getDebtFromBorrow(received, 0.005)}
          </SummaryText>
        </Box>
      </SimpleGrid>
      <Divider marginBottom="20px" />
      <SimpleGrid templateColumns="2fr 1fr" spacing={10} marginBottom="20px">
        <Box>
          <SummaryLabel muted>ETH Price</SummaryLabel>
          <SummaryLabel muted>Liquidation Price</SummaryLabel>
          <SummaryLabel muted>LTV Liquidation</SummaryLabel>
        </Box>
        <Box>
          <SummaryText currency="USD" muted>
            {collateralPrice}
          </SummaryText>
          <SummaryText currency="USD" muted>
            {getLiquidationPriceFromBorrow(
              received,
              collateralUnits,
              loanToValue
            )}
          </SummaryText>
          <SummaryText muted>{maxLoanToValue}</SummaryText>
        </Box>
      </SimpleGrid>
      <Button w="100%" size="lg" borderRadius="40px" onClick={onBorrow}>
        Borrow
      </Button>
    </Box>
  )
}

export default Summary
