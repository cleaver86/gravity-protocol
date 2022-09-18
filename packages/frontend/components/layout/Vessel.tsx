import {
  SimpleGrid,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react'
import VesselHeader from '../layout/VesselHeader'
import VesselBorrow from '../layout/VesselBorrow'

/**
 * Component
 */
function Vessel({ name, icon }): JSX.Element {
  return (
    <>
      <VesselHeader name={name} icon={icon} />
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
              <VesselBorrow />
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
