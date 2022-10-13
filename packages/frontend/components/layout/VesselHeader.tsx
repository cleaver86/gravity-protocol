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
import { getPersonalLtvColor, getSystemLtvColor } from '../../utils/general'

const getPositionRatioChartData = (walletBalance, collateral, debt) => {
  const total = walletBalance + collateral + debt
  const roundedLeft = {
    topLeft: 100,
    bottomLeft: 100,
  }
  const roundedRight = {
    topRight: 100,
    bottomRight: 100,
  }

  return [
    {
      id: 'empty',
      data: total === 0 ? [100] : [0],
      backgroundColor: '#412C64',
      borderWidth: 0,
      borderRadius: {
        ...roundedLeft,
        ...roundedRight,
      },
      borderSkipped: false,
    },
    {
      id: 'walletBalance',
      data: walletBalance ? [walletBalance / total] : [0],
      backgroundColor: '#D079FF',
      borderWidth: 0,
      borderRadius:
        debt > 0
          ? {
              ...roundedLeft,
            }
          : {
              ...roundedLeft,
              ...roundedRight,
            },
      borderSkipped: false,
    },
    {
      id: 'collateral',
      data: collateral ? [collateral / total] : [0],
      backgroundColor: '#19F785',
      borderWidth: 0,
      borderRadius: walletBalance <= 0 && {
        ...roundedLeft,
      },
      borderSkipped: false,
    },
    {
      id: 'debt',
      data: debt ? [debt / total] : [0],
      backgroundColor: '#F7AB19',
      borderWidth: 0,
      borderRadius: {
        ...roundedRight,
      },
      borderSkipped: false,
    },
  ]
}

const Position = ({ available, walletBalance, collateral, debt }) => {
  return (
    <>
      <Box marginBottom={[{ base: '20px', md: '55px' }]}>
        <Label>Available to Borrow</Label>
        <MonetaryText currency="VUSD" fontSize="4xl">
          {available}
        </MonetaryText>
      </Box>
      <Box marginBottom="10px">
        <RatioChart
          datasets={getPositionRatioChartData(walletBalance, collateral, debt)}
        />
      </Box>
      <HStack spacing="3" overflowX="scroll" paddingBottom="10px">
        <RatioCard currency="USD" label={`Wallet`} color="purple.300">
          {currency(walletBalance).format()}
        </RatioCard>
        <RatioCard currency="USD" label={`Collateral`} color="green">
          {currency(collateral).format()}
        </RatioCard>
        <RatioCard currency="USD" label={`Debt`} color="orange">
          {currency(debt).format()}
        </RatioCard>
      </HStack>
    </>
  )
}

const LiquidationInfo = ({
  systemStatus,
  redemptionQueue,
  liquidationPrice,
}) => (
  <Box minWidth="170px">
    <Box marginBottom="33px">
      <Label info>System Status</Label>
      <Status type={systemStatus} />
    </Box>
    <Box marginBottom="30px">
      <Label info>Redemption Queue</Label>
      {(redemptionQueue > 0 && (
        <MonetaryText currency="USD" fontSize="lg">
          {currency(redemptionQueue).format()}
        </MonetaryText>
      )) || <Text color="gray.300">---</Text>}
    </Box>
    <Box marginBottom="30px">
      <Label info>Liquidation Price</Label>
      {(liquidationPrice > 0 && (
        <MonetaryText currency="USD" fontSize="lg">
          {currency(liquidationPrice).format()}
        </MonetaryText>
      )) || <Text color="gray.300">---</Text>}
    </Box>
  </Box>
)

const LoanToValueInfo = ({
  systemLtv,
  personalLtv,
  maxSystemLtv,
  maxPersonalLtv,
}) => (
  <Box marginLeft="auto">
    <Label align="center" marginBottom="5px" info>
      Loan-to-Value
    </Label>
    <Flex alignItems="baseline" justifyContent="center">
      <Text>System</Text>
      {(systemLtv > 0 && (
        <Flex alignItems="baseline">
          <Text
            margin="0 10px"
            fontSize="lg"
            fontWeight="medium"
            color={getSystemLtvColor(systemLtv)}
          >
            {systemLtv.toFixed(2)}%
          </Text>
          <Text fontSize="sm" fontWeight="medium" color="gray.300">
            /{maxSystemLtv.toFixed(2)}
          </Text>
        </Flex>
      )) || (
        <Text marginLeft="10px" color="gray.300">
          ---
        </Text>
      )}
    </Flex>
    <Box marginTop="25px" maxHeight="180">
      <LoanValueChart
        ltvData={personalLtv}
        maxLtv={maxPersonalLtv}
        systemLtv={systemLtv}
      />
    </Box>
    <Box marginTop="-100px" textAlign="center">
      <Text>Personal</Text>
      {(personalLtv > 0 && (
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Text
            fontSize="2xl"
            fontWeight="medium"
            color={getPersonalLtvColor(personalLtv, systemLtv > maxSystemLtv)}
          >
            {personalLtv.toFixed(2)}%
          </Text>
          <Text fontSize="sm" fontWeight="medium" color="gray.300">
            /{maxPersonalLtv.toFixed(2)}
          </Text>
        </Flex>
      )) || (
        <Text fontSize="3xl" color="gray.300">
          ---
        </Text>
      )}
    </Box>
  </Box>
)

