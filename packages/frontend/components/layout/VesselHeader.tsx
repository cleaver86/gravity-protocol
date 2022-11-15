import { memo } from 'react'
import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import { Vessel } from '../../types'
import Label from '../Label'
import MonetaryText from '../MonetaryText'
import RatioChart, { RatioChartProps } from '../RatioChart'
import RatioCard from '../RatioCard'
import LoanValueChart from '../LoanValueChart'
import Status from '../Status'
import { getPersonalLtvColor, getSystemLtvColor } from '../../utils/general'

const getPositionRatioChartData = (
  walletBalance: number,
  collateral: Vessel['collateral'],
  debt: Vessel['debt']
): RatioChartProps['datasets'] => {
  const total = walletBalance + collateral + debt
  const walletPercent = walletBalance / total
  const collateralPercent = collateral / total
  const debtPercent = debt / total
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
      data: walletPercent > 0.005 ? [walletPercent] : [0],
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
      data: collateralPercent > 0.005 ? [collateralPercent] : [0],
      backgroundColor: '#19F785',
      borderWidth: 0,
      borderRadius:
        walletPercent < 0.005
          ? {
              ...roundedLeft,
            }
          : {},
      borderSkipped: false,
    },
    {
      data: debtPercent > 0.005 ? [debtPercent] : [0],
      backgroundColor: '#F7AB19',
      borderWidth: 0,
      borderRadius: {
        ...roundedRight,
      },
      borderSkipped: false,
    },
  ]
}

type PositionProps = {
  walletBalance: number
  available: Vessel['available']
  collateral: Vessel['collateral']
  debt: Vessel['debt']
}

const Position = ({
  available,
  walletBalance,
  collateral,
  debt,
}: PositionProps) => {
  return (
    <>
      <Box marginBottom={{ base: '20px', md: '55px' }}>
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
          {walletBalance}
        </RatioCard>
        <RatioCard currency="USD" label={`Collateral`} color="green">
          {collateral}
        </RatioCard>
        <RatioCard currency="USD" label={`Debt`} color="orange">
          {debt}
        </RatioCard>
      </HStack>
    </>
  )
}

type LiquidationInfoProps = {
  systemStatus: Vessel['systemStatus']
  redemptionQueue: Vessel['redemptionQueue']
  liquidationPrice: Vessel['liquidationPrice']
}

const LiquidationInfo = ({
  systemStatus,
  redemptionQueue,
  liquidationPrice,
}: LiquidationInfoProps) => (
  <Box minWidth="170px">
    <Box marginBottom="33px">
      <Label tooltip="TOOL_TIP">System Status</Label>
      <Status type={systemStatus} />
    </Box>
    <Box marginBottom="30px">
      <Label tooltip="TOOL_TIP">Redemption Queue</Label>
      {(redemptionQueue && redemptionQueue > 0 && (
        <MonetaryText currency="USD" fontSize="lg">
          {redemptionQueue}
        </MonetaryText>
      )) || <Text color="gray.300">---</Text>}
    </Box>
    <Box marginBottom="30px">
      <Label tooltip="TOOL_TIP">Liquidation Price</Label>
      {(liquidationPrice && liquidationPrice > 0 && (
        <MonetaryText currency="USD" fontSize="lg">
          {liquidationPrice}
        </MonetaryText>
      )) || <Text color="gray.300">---</Text>}
    </Box>
  </Box>
)

type LoanToValueInfoProps = {
  systemLtv: Vessel['systemLtv']
  personalLtv: Vessel['personalLtv']
  maxSystemLtv: Vessel['maxSystemLtv']
  maxPersonalLtv: Vessel['maxPersonalLtv']
}

const LoanToValueInfo = ({
  systemLtv,
  personalLtv,
  maxSystemLtv,
  maxPersonalLtv,
}: LoanToValueInfoProps) => (
  <Box marginLeft="auto">
    <Label justifyContent="center" marginBottom="5px" tooltip="TOOL_TIP">
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
        personalLtv={personalLtv || 0}
        maxPersonalLtv={maxPersonalLtv}
        systemLtv={systemLtv}
      />
    </Box>
    <Box marginTop="-100px" textAlign="center">
      <Text>Personal</Text>
      {(personalLtv && personalLtv > 0 && (
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

type LoanToValueInfoMobileProps = {
  systemLtv: Vessel['systemLtv']
  personalLtv: Vessel['personalLtv']
  maxSystemLtv: Vessel['maxSystemLtv']
  maxPersonalLtv: Vessel['maxPersonalLtv']
}

const LoanToValueInfoMobile = ({
  systemLtv,
  personalLtv,
  maxSystemLtv,
  maxPersonalLtv,
}: LoanToValueInfoMobileProps) => (
  <Box>
    <Box marginBottom="30px">
      <Label tooltip="TOOL_TIP">System LTV</Label>
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
      <Label tooltip="TOOL_TIP">Personal LTV</Label>
      {(personalLtv && personalLtv > 0 && (
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

type VesselHeaderProps = Vessel & {
  walletBalance: number
}

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
}: VesselHeaderProps): JSX.Element {
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
