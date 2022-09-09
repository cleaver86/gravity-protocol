import { Box, Flex, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import IconHeading from '../IconHeading'
import Label from '../Label'
import MonetaryText from '../MonetaryText'
import RatioChart from '../RatioChart'
import RatioCard from '../RatioCard'
import LoanValueChart from '../LoanValueChart'

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
      <SimpleGrid templateColumns="2fr 1fr" spacing={10}>
        <Box>
          <Box marginBottom="60px">
            <Label>Available to Borrow</Label>
            <MonetaryText currency="VUSD" fontSize="4xl">
              {216000.0}
            </MonetaryText>
          </Box>
          <Box marginBottom="10px">
            <RatioChart />
          </Box>
          <HStack spacing="3">
            <RatioCard
              currency="ETH"
              label={`Wallet (${name})`}
              color="purple.100"
            >
              {240000.0}
            </RatioCard>
            <RatioCard
              currency="ETH"
              label={`Collateral (${name})`}
              color="green"
            >
              {0.0}
            </RatioCard>
            <RatioCard currency="VUSD" label="Debt" color="orange">
              {0.0}
            </RatioCard>
          </HStack>
        </Box>
        <Box>
          <Label align="center" info>
            Vessel LTV
          </Label>
          <Text
            fontSize="4xl"
            fontWeight="medium"
            textAlign="center"
            color="green"
          >
            10.00%
          </Text>
          <Flex marginTop="-70px">
            <LoanValueChart />
          </Flex>
          <Box marginTop="-162px">
            <Label align="center" info>
              System LTV
            </Label>
            <Text
              fontSize="2xl"
              fontWeight="medium"
              textAlign="center"
              color="green"
            >
              20.00%
            </Text>
          </Box>
        </Box>
      </SimpleGrid>
    </>
  )
}

export default Vessel
