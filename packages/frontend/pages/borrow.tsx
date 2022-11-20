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
import {
  STATUS_SYSTEM_NORMAL,
  STATUS_SYSTEM_RECOVERY,
  TOKENS,
} from '../constants'

type HeaderProps = {
  available: number
  debt: number
  minted: number
  mintCap: number
}

const Header = ({ available, debt, minted, mintCap }: HeaderProps) => (
  <Box>
    <SimpleGrid templateColumns="1fr 1fr" spacing={10} padding="40px 0">
      <Flex>
        <Box marginRight="60px">
          <Label>Available to Borrow</Label>
          <MonetaryText currency={TOKENS.vusd} fontSize="2xl">
            {available}
          </MonetaryText>
        </Box>
        <Box marginRight="60px">
          <Label>Total Debt</Label>
          <MonetaryText currency={TOKENS.vusd} fontSize="2xl">
            {debt}
          </MonetaryText>
        </Box>
      </Flex>
      <Flex>
        <Center marginRight="40px">
          <Divider orientation="vertical" />
        </Center>
        <Box marginRight="60px">
          <Label tooltip="TOOL_TIP">Total Minted</Label>
          <MonetaryText currency={TOKENS.vusd} fontSize="2xl">
            {minted}
          </MonetaryText>
        </Box>
        <Box marginRight="60px">
          <Label tooltip="TOOL_TIP">Mint Cap</Label>
          <MonetaryText currency={TOKENS.vusd} fontSize="2xl">
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
        available={16000.0}
        debt={10000.0}
        minted={100000.0}
        mintCap={30000000}
      />
      <Box padding="80px 0">
        <Wrap spacing="10">
          <WrapItem>
            <VesselCard
              id={TOKENS.eth}
              display={'ETH'}
              available={0.0}
              systemLtv={15.0}
              systemStatus={STATUS_SYSTEM_NORMAL}
              fee={0.5}
              collateral={0}
              debt={0}
              redemptionQueue={null}
              liquidationPrice={null}
              personalLtv={null}
              maxSystemLtv={80.0}
              maxPersonalLtv={90.0}
            />
          </WrapItem>
          <WrapItem>
            <VesselCard
              id={TOKENS.reth}
              display="rETH"
              available={16000.0}
              systemLtv={15.0}
              systemStatus={STATUS_SYSTEM_NORMAL}
              fee={0.5}
              collateral={0}
              debt={10000.0}
              redemptionQueue={null}
              liquidationPrice={null}
              personalLtv={10.0}
              maxSystemLtv={80.0}
              maxPersonalLtv={90.0}
            />
          </WrapItem>
          <WrapItem>
            <VesselCard
              id={TOKENS.steth}
              display="stETH"
              available={0.0}
              systemLtv={100.0}
              systemStatus={STATUS_SYSTEM_RECOVERY}
              fee={0.5}
              collateral={0}
              debt={0}
              redemptionQueue={null}
              liquidationPrice={null}
              personalLtv={null}
              maxSystemLtv={80.0}
              maxPersonalLtv={90.0}
            />
          </WrapItem>
        </Wrap>
      </Box>
    </>
  )
}

export default Borrow
