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
import { WalletContext } from '../../providers/WalletProvider'
import { MainNavContext } from '../../providers/MainNavProvider'
import IconHeading from '../IconHeading'
import VesselHeader from '../layout/VesselHeader'
import VesselBorrow from '../layout/VesselBorrow'
import FaIcon from '../FaIcon'
import { faBars } from '@fortawesome/pro-regular-svg-icons'
import { getLiquidationPriceFromBorrow } from '../../utils/totals'

/**
 * Component
 */
function Vessel({ name, icon, maxLoanToValue }): JSX.Element {
  const { toggleMainNav } = useContext(MainNavContext)
  const { balances, prices } = useContext(WalletContext)
  const [isSmallRes] = useMediaQuery('(max-width: 992px)')
  const vessels = [
    /*
    export const getLiquidationPriceFromBorrow = (borrowAmount, collateralUnits, ltv  ) => {
      const unitPrice = currency(borrowAmount / (collateralUnits * ltv))
      return unitPrice.subtract(0.01);
    }
    */
    // {
    //   index: 0,
    //   systemStatus: 'normal',
    //   walletBalance: 50245.46,
    //   available: 100000.0,
    //   collateral: 220540.4,
    //   debt: 64700.24,
    //   redemptionQueue: 11460400.56,
    //   liquidationPrice: getLiquidationPriceFromBorrow(64700.24, 165.54, 0.2933), //1332.24
    //   personalLtv: 29.33,
    //   systemLtv: 20.46,
    //   maxSystemLtv: 65.0,
    //   maxPersonalLtv: 90.0,
    // },
    {
      index: 0,
      systemStatus: 'normal',
      walletBalance: 61254.87,
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
      index: 1,
      systemStatus: 'normal',
      walletBalance: 14637.27,
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
      index: 2,
      systemStatus: 'normal',
      walletBalance: 11709.81,
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
      index: 3,
      systemStatus: 'normal',
      walletBalance: 8196.87,
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
      index: 4,
      systemStatus: 'caution',
      walletBalance: 14637.27,
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
    // {
    //   index: 5,
    //   systemStatus: 'recovery',
    //   walletBalance: 50245.46,
    //   available: 52651.02,
    //   collateral: 180540.4,
    //   debt: 64700.24,
    //   redemptionQueue: 5064070.22,
    //   liquidationPrice: 250.0,
    //   personalLtv: 35.83,
    //   systemLtv: 67.19,
    //   maxSystemLtv: 65.0,
    //   maxPersonalLtv: 65.0,
    // },
    {
      index: 5,
      systemStatus: 'recovery',
      walletBalance: 14637.27,
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
  ]
  const [vessel, setVessel] = useState(vessels[0])
  const walletBalance = balances[name] * prices[name]

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
            icon={icon}
            isFontAwesome={false}
            justifyContent="center"
            fontSize="2xl"
            marginBottom="0"
            onClick={() => {
              setVessel(vessels[vessel.index + 1] || vessels[0])
            }}
          >
            {`${name.toUpperCase()} Vessel`}
          </IconHeading>
        </Flex>
        <Flex w="20%" justifyContent="center"></Flex>
      </Flex>
      {!isSmallRes && (
        <VesselHeader
          walletBalance={balances[name] * prices[name]}
          {...vessel}
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
            Borrow
          </Tab>
          <Tab
            minWidth={[{ base: '0', md: '200px' }]}
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
              name={name}
              balance={balances[name]}
              price={prices[name]}
              maxLoanToValue={maxLoanToValue}
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
