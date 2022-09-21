import { useContext } from 'react'
import {
  SimpleGrid,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react'
import { WalletContext } from '../../providers/WalletProvider'
import VesselHeader from '../layout/VesselHeader'
import VesselBorrow from '../layout/VesselBorrow'

/**
 * Component
 */
function Vessel({ name, icon, maxLoanToValue }): JSX.Element {
  const { loading, balances, prices } = useContext(WalletContext)

  return (
    <>
      <VesselHeader
        name={name}
        // icon={icon}
        balance={balances[name]}
        price={prices[name]}
      />
      <Tabs colorScheme="purple">
        <TabList
          borderBottomWidth="1px"
          borderColor="gray.500"
          marginBottom="40px"
        >
          <Tab minWidth="200px" borderBottomWidth="3px" fontWeight="medium">
            Borrow
          </Tab>
          <Tab minWidth="200px" borderBottomWidth="3px" fontWeight="medium">
            Repay
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid
              templateColumns="1fr 1fr"
              spacing={10}
              marginBottom="90px"
            >
              <VesselBorrow
                name={name}
                balance={balances[name]}
                price={prices[name]}
                maxLoanToValue={maxLoanToValue}
              />
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <p>Repay</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default Vessel
