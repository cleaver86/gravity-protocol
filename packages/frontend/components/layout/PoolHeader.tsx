import { memo, useState } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  SimpleGrid,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import Label from '../Label'
import MonetaryText from '../MonetaryText'
import IncomeChart from '../IncomeChart'

const PoolInfo = ({ totalDeposit, poolShare, poolTvl }) => (
  <Flex direction="column">
    <Box marginBottom="3px">
      <Label>Deposited</Label>
      <MonetaryText fontSize="4xl" currency="VUSD">
        {totalDeposit}
      </MonetaryText>
    </Box>
    <Box marginBottom="30px">
      <Label>Pool Share</Label>
      <Text fontSize="lg">{poolShare.toFixed(6)}%</Text>
    </Box>
    <Box marginBottom="30px">
      <Label>Pool TVL</Label>
      <MonetaryText fontSize="lg" currency="VUSD">
        {poolTvl}
      </MonetaryText>
    </Box>
  </Flex>
)

const ClaimInfo = ({ totalClaimed, totalClaimable, grvtRewards }) => (
  <Flex>
    <Divider orientation="vertical" marginRight="30px" height="90%" />
    <Flex direction="column">
      <Box marginBottom="30px">
        <Label>Total Claimed</Label>
        <MonetaryText fontSize="lg" currency="USD">
          {totalClaimed}
        </MonetaryText>
      </Box>
      <Box marginBottom="30px">
        <Label>Claimable</Label>
        <MonetaryText fontSize="lg" currency="USD">
          {totalClaimable}
        </MonetaryText>
      </Box>
      <Box marginBottom="30px">
        <Label>GRVT Rewards</Label>
        <MonetaryText fontSize="lg">{grvtRewards}</MonetaryText>
      </Box>
    </Flex>
  </Flex>
)

const IncomeInfo = () => {
  const [dateRange, setDateRange] = useState('week')
  const labels = getLabels(dateRange)
  const datasets = [
    {
      label: dateRange,
      data: labels.map(() => getRandomInt(1000)),
    },
  ]
  return (
    <Box>
      <Flex
        justifyContent="space-between"
        alignItems="baseline"
        marginTop="-6px"
        marginBottom="10px"
      >
        <Label>Total Purchased</Label>
        <ButtonGroup
          border="1px solid"
          borderColor="gray.500"
          borderRadius="5px"
        >
          <Button
            variant={dateRange === 'year' ? 'solid' : 'ghost'}
            borderRadius="5px"
            size="sm"
            fontWeight="medium"
            onClick={() => {
              setDateRange('year')
            }}
          >
            Year
          </Button>
          <Button
            variant={dateRange === 'month' ? 'solid' : 'ghost'}
            borderRadius="5px"
            size="sm"
            fontWeight="medium"
            onClick={() => {
              setDateRange('month')
            }}
          >
            Month
          </Button>
          <Button
            variant={dateRange === 'week' ? 'solid' : 'ghost'}
            borderRadius="5px"
            size="sm"
            fontWeight="medium"
            onClick={() => {
              setDateRange('week')
            }}
          >
            Week
          </Button>
        </ButtonGroup>
      </Flex>
      <IncomeChart labels={labels} datasets={datasets} />
    </Box>
  )
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max)
}

const getLabels = (dateRange) => {
  const labels = []
  let date

  if (dateRange === 'week') {
    for (let i = 0; i <= 6; i++) {
      date = dayjs().subtract(i, 'day')
      labels[i] = date.format('DD/MMM')
    }
  } else if (dateRange === 'month') {
    for (let i = 0; i <= 4; i++) {
      date = dayjs().subtract(i * 7, 'day')
      labels[i] = date.format('DD/MMM')
    }
  } else if (dateRange === 'year') {
    for (let i = 0; i <= 11; i++) {
      date = dayjs().subtract(i, 'month').endOf('month')
      labels[i] = date.format('MMM/YY')
    }
  }

  return labels.reverse()
}

/**
 * Component
 */
function PoolHeader({
  totalDeposit,
  poolShare,
  poolTvl,
  totalClaimed,
  totalClaimable,
  grvtRewards,
}): JSX.Element {
  const [isMobileRes] = useMediaQuery('(max-width: 767px)')
  const [isSmallRes] = useMediaQuery('(max-width: 992px)')

  return (
    <>
      {(isSmallRes && (
        <>
          {(isMobileRes && (
            <>
              <Flex marginBottom="20px">
                <Box w="50%">
                  <PoolInfo
                    totalDeposit={totalDeposit}
                    poolShare={poolShare}
                    poolTvl={poolTvl}
                  />
                </Box>
                <Box w="50%">
                  <ClaimInfo
                    totalClaimed={totalClaimed}
                    totalClaimable={totalClaimable}
                    grvtRewards={grvtRewards}
                  />
                </Box>
              </Flex>
              <IncomeInfo />
            </>
          )) || (
            <Flex justifyContent="space-between">
              <PoolInfo
                totalDeposit={totalDeposit}
                poolShare={poolShare}
                poolTvl={poolTvl}
              />
              <ClaimInfo
                totalClaimed={totalClaimed}
                totalClaimable={totalClaimable}
                grvtRewards={grvtRewards}
              />
              <IncomeInfo />
            </Flex>
          )}
        </>
      )) || (
        <SimpleGrid
          templateColumns="1fr 1fr 2fr"
          columns={3}
          spacing="3"
          marginBottom="90px"
        >
          <PoolInfo
            totalDeposit={totalDeposit}
            poolShare={poolShare}
            poolTvl={poolTvl}
          />
          <ClaimInfo
            totalClaimed={totalClaimed}
            totalClaimable={totalClaimable}
            grvtRewards={grvtRewards}
          />
          <IncomeInfo />
        </SimpleGrid>
      )}
    </>
  )
}

export default memo(PoolHeader)
