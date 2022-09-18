import { Box } from '@chakra-ui/react'
import Label from './Label'
import MonetaryText from './MonetaryText'

/**
 * Component
 */
function RatioCard({ children, currency, label, color }): JSX.Element {
  return (
    <Box w="100%" background="purple.600" borderRadius="5px">
      <Box padding="10px 10px 10px 10px">
        <Label align="right" marginBottom="5px">
          {label}
        </Label>
        <MonetaryText
          currency={currency}
          fontSize="lg"
          align="flex-end"
          showCurrency={false}
        >
          {children}
        </MonetaryText>
      </Box>
      <Box w="100%" height="4px" background={color} borderRadius="20px" />
    </Box>
  )
}

export default RatioCard
