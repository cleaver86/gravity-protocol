import { Box } from '@chakra-ui/react'
import Label from './Label'
import MonetaryText from './MonetaryText'

/**
 * Component
 */
function RatioCard({ children, currency, label, color }): JSX.Element {
  return (
    <Box w="100%" background="purple.600" borderRadius="5px">
      <Box padding="20px 20px 15px 20px">
        <Label align="flex-end">{label}</Label>
        <MonetaryText currency={currency} fontSize="2xl" align="flex-end">
          {children}
        </MonetaryText>
      </Box>
      <Box w="100%" height="4px" background={color} borderRadius="20px" />
    </Box>
  )
}

export default RatioCard
