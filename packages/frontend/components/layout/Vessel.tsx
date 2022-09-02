import { Box, Flex, HStack } from '@chakra-ui/react'
import IconHeading from '../IconHeading'
import Label from '../Label'
import MonetaryText from '../MonetaryText'

const RatioCard = ({ children, currency, label }) => (
  <Box w="100%" padding="20px" background="purple.500" borderRadius="5px">
    <Label>{label}</Label>
    <MonetaryText currency={currency} fontSize="2xl">
      {children}
    </MonetaryText>
  </Box>
)
/**
 * Component
 */
function Vessel({ name, icon }): JSX.Element {
  return (
    <>
      <Box marginBottom="100px">
        <IconHeading icon={icon} isFontAwesome={false}>
          {`${name} Vessel`}
        </IconHeading>
      </Box>
      <Label>Available to Borrow</Label>
      <MonetaryText currency="VUSD" fontSize="4xl">
        {216000.0}
      </MonetaryText>
      <HStack marginTop="60px" spacing="3">
        <RatioCard currency="ETH" label={`Wallet (${name})`}>
          {240000.0}
        </RatioCard>
        <RatioCard currency="ETH" label={`Collateral (${name})`}>
          {0.0}
        </RatioCard>
        <RatioCard currency="VUSD" label="Debt">
          {0.0}
        </RatioCard>
      </HStack>
    </>
  )
}

export default Vessel
