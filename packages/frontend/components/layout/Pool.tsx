import { useContext } from 'react'
import {
  Flex,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  useMediaQuery,
  IconButton,
} from '@chakra-ui/react'
import { WalletContext } from '../../providers/WalletProvider'
import { MainNavContext } from '../../providers/MainNavProvider'
import IconHeading from '../IconHeading'
import PoolHeader from '../layout/PoolHeader'
import PoolDeposit from '../layout/PoolDeposit'
import PoolWithdraw from '../layout/PoolWithdraw'
import PoolClaim from '../layout/PoolClaim'
import FaIcon from '../FaIcon'
import { faScaleBalanced, faBars } from '@fortawesome/pro-regular-svg-icons'

/**
 * Component
 */
function Pool(): JSX.Element {
  const mainNavContext = useContext(MainNavContext)
  const walletContext = useContext(WalletContext)
  const { balances, prices } = walletContext
  const [isSmallRes] = useMediaQuery('(max-width: 992px)')
  const ETH_AMOUNT_TEMP = 1.65
  const RETH_AMOUNT_TEMP = 2.8
  const STETH_AMOUNT_TEMP = 1.75
  const {
    totalDeposit,
    poolShare,
    poolTvl,
    totalClaimed,
    totalClaimable,
    grvtRewards,
    claimableAssets,
  } = {
    totalDeposit: 23067.45,
    poolShare: 0.076834,
    poolTvl: 30022231.45,
    totalClaimed: 1269.78,
    totalClaimable: 9066.19,
    grvtRewards: 159.56,
    claimableAssets: [
      {
        id: 'eth',
        name: 'ETH',
        amount: ETH_AMOUNT_TEMP,
        liquidationPrice:
          Math.round(
            (prices['eth'] - prices['eth'] * 0.1 + Number.EPSILON) * 100
          ) / 100,
        marketPrice: prices['eth'],
        claimValue:
          Math.round((ETH_AMOUNT_TEMP * prices['eth'] + Number.EPSILON) * 100) /
          100,
        profitLoss:
          Math.round(
            (ETH_AMOUNT_TEMP * prices['eth'] -
              ETH_AMOUNT_TEMP * (prices['eth'] - prices['eth'] * 0.1) +
              Number.EPSILON) *
              100
          ) / 100,
        grvtRewards: 33.24,
      },
      {
        id: 'reth',
        name: 'rETH',
        amount: RETH_AMOUNT_TEMP,
        liquidationPrice:
          Math.round(
            (prices['reth'] - prices['reth'] * 0.1 + Number.EPSILON) * 100
          ) / 100,
        marketPrice: prices['reth'],
        claimValue:
          Math.round(
            (RETH_AMOUNT_TEMP * prices['reth'] + Number.EPSILON) * 100
          ) / 100,
        profitLoss:
          Math.round(
            (RETH_AMOUNT_TEMP * prices['reth'] -
              RETH_AMOUNT_TEMP * (prices['reth'] - prices['reth'] * 0.1) +
              Number.EPSILON) *
              100
          ) / 100,
        grvtRewards: 33.24,
      },
      {
        id: 'steth',
        name: 'stETH',
        amount: STETH_AMOUNT_TEMP,
        liquidationPrice:
          Math.round(
            (prices['steth'] - prices['steth'] * 0.1 + Number.EPSILON) * 100
          ) / 100,
        marketPrice: prices['steth'],
        claimValue:
          Math.round(
            (STETH_AMOUNT_TEMP * prices['steth'] + Number.EPSILON) * 100
          ) / 100,
        profitLoss:
          Math.round(
            (STETH_AMOUNT_TEMP * prices['steth'] -
              STETH_AMOUNT_TEMP * (prices['steth'] - prices['steth'] * 0.1) +
              Number.EPSILON) *
              100
          ) / 100,
        grvtRewards: 33.24,
      },
    ],
  }

  return (
    <>
      <Flex paddingBottom={{ base: '40px', lg: '80px' }}>
        <Flex w="20%" display={{ base: 'flex', xl: 'none' }}>
          <IconButton
            variant="unstyled"
            icon={<FaIcon height="24px" icon={faBars} />}
            aria-label="toggle-main-nav"
            onClick={() => {
              mainNavContext && mainNavContext.openMainNavDrawer()
            }}
          />
        </Flex>
        <Flex w="100%" justifyContent={{ base: 'center', xl: 'flex-start' }}>
          <IconHeading
            icon={faScaleBalanced}
            justifyContent="center"
            fontSize="2xl"
            marginBottom="0"
          >
            Stability Pool
          </IconHeading>
        </Flex>
        <Flex w="20%" justifyContent="center"></Flex>
      </Flex>
      {!isSmallRes && (
        <PoolHeader
          totalDeposit={totalDeposit}
          poolShare={poolShare}
          poolTvl={poolTvl}
          totalClaimed={totalClaimed}
          totalClaimable={totalClaimable}
          grvtRewards={grvtRewards}
        />
      )}
      <Tabs colorScheme="purple" isFitted={isSmallRes}>
        <TabList
          borderBottomWidth="1px"
          borderColor="gray.500"
          marginBottom="40px"
        >
          {isSmallRes && (
            <Tab
              minWidth={{ base: '0', md: '150px', lg: '200px' }}
              borderBottomWidth="3px"
              fontWeight="medium"
            >
              Position
            </Tab>
          )}
          <Tab
            minWidth={{ base: '0', md: '150px', lg: '200px' }}
            borderBottomWidth="3px"
            fontWeight="medium"
          >
            Deposit
          </Tab>
          <Tab
            minWidth={{ base: '0', md: '150px', lg: '200px' }}
            borderBottomWidth="3px"
            fontWeight="medium"
          >
            Withdraw
          </Tab>
          <Tab
            minWidth={{ base: '0', md: '150px', lg: '200px' }}
            borderBottomWidth="3px"
            fontWeight="medium"
          >
            Claim
          </Tab>
        </TabList>
        <TabPanels>
          {isSmallRes && (
            <TabPanel padding="0">
              <PoolHeader
                totalDeposit={totalDeposit}
                poolShare={poolShare}
                poolTvl={poolTvl}
                totalClaimed={totalClaimed}
                totalClaimable={totalClaimable}
                grvtRewards={grvtRewards}
              />
            </TabPanel>
          )}
          <TabPanel padding="0">
            <PoolDeposit
              vusdBalance={balances['vusd']}
              totalDeposit={totalDeposit}
              poolTvl={poolTvl}
            />
          </TabPanel>
          <TabPanel padding="0">
            <PoolWithdraw totalDeposit={totalDeposit} poolTvl={poolTvl} />
          </TabPanel>
          <TabPanel padding="0">
            <PoolClaim claimableAssets={claimableAssets} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default Pool
