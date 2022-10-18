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
import FaIcon from '../FaIcon'
import { faScaleBalanced, faBars } from '@fortawesome/pro-regular-svg-icons'

/**
 * Component
 */
function Pool(): JSX.Element {
  const { toggleMainNav } = useContext(MainNavContext)
  const { balances, prices } = useContext(WalletContext)
  const [isSmallRes] = useMediaQuery('(max-width: 992px)')
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
        amount: 1.65,
        liquidationPrice: prices['eth'] - prices['eth'] * 10,
        marketPrice: prices['eth'],
        claimValue: 1.65 * prices['eth'],
        profitLoss:
          1.65 * prices['eth'] - 1.65 * (prices['eth'] - prices['eth'] * 10),
        grvtRewards: 33.24,
      },
      {
        id: 'reth',
        amount: 2.8,
        liquidationPrice: prices['reth'] - prices['reth'] * 10,
        marketPrice: prices['reth'],
        claimValue: 2.8 * prices['reth'],
        profitLoss:
          2.8 * prices['reth'] - 2.8 * (prices['reth'] - prices['reth'] * 10),
        grvtRewards: 33.24,
      },
      {
        id: 'steth',
        amount: 1.75,
        liquidationPrice: prices['steth'] - prices['steth'] * 10,
        marketPrice: prices['steth'],
        claimValue: 1.75 * prices['steth'],
        profitLoss:
          1.75 * prices['steth'] -
          1.75 * (prices['steth'] - prices['steth'] * 10),
        grvtRewards: 33.24,
      },
    ],
  }

  return (
    <>
      <Flex paddingBottom={[{ base: '40px', lg: '80px' }]}>
        <Flex w="20%" display={[{ base: 'flex', xl: 'none' }]}>
          <IconButton
            variant="unstyled"
            icon={<FaIcon height="24px" icon={faBars} />}
            onClick={() => {
              toggleMainNav()
            }}
          />
        </Flex>
        <Flex w="100%" justifyContent={[{ base: 'center', xl: 'flex-start' }]}>
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
              minWidth={[{ base: '0', md: '200px' }]}
              borderBottomWidth="3px"
              fontWeight="medium"
            >
              Position
            </Tab>
          )}
          <Tab
            minWidth={[{ base: '0', md: '200px' }]}
            borderBottomWidth="3px"
            fontWeight="medium"
          >
            Deposit
          </Tab>
          <Tab
            minWidth={[{ base: '0', md: '200px' }]}
            borderBottomWidth="3px"
            fontWeight="medium"
          >
            Withdraw
          </Tab>
          <Tab
            minWidth={[{ base: '0', md: '200px' }]}
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
            <p>Claim</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default Pool
