import { memo } from 'react'
import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import currency from 'currency.js'
import Label from '../Label'
import MonetaryText from '../MonetaryText'
import RatioChart from '../RatioChart'
import RatioCard from '../RatioCard'
import LoanValueChart from '../LoanValueChart'
import Status from '../Status'

const AvailableToBorrow = () => (
  <Box marginBottom={[{ base: '20px', md: '55px' }]}>
    <Label>Available to Borrow</Label>
    <MonetaryText currency="VUSD" fontSize="4xl">
      {216000.0}
    </MonetaryText>
  </Box>
)

const Position = () => {
  return (
    <>
      <Box marginBottom="10px">
        <RatioChart />
      </Box>
      <HStack spacing="3" overflowX="scroll" paddingBottom="10px">
        <RatioCard currency="USD" label={`Wallet`} color="purple.300">
          {/* {currency(walletBalanceUsd).format()} */}
          {99999.99}
        </RatioCard>
        <RatioCard currency="USD" label={`Collateral`} color="green">
          {99999.99}
        </RatioCard>
        <RatioCard currency="USD" label={`Debt`} color="orange">
          {99999.99}
        </RatioCard>
      </HStack>
    </>
  )
}

const LiquidationInfo = () => (
  <Box>
    <Box marginBottom="33px">
      <Label info>System Status</Label>
      <Status type="normal" />
    </Box>
    <Box marginBottom="30px">
      <Label info>Redemption Queue</Label>
      <MonetaryText currency="USD" fontSize="lg">
        {10000000.0}
      </MonetaryText>
    </Box>
    <Box marginBottom="30px">
      <Label info>Liquidation Price</Label>
      <MonetaryText currency="USD" fontSize="lg">
        {250.0}
      </MonetaryText>
    </Box>
  </Box>
)

const LoanToValueInfo = () => (
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
      <Text fontSize="3xl" fontWeight="medium" textAlign="center" color="green">
        20.00%
      </Text>
    </Box>
  </Box>
)

const LoanToValueInfoMobile = () => (
  <Box>
    <Box marginBottom="30px">
      <Label info>System LTV</Label>
      <Flex alignItems="baseline">
        <Text fontSize="2xl" fontWeight="medium" color="green">
          35.00%
        </Text>
        <Text fontSize="sm" fontWeight="medium" color="gray.300">
          /65.00
        </Text>
      </Flex>
    </Box>
    <Box marginBottom="30px">
      <Label info>Personal LTV</Label>
      <Flex alignItems="baseline">
        <Text fontSize="2xl" fontWeight="medium" color="green">
          20.00%
        </Text>
        <Text fontSize="sm" fontWeight="medium" color="gray.300">
          /90.00
        </Text>
      </Flex>
    </Box>
  </Box>
)

/**
 * Component
 */
function VesselHeader({ balance, price }): JSX.Element {
  const [isMobileRes] = useMediaQuery('(max-width: 767px)')
  const [isSmallRes] = useMediaQuery('(max-width: 992px)')
  const walletBalanceUsd = balance * price

  return (
    <>
      {(isSmallRes && (
        <Flex direction="column">
          <AvailableToBorrow />
          <Box marginBottom="40px">
            <Position />
          </Box>
          <Flex justifyContent="space-between">
            {(isMobileRes && (
              <>
                <LiquidationInfo />
                <LoanToValueInfoMobile />
              </>
            )) || (
              <>
                <LiquidationInfo />
                <LoanToValueInfo />
              </>
            )}
          </Flex>
        </Flex>
      )) || (
        <SimpleGrid
          templateColumns="20fr 1fr 2fr 2fr"
          columns={4}
          spacing="5"
          marginBottom="90px"
        >
          <Box>
            <AvailableToBorrow />
            <Position />
          </Box>
          <Box></Box>
          <Box>
            <LiquidationInfo />
          </Box>
          <Flex>
            <LoanToValueInfo />
          </Flex>
        </SimpleGrid>
      )}
    </>
  )
}

export default memo(VesselHeader)
