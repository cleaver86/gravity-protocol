import { memo } from 'react'
import { Box, Flex, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import currency from 'currency.js'
import IconHeading from '../IconHeading'
import Label from '../Label'
import MonetaryText from '../MonetaryText'
import RatioChart from '../RatioChart'
import RatioCard from '../RatioCard'
import LoanValueChart from '../LoanValueChart'
import Status from '../Status'

/**
 * Component
 */
function VesselHeader({ name, icon, balance, price }): JSX.Element {
  const walletBalanceUsd = balance * price

  return (
    <>
      <Box marginBottom="100px">
        <IconHeading icon={icon} isFontAwesome={false}>
          {`${name.toUpperCase()} Vessel`}
        </IconHeading>
      </Box>
      <SimpleGrid templateColumns="1fr 1fr" spacing={20} marginBottom="90px">
        <Box>
          <Box marginBottom="55px">
            <Label>Available to Borrow</Label>
            <MonetaryText currency="VUSD" fontSize="4xl">
              {216000.0}
            </MonetaryText>
          </Box>
          <Box marginBottom="10px">
            <RatioChart />
          </Box>
          <HStack spacing="3">
            <RatioCard currency="USD" label={`Wallet (ETH)`} color="purple.300">
              {currency(walletBalanceUsd).format()}
            </RatioCard>
            <RatioCard currency="USD" label={`Collateral (ETH)`} color="green">
              {111000.0}
            </RatioCard>
            <RatioCard currency="USD" label={`Debt (VUSD)`} color="orange">
              {11355.5}
            </RatioCard>
          </HStack>
        </Box>
        <Flex>
          <Box>
            <Box marginBottom="30px">
              <Label info>Liquidation Price (ETH)</Label>
              <MonetaryText currency="USD" fontSize="lg">
                {250.0}
              </MonetaryText>
            </Box>
            <Box marginBottom="30px">
              <Label info>Redemption Queue</Label>
              <MonetaryText currency="USD" fontSize="lg">
                {10000000.0}
              </MonetaryText>
            </Box>
            <Box marginBottom="30px">
              <Label info>System Status</Label>
              <Status type="normal" />
            </Box>
          </Box>
          <Box marginLeft="auto">
            <Label align="center" marginBottom="5px" info>
              Loan-to-Value
            </Label>
            <Flex alignItems="baseline" justifyContent="center">
              <Text>System</Text>
              <Text
                fontSize="lg"
                fontWeight="medium"
                textAlign="center"
                color="green"
                marginLeft="10px"
              >
                35.00%
              </Text>
            </Flex>
            <Box marginTop="25px" maxHeight="180">
              <LoanValueChart />
            </Box>
            <Box marginTop="-100px" textAlign="center">
              <Text>Personal</Text>
              <Text
                fontSize="3xl"
                fontWeight="medium"
                textAlign="center"
                color="green"
              >
                20.00%
              </Text>
            </Box>
          </Box>
        </Flex>
      </SimpleGrid>
    </>
  )
}

export default memo(VesselHeader)
