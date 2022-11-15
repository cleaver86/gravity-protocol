import { useContext, useState } from 'react'
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
import { faBars } from '@fortawesome/pro-regular-svg-icons'
import {
  STATUS_SYSTEM_NORMAL,
  STATUS_SYSTEM_CAUTION,
  STATUS_SYSTEM_RECOVERY,
} from '../../constants'
import { TokenMonetaryValues, Vessel } from '../../types'
import { WalletContext } from '../../providers/WalletProvider'
import { MainNavContext } from '../../providers/MainNavProvider'
import TokenHeading from '../TokenHeading'
import VesselHeader from '../layout/VesselHeader'
import VesselBorrow from '../layout/VesselBorrow'
import FaIcon from '../FaIcon'
import { getLiquidationPriceFromBorrow } from '../../utils/totals'

type VesselProps = {
  id: string
  maxPersonalLtv: number
}

/**
 * Component
 */
function Vessel({ id, maxPersonalLtv }: VesselProps): JSX.Element {
  const { toggleMainNav } = useContext(MainNavContext)
  const { balances, prices } = useContext(WalletContext)
  const [isSmallRes] = useMediaQuery('(max-width: 992px)')
  // TODO Remove vessel fixtures and index logic
  const vessels = [
    {
      id: 'eth',
      display: 'ETH',
      systemStatus: STATUS_SYSTEM_NORMAL,
      available: 0,
      collateral: 0,
      debt: 0,
      redemptionQueue: 0,
      liquidationPrice: 0,
      personalLtv: 0,
      systemLtv: 40.46,
      maxSystemLtv: 65.0,
      maxPersonalLtv: 90.0,
    },
    {
      id: 'eth',
      display: 'ETH',
      systemStatus: STATUS_SYSTEM_NORMAL,
      available: 21082.81,
      collateral: 46617.6,
      debt: 21082.81,
      redemptionQueue: 10000000,
      liquidationPrice: getLiquidationPriceFromBorrow(21082.81, 30, 0.9),
      personalLtv: 45,
      systemLtv: 30.46,
      maxSystemLtv: 65.0,
      maxPersonalLtv: 90.0,
    },
    {
      id: 'eth',
      display: 'ETH',
      systemStatus: STATUS_SYSTEM_NORMAL,
      available: 16866.24,
      collateral: 37294.08,
      debt: 21082.81,
      redemptionQueue: 1000000,
      liquidationPrice: getLiquidationPriceFromBorrow(21082.81, 30, 0.9),
      personalLtv: 56.53,
      systemLtv: 30.46,
      maxSystemLtv: 65.0,
      maxPersonalLtv: 90.0,
    },
    {
      id: 'eth',
      display: 'ETH',
      systemStatus: STATUS_SYSTEM_NORMAL,
      available: 11806.36,
      collateral: 26105.86,
      debt: 21082.81,
      redemptionQueue: 100000,
      liquidationPrice: getLiquidationPriceFromBorrow(21082.81, 30, 0.9),
      personalLtv: 80.75,
      systemLtv: 30.46,
      maxSystemLtv: 65.0,
      maxPersonalLtv: 90.0,
    },
    {
      id: 'eth',
      display: 'ETH',
      systemStatus: STATUS_SYSTEM_CAUTION,
      available: 21082.81,
      collateral: 46617.6,
      debt: 21082.81,
      redemptionQueue: 10000000,
      liquidationPrice: getLiquidationPriceFromBorrow(21082.81, 30, 0.9),
      personalLtv: 45,
      systemLtv: 56.32,
      maxSystemLtv: 65.0,
      maxPersonalLtv: 90.0,
    },
    {
      id: 'eth',
      display: 'ETH',
      systemStatus: STATUS_SYSTEM_RECOVERY,
      available: 21082.81,
      collateral: 46617.6,
      debt: 21082.81,
      redemptionQueue: 1000000,
      liquidationPrice: getLiquidationPriceFromBorrow(21082.81, 30, 0.65),
      personalLtv: 45,
      systemLtv: 67.19,
      maxSystemLtv: 65.0,
      maxPersonalLtv: 65.0,
    },
  ] as Vessel[]
  const [vesselIndex, setVesselIndex] = useState(0)
  const vessel = vessels[vesselIndex]
  /////////////////////////////////////

  const walletBalance =
    balances[vessel.id as keyof TokenMonetaryValues] *
    prices[vessel.id as keyof TokenMonetaryValues]

  return (
    <>
      <Flex paddingBottom={{ base: '40px', lg: '80px' }}>
        <Flex w="20%" display={{ base: 'flex', xl: 'none' }}>
          <IconButton
            variant="unstyled"
            icon={<FaIcon height="24px" icon={faBars} />}
            aria-label="toggle-main-nav"
            onClick={() => {
              toggleMainNav()
            }}
          />
        </Flex>
        <Flex w="100%" justifyContent={{ base: 'center', xl: 'flex-start' }}>
          <TokenHeading
            id={vessel.id}
            justifyContent="center"
            fontSize="2xl"
            marginBottom="0"
            onClick={() => {
              setVesselIndex(vessels[vesselIndex + 1] ? vesselIndex + 1 : 0)
            }}
          >
            {`${vessel.display.toUpperCase()} Vessel`}
          </TokenHeading>
        </Flex>
        <Flex w="20%" justifyContent="center"></Flex>
      </Flex>
      {!isSmallRes && (
        <VesselHeader walletBalance={walletBalance} {...vessel} />
      )}
      <Tabs colorScheme="purple" isFitted={isSmallRes}>
        <TabList
          borderBottomWidth="1px"
          borderColor="gray.500"
          marginBottom="40px"
        >
          {isSmallRes && (
            <Tab
              minWidth={{ base: '0', md: '200px' }}
              borderBottomWidth="3px"
              fontWeight="medium"
            >
              Position
            </Tab>
          )}
          <Tab
            minWidth={{ base: '0', md: '200px' }}
            borderBottomWidth="3px"
            fontWeight="medium"
          >
            Borrow
          </Tab>
          <Tab
            minWidth={{ base: '0', md: '200px' }}
            borderBottomWidth="3px"
            fontWeight="medium"
          >
            Repay
          </Tab>
        </TabList>
        <TabPanels>
          {isSmallRes && (
            <TabPanel padding="0">
              <VesselHeader walletBalance={walletBalance} {...vessel} />
            </TabPanel>
          )}
          <TabPanel padding="0">
            <VesselBorrow
              name={id}
              balance={balances[id as keyof TokenMonetaryValues]}
              price={prices[id as keyof TokenMonetaryValues]}
              maxPersonalLtv={maxPersonalLtv}
            />
          </TabPanel>
          <TabPanel padding="0">
            <p>Repay</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default Vessel