const LoanToValueInfoMobile = ({
  systemLtv,
  personalLtv,
  maxSystemLtv,
  maxPersonalLtv,
}) => (
  <Box>
    <Box marginBottom="30px">
      <Label info>System LTV</Label>
      {(systemLtv > 0 && (
        <Flex alignItems="baseline">
          <Text
            fontSize="2xl"
            fontWeight="medium"
            color={getSystemLtvColor(systemLtv)}
          >
            {systemLtv.toFixed(2)}%
          </Text>
          <Text fontSize="sm" fontWeight="medium" color="gray.300">
            /{maxSystemLtv.toFixed(2)}
          </Text>
        </Flex>
      )) || <Text color="gray.300">---</Text>}
    </Box>
    <Box marginBottom="30px">
      <Label info>Personal LTV</Label>
      {(personalLtv > 0 && (
        <Flex alignItems="baseline">
          <Text
            fontSize="2xl"
            fontWeight="medium"
            color={getPersonalLtvColor(personalLtv, systemLtv > maxSystemLtv)}
          >
            {personalLtv.toFixed(2)}%
          </Text>
          <Text fontSize="sm" fontWeight="medium" color="gray.300">
            /{maxPersonalLtv.toFixed(2)}
          </Text>
        </Flex>
      )) || <Text color="gray.300">---</Text>}
    </Box>
  </Box>
)

/**
 * Component
 */
function VesselHeader({
  walletBalance,
  systemStatus,
  available,
  collateral,
  debt,
  redemptionQueue,
  liquidationPrice,
  systemLtv,
  personalLtv,
  maxSystemLtv,
  maxPersonalLtv,
}): JSX.Element {
  const [isMobileRes] = useMediaQuery('(max-width: 767px)')
  const [isSmallRes] = useMediaQuery('(max-width: 992px)')

  return (
    <>
      {(isSmallRes && (
        <Flex direction="column">
          <Box marginBottom="40px">
            <Position
              available={available}
              walletBalance={walletBalance}
              collateral={collateral}
              debt={debt}
            />
          </Box>
          <Flex justifyContent="space-between">
            {(isMobileRes && (
              <>
                <LiquidationInfo
                  systemStatus={systemStatus}
                  redemptionQueue={redemptionQueue}
                  liquidationPrice={liquidationPrice}
                />
                <LoanToValueInfoMobile
                  systemLtv={systemLtv}
                  personalLtv={personalLtv}
                  maxSystemLtv={maxSystemLtv}
                  maxPersonalLtv={maxPersonalLtv}
                />
              </>
            )) || (
              <>
                <LiquidationInfo
                  systemStatus={systemStatus}
                  redemptionQueue={redemptionQueue}
                  liquidationPrice={liquidationPrice}
                />
                <LoanToValueInfo
                  systemLtv={systemLtv}
                  personalLtv={personalLtv}
                  maxSystemLtv={maxSystemLtv}
                  maxPersonalLtv={maxPersonalLtv}
                />
              </>
            )}
          </Flex>
        </Flex>
      )) || (
        <SimpleGrid
          templateColumns="20fr 1fr max-content 2fr"
          columns={4}
          spacing="5"
          marginBottom="90px"
        >
          <Box>
            <Position
              available={available}
              walletBalance={walletBalance}
              collateral={collateral}
              debt={debt}
            />
          </Box>
          <Box></Box>
          <Box>
            <LiquidationInfo
              systemStatus={systemStatus}
              redemptionQueue={redemptionQueue}
              liquidationPrice={liquidationPrice}
            />
          </Box>
          <Flex>
            <LoanToValueInfo
              systemLtv={systemLtv}
              personalLtv={personalLtv}
              maxSystemLtv={maxSystemLtv}
              maxPersonalLtv={maxPersonalLtv}
            />
          </Flex>
        </SimpleGrid>
      )}
    </>
  )
}

export default memo(VesselHeader)
