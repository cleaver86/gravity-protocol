import { Box, Button, Divider, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import currencyJs from 'currency.js'
import Alert from './Alert'
import Label from './Label'
import {
  getLoanToValueFromBorrow,
  getDebtFromBorrow,
  getLiquidationPriceFromBorrow,
} from '../utils/totals'

const SummaryLabel = ({ children, muted, tooltip }) => (
  <Flex minHeight="35px">
    <Label
      textTransform="capitalize"
      orientation="horizontal"
      color={muted ? 'gray.300' : 'gray.100'}
      fontWeight="medium"
      fontSize="md"
      tooltip={tooltip}
      info
    >
      {children}
    </Label>
  </Flex>
)

const SummaryMonetaryText = ({ children, muted }) => (
  <Flex minHeight="35px" justifyContent="flex-end">
    <Text textAlign="right" color={muted ? 'gray.300' : 'gray.100'}>
      {currencyJs(children).format({ symbol: '' })}
    </Text>
  </Flex>
)

const SummaryText = ({ children, align, fontSize, muted }) => (
  <Flex minHeight="35px" justifyContent={align ? align : 'left'}>
    <Text
      paddingTop={fontSize === 'sm' && '2px'}
      fontSize={fontSize}
      fontWeight="medium"
      color={muted ? 'gray.300' : 'gray.100'}
    >
      {children}
    </Text>
  </Flex>
)

/**
 * Component
 */
function Summary({
  received,
  collateralUnits,
  collateralPrice,
  leverage,
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
      <SimpleGrid templateColumns="2fr 1fr 50px" spacing="5px">
        <Box>
          <SummaryLabel tooltip="LTV Tooltip">Loan-to-Value</SummaryLabel>
          <SummaryLabel tooltip="Col Value Tooltip">
            Collateral Value
          </SummaryLabel>
          {leverage > 0 && (
            <SummaryLabel tooltip="Leverage Tooltip">Leverage</SummaryLabel>
          )}
          <SummaryLabel tooltip="Received VUSD Tooltip">
            Received VUSD
          </SummaryLabel>
          <SummaryLabel tooltip="Liquidation Reserve Tooltip">
            Liquidation Reserve
          </SummaryLabel>
          <SummaryLabel tooltip="Base Borrow Fee Tooltip">
            Base Borrowing Fee
          </SummaryLabel>
          <SummaryLabel tooltip="Total Debt Tooltip">
            Estimated Total Debt
          </SummaryLabel>
        </Box>
        <Box>
          <SummaryText align="right">
            {(loanToValue * 100).toFixed(2)}
          </SummaryText>
          <SummaryMonetaryText currency="USD">
            {collateralValue}
          </SummaryMonetaryText>
          {leverage > 0 && <SummaryText align="right">{leverage}</SummaryText>}
          <SummaryMonetaryText currency="VUSD">{received}</SummaryMonetaryText>
          <SummaryMonetaryText currency="VUSD">{200}</SummaryMonetaryText>
          <SummaryText align="right">{(0.5).toFixed(2)}</SummaryText>
          <SummaryMonetaryText currency="VUSD">
            {getDebtFromBorrow(received, 0.005)}
          </SummaryMonetaryText>
        </Box>
        <Box>
          <SummaryText fontSize="sm">%</SummaryText>
          <SummaryText fontSize="sm">USD</SummaryText>
          {leverage > 0 && <SummaryText fontSize="sm">X</SummaryText>}
          <SummaryText fontSize="sm">VUSD</SummaryText>
          <SummaryText fontSize="sm">VUSD</SummaryText>
          <SummaryText fontSize="sm">%</SummaryText>
          <SummaryText fontSize="sm">VUSD</SummaryText>
        </Box>
      </SimpleGrid>
      <Divider marginBottom="20px" />
      <SimpleGrid
        templateColumns="2fr 1fr 50px"
        spacing="5px"
        marginBottom="20px"
      >
        <Box>
          <SummaryLabel tooltip="ETH Price Tooltip" muted>
            ETH Price
          </SummaryLabel>
          <SummaryLabel tooltip="Liquidation Price Tooltip" muted>
            Liquidation Price
          </SummaryLabel>
          <SummaryLabel tooltip="LTV Liquidation Tooltip" muted>
            LTV Liquidation
          </SummaryLabel>
        </Box>
        <Box>
          <SummaryMonetaryText muted>{collateralPrice}</SummaryMonetaryText>
          <SummaryMonetaryText muted>
            {getLiquidationPriceFromBorrow(
              received,
              collateralUnits,
              loanToValue
            )}
          </SummaryMonetaryText>
          <SummaryText align="right" muted>
            {(maxLoanToValue * 100).toFixed(2)}
          </SummaryText>
        </Box>
        <Box>
          <SummaryText fontSize="sm" muted>
            USD
          </SummaryText>
          <SummaryText fontSize="sm" muted>
            USD
          </SummaryText>
          <SummaryText fontSize="sm" muted>
            %
          </SummaryText>
        </Box>
      </SimpleGrid>
      <Alert status="warning">LTV Warning Here</Alert>
      <Button w="100%" size="lg" borderRadius="40px" onClick={onBorrow}>
        Borrow
      </Button>
    </Box>
  )
}

Summary.defaultProps = {
  leverage: 0,
}

export default Summary
