import { Box } from '@chakra-ui/react'
import Label from './Label'
import MonetaryText from './MonetaryText'

type Props = {
  children: number
  currency: string
  label: string
  color: string
}

/**
 * Component
 */
function RatioCard({ children, currency, label, color }: Props): JSX.Element {
  return (
    <Box w="100%" background="purple.600" borderRadius="5px">
      <Box padding="10px 10px 10px 10px">
        <Label justifyContent="flex-end" marginBottom="5px">
          {label}
        </Label>
        <MonetaryText
          currency={currency}
          fontSize="lg"
          showCurrency={false}
          flexProps={{
            justifyContent: 'flex-end',
          }}
        >
          {children}
        </MonetaryText>
      </Box>
      <Box w="100%" height="4px" background={color} borderRadius="20px" />
    </Box>
  )
}

export default RatioCard
