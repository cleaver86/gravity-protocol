import React from 'react'
import {
  Box,
  Center,
  Divider,
  Flex,
  Wrap,
  WrapItem,
  SimpleGrid,
} from '@chakra-ui/react'
import IconHeading from '../components/IconHeading'
import VesselCard from '../components/VesselCard'
import Label from '../components/Label'
import MonetaryText from '../components/MonetaryText'
import { faArrowRightArrowLeft } from '@fortawesome/pro-regular-svg-icons'
import EthTokenIcon from '../public/images/token-eth.svg'
import RethTokenIcon from '../public/images/token-reth.svg'
import StethTokenIcon from '../public/images/token-steth.svg'

const Header = ({ available, debt, minted, mintCap }) => (
  <Box>
    <SimpleGrid templateColumns="1fr 1fr" spacing={10} padding="40px 0">
      <Flex>
        <Box marginRight="60px">
          <Label>Available to Borrow</Label>
          <MonetaryText currency="VUSD" fontSize="2xl">
            {available}
          </MonetaryText>
        </Box>
        <Box marginRight="60px">
          <Label>Total Debt</Label>
          <MonetaryText currency="VUSD" fontSize="2xl">
            {debt}
          </MonetaryText>
        </Box>
      </Flex>
      <Flex>
        <Center marginRight="40px">
          <Divider orientation="vertical" />
        </Center>
        <Box marginRight="60px">
          <Label info>Total Minted</Label>
          <MonetaryText currency="VUSD" fontSize="2xl">
            {minted}
          </MonetaryText>
        </Box>
        <Box marginRight="60px">
          <Label info>Mint Cap</Label>
          <MonetaryText currency="VUSD" fontSize="2xl">
            {mintCap}
          </MonetaryText>
        </Box>
      </Flex>
    </SimpleGrid>
    <Divider />
  </Box>
)

function Borrow(): JSX.Element {
  return (
    <>
      <IconHeading icon={faArrowRightArrowLeft}>Borrow</IconHeading>
      <Header
        available={216000.0}
        debt={10000.0}
        minted={100000.0}
        mintCap="30m"
      />
      <Box padding="80px 0">
        <Wrap spacing="10" wrap="wrap">
          <WrapItem>
            <VesselCard
              name="ETH"
              icon={<EthTokenIcon />}
              available={216000.0}
              debt={10000.0}
              systemLtv={15.0}
              personalLtv={10.0}
              oneTimeFee={0.5}
              maxLtv={90.0}
            />
          </WrapItem>
          <WrapItem>
            <VesselCard
              name="rETH"
              icon={<RethTokenIcon />}
              available={0.0}
              systemLtv={15.0}
              oneTimeFee={0.5}
              maxLtv={80.0}
            />
          </WrapItem>
          <WrapItem>
            <VesselCard
              name="stETH"
              icon={<StethTokenIcon />}
              available={0.0}
              systemLtv={100.0}
              oneTimeFee={0.5}
              maxLtv={80.0}
            />
          </WrapItem>
        </Wrap>
      </Box>
    </>
  )
}

export default Borrow
