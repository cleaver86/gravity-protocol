import { Box, Divider, SimpleGrid } from '@chakra-ui/react'
import Label from './Label'
import MonetaryText from './MonetaryText'

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
function Summary(): JSX.Element {
  return (
    <Box
      w="100%"
      padding="20px 30px"
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
          <SummaryText>{10.0}</SummaryText>
          <SummaryText currency="USD">{11100.0}</SummaryText>
          <SummaryText currency="VUSD">{11100.0}</SummaryText>
          <SummaryText currency="VUSD">{200}</SummaryText>
          <SummaryText>{0.5}</SummaryText>
          <SummaryText currency="VUSD">{11355.5}</SummaryText>
        </Box>
      </SimpleGrid>
      <Divider marginBottom="20px" />
      <SimpleGrid templateColumns="2fr 1fr" spacing={10}>
        <Box>
          <SummaryLabel muted>ETH Price</SummaryLabel>
          <SummaryLabel muted>Liquidation Price</SummaryLabel>
          <SummaryLabel muted>LTV Liquidation</SummaryLabel>
        </Box>
        <Box>
          <SummaryText currency="USD" muted>
            {1500.0}
          </SummaryText>
          <SummaryText currency="USD" muted>
            {167.5}
          </SummaryText>
          <SummaryText muted>{90.0}</SummaryText>
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default Summary
