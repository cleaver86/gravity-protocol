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
import VesselBorrow from '../layout/VesselBorrow'
import FaIcon from '../FaIcon'
import { faScaleBalanced, faBars } from '@fortawesome/pro-regular-svg-icons'

/**
 * Component
 */
function Pool({ name, maxLoanToValue }): JSX.Element {
  const { toggleMainNav } = useContext(MainNavContext)
  const { balances, prices } = useContext(WalletContext)
  const [isSmallRes] = useMediaQuery('(max-width: 992px)')

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
      {!isSmallRes && <PoolHeader />}
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
              <PoolHeader />
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

export default Pool
