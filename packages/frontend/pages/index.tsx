import React, { useState } from 'react'
import {
  Box,
  Divider,
  Flex,
  HStack,
  Spacer,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Wrap,
  WrapItem,
  useMediaQuery,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {
  faArrowRightArrowLeft,
  faCirclePlus,
  faHome,
  faScaleBalanced,
  faVault,
} from '@fortawesome/pro-regular-svg-icons'
import { SimpleGrid } from '@chakra-ui/react'
import IconHeading from '../components/IconHeading'
import RatioChart from '../components/RatioChart'
import RatioCard from '../components/RatioCard'
import Label from '../components/Label'
import Link from '../components/Link'
import MonetaryText from '../components/MonetaryText'
import VesselCard from '../components/VesselCard'
import FaIcon from '../components/FaIcon'
import EthTokenIcon from '../public/images/token-eth.svg'
import RethTokenIcon from '../public/images/token-reth.svg'

const Portfolio = ({
  portfolioValue,
  totalStaked,
  totalClaimable,
  totalDeposited,
  totalDebt,
}) => {
  const total = totalStaked + totalClaimable + totalDeposited - totalDebt
  const portfolioData = [
    {
      data: total === 0 ? [100] : [0],
      backgroundColor: '#352451',
      borderWidth: 0,
      borderRadius: {
        topLeft: 100,
        bottomLeft: 100,
        topRight: 100,
        bottomRight: 100,
      },
      borderSkipped: false,
    },
    {
      data: [totalStaked / 100],
      backgroundColor: '#D079FF',
      borderWidth: 0,
      borderRadius: {
        topLeft: 100,
        bottomLeft: 100,
      },
      borderSkipped: false,
    },
    {
      data: [totalClaimable / 100],
      backgroundColor: '#6755FF',
      borderWidth: 0,
      borderSkipped: false,
    },
    {
      data: totalDeposited > 0 ? [totalDeposited / 100 + 120] : [0],
      backgroundColor: '#19F785',
      borderWidth: 0,
      borderSkipped: false,
    },
    {
      data: [totalDebt / 100],
      backgroundColor: '#F7AB19',
      borderWidth: 0,
      borderRadius: {
        topRight: 100,
        bottomRight: 100,
      },
      borderSkipped: false,
    },
  ]

  return (
    <Box paddingTop="20px" marginBottom="40px">
      <Label>Portfolio Value</Label>
      <MonetaryText
        currency="USD"
        fontSize="4xl"
        marginBottom={[{ base: '40px', md: '80px' }]}
      >
        {portfolioValue}
      </MonetaryText>
      <Box marginBottom="10px">
        <RatioChart datasets={portfolioData} />
      </Box>
      <HStack spacing="3" overflowX="scroll" paddingBottom="10px">
        <RatioCard currency="USD" label={`Staked`} color="purple.300">
          {totalStaked}
        </RatioCard>
        <RatioCard currency="USD" label={`Claimable`} color="blue">
          {totalClaimable}
        </RatioCard>
        <RatioCard currency="USD" label={`Deposited`} color="green">
          {totalDeposited}
        </RatioCard>
        <RatioCard currency="USD" label={`Debt`} color="orange">
          {totalDebt}
        </RatioCard>
      </HStack>
    </Box>
  )
}

const StablityPool = ({ pool }) => (
  <Box marginBottom="20px">
    <Flex marginBottom="30px">
      <IconHeading icon={faScaleBalanced} fontSize="xl" margin="0">
        Stabililty Pool
      </IconHeading>
      <Spacer />
      <Box>
        <NextLink href="/pool" passHref>
          <Link>Pool VUSD</Link>
        </NextLink>
      </Box>
    </Flex>
    <Flex paddingBottom="10px">
      <Box w="100%">
        <Label>Deposited</Label>
        <MonetaryText
          currency="VUSD"
          showCurrency={false}
          fontSize="lg"
          marginBottom="10px"
        >
          {pool.deposited}
        </MonetaryText>
      </Box>
      <Box w="100%">
        <Label>Claimable</Label>
        <MonetaryText
          currency="USD"
          showCurrency={false}
          fontSize="lg"
          marginBottom="10px"
        >
          {pool.claimable}
        </MonetaryText>
      </Box>
      <Box w="100%">
        <Label>Total Claimed</Label>
        <MonetaryText
          currency="USD"
          showCurrency={false}
          fontSize="lg"
          marginBottom="10px"
        >
          {pool.totalClaimed}
        </MonetaryText>
      </Box>
    </Flex>
  </Box>
)

const Staking = ({ staked }) => (
  <Box>
    <Flex marginBottom="30px">
      <IconHeading icon={faVault} fontSize="xl" margin="0">
        Staking
      </IconHeading>
      <Spacer />
      <Box>
        <NextLink href="/pool" passHref>
          <Link>Stake GRVT</Link>
        </NextLink>
      </Box>
    </Flex>
    <Flex paddingBottom="10px">
      <Box w="100%">
        <Label>Staked</Label>
        <MonetaryText
          currency="GRVT"
          showCurrency={false}
          fontSize="lg"
          marginBottom="10px"
        >
          {staked.total}
        </MonetaryText>
      </Box>
      <Box w="100%">
        <Label>Claimable</Label>
        <MonetaryText
          currency="GRVT"
          showCurrency={false}
          fontSize="lg"
          marginBottom="10px"
        >
          {staked.claimable}
        </MonetaryText>
      </Box>
      <Box w="100%">
        <Label>Total Claimed</Label>
        <MonetaryText
          currency="GRVT"
          showCurrency={false}
          fontSize="lg"
          marginBottom="10px"
        >
          {staked.totalClaimed}
        </MonetaryText>
      </Box>
    </Flex>
  </Box>
)

const Vessels = ({ vessels }) => (
  <Box>
    <IconHeading
      icon={faArrowRightArrowLeft}
      fontSize="xl"
      display={[{ base: 'none', md: 'flex' }]}
    >
      Vessels
    </IconHeading>
    <Box marginBottom="40px">
      {(vessels.length > 0 && (
        <Wrap spacing="10" wrap="wrap">
          {vessels.map((vessel, i) => (
            <WrapItem key={`vessel-wrap-item-${i}`}>
              <VesselCard {...vessel} />
            </WrapItem>
          ))}
        </Wrap>
      )) || (
        <NextLink href="/borrow">
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            padding="50px"
            width="500px"
            minHeight="280px"
            border="1px solid"
            borderColor="gray.500"
            borderRadius="5px"
            _hover={{
              border: '1px solid',
              borderColor: 'gray.300',
              cursor: 'pointer',
            }}
          >
            <Box marginBottom="20px">
              <FaIcon icon={faCirclePlus} height="50px" color="purple.300" />
            </Box>
            <Text fontWeight="medium" color="purple.300">
              Open a Vessel to borrow VUSD
            </Text>
          </Flex>
        </NextLink>
      )}
    </Box>
  </Box>
)

function HomeIndex(): JSX.Element {
  const [isSmallRes] = useMediaQuery('(max-width: 992px)')

  const vData = [
    {
      index: 0,
      portfolioValue: 0.0,
      totalClaimable: 0.0,
      totalDeposited: 0.0,
      totalDebt: 0.0,
      totalStaked: 0.0,
      staked: {
        staked: 0.0,
        claimable: 0.0,
        totalClaimed: 0.0,
      },
      pool: {
        deposited: 0.0,
        claimable: 0.0,
        totalClaimed: 0.0,
      },
      vessels: [],
    },
    {
      index: 1,
      portfolioValue: 237020.25,
      totalClaimable: 23702.025,
      totalDeposited: 142212.15,
      totalDebt: 35553.03,
      totalStaked: 35553.03,
      staked: {
        staked: 1015.8,
        claimable: 0.0,
        totalClaimed: 234.54,
      },
      pool: {
        deposited: 21406.25,
        claimable: 0.0,
        totalClaimed: 56049.42,
      },
      vessels: [
        {
          name: 'eth',
          icon: <EthTokenIcon />,
          available: 216000.0,
          debt: 12050.0,
          systemLtv: 15.0,
          personalLtv: 10.0,
          oneTimeFee: 0.5,
          maxLtv: 90.0,
        },
        {
          name: 'rETH',
          icon: <RethTokenIcon />,
          available: 0,
          debt: 5250.24,
          systemLtv: 15.0,
          personalLtv: 10.0,
          oneTimeFee: 0.5,
          maxLtv: 80.0,
        },
      ],
    },
  ]
  const [vesselSet, setVesselSet] = useState(vData[0])

  return (
    <>
      <Box marginBottom="60px">
        <IconHeading
          icon={faHome}
          onClick={() => {
            setVesselSet(vData[vesselSet.index + 1] || vData[0])
          }}
        >
          Home
        </IconHeading>
      </Box>
      <Box>
        <Tabs colorScheme="purple" isFitted={isSmallRes}>
          <TabList
            borderBottomWidth="1px"
            borderColor="gray.500"
            marginBottom="40px"
          >
            <Tab
              minWidth={[{ base: '0', md: '200px' }]}
              borderBottomWidth="3px"
              fontWeight="medium"
            >
              Portfolio
            </Tab>
            {isSmallRes && (
              <>
                <Tab
                  minWidth={[{ base: '0', md: '200px' }]}
                  borderBottomWidth="3px"
                  fontWeight="medium"
                >
                  Vessels
                </Tab>
              </>
            )}
            <Tab
              minWidth={[{ base: '0', md: '200px' }]}
              borderBottomWidth="3px"
              fontWeight="medium"
            >
              Activity
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel padding="0">
              {(isSmallRes && (
                <Flex direction="column">
                  <Portfolio {...vesselSet} />
                  <Divider marginBottom="20px" />
                  <Box>
                    <StablityPool {...vesselSet} />
                    <Divider marginBottom="20px" />
                    <Staking {...vesselSet} />
                  </Box>
                </Flex>
              )) || (
                <>
                  <SimpleGrid columns={3} templateColumns="8fr 1fr 6fr">
                    <Portfolio {...vesselSet} />
                    <Box></Box>
                    <Box>
                      <StablityPool {...vesselSet} />
                      <Divider marginBottom="20px" />
                      <Staking {...vesselSet} />
                    </Box>
                  </SimpleGrid>
                  <Box display={[{ base: 'none', md: 'block' }]}>
                    <Divider marginBottom="40px" />
                    <Vessels vessels={vesselSet.vessels} />
                  </Box>
                </>
              )}
            </TabPanel>
            {isSmallRes && (
              <TabPanel padding="0">
                <Vessels vessels={vesselSet.vessels} />
              </TabPanel>
            )}
            <TabPanel padding="0">
              <p>Activity</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  )
}

export default HomeIndex
