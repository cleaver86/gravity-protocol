import { useEffect, useState } from 'react'
import {
  chakra,
  Box,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
  Spacer,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useEtherBalance, useTokenBalance, shortenAddress } from '@usedapp/core'
import { utils } from 'ethers'
import {
  getEthUsdPrice,
  getStethEthPrice,
  getRethUsdPrice,
} from '../utils/getPrices'
import useInterval from '../hooks/useInterval'
import currency from 'currency.js'
import GrvtTokenIcon from '../public/images/token-grvt.svg'
import VusdTokenIcon from '../public/images/token-vusd.svg'
import EthTokenIcon from '../public/images/token-eth.svg'
import RethTokenIcon from '../public/images/token-reth.svg'
import StethTokenIcon from '../public/images/token-steth.svg'
import WalletIcon from './WalletIcon'
import FaIcon from './FaIcon'
import { faAngleDown } from '@fortawesome/pro-solid-svg-icons'

const TOKEN_ADDRESS_RETH = '0xae78736cd615f374d3085123a210448e74fc6393'
const TOKEN_ADDRESS_STETH = '0xae7ab96520de3a18e5e111b5eaab095312d7fe84'

const Label = chakra(Text, {
  baseStyle: {
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: '14px',
    color: '#847D9F',
  },
})

const Token = ({ label, icon, balance, usd }) => {
  return (
    <Flex>
      <Flex alignItems={'center'} paddingRight="10px">
        <Box h="30px" w="30px">
          {icon}
        </Box>
      </Flex>
      <Flex w="100%">
        <Box>
          <Flex alignItems="baseLine">
            <Text fontSize="md" fontWeight="medium">
              {balance}
            </Text>
            <Text fontSize="sm" fontWeight="medium" marginLeft="5px">
              {label}
            </Text>
          </Flex>
          <Text fontSize="sm" color="gray.300">
            {currency(balance * usd).format()}
          </Text>
        </Box>
        <Spacer />
        <Box textAlign="right">
          <Text fontSize="sm" color="gray.300">
            {currency(usd).format()}
          </Text>
          <Link
            href={`https://curve.fi/${label.toLowerCase()}`}
            fontSize="sm"
            fontWeight="medium"
            marginLeft="5px"
          >
            Buy
          </Link>
        </Box>
      </Flex>
    </Flex>
  )
}

/**
 * Component
 */
function Wallet({ name, account, deactivate }): JSX.Element {
  const [ethUsdPrice, setEthUsdPrice] = useState(0)
  const [stethUsdPrice, setStethUsdPrice] = useState(0)
  const [rethUsdPrice, setRethUsdPrice] = useState(0)
  const [total, setTotal] = useState(0)
  const etherBalance = useEtherBalance(account)
  const rethBalance = useTokenBalance(TOKEN_ADDRESS_RETH, account)
  const stethBalance = useTokenBalance(TOKEN_ADDRESS_STETH, account)
  const formattedGrtvBalance = '0.0'
  const formattedVusdBalance = '0.0'
  const formattedEtherBalance = etherBalance
    ? utils.formatEther(etherBalance).slice(0, 8)
    : '0'
  const formattedRethBalance = rethBalance
    ? utils.formatEther(rethBalance).slice(0, 8)
    : '0'
  const formattedStethBalance = stethBalance
    ? utils.formatEther(stethBalance).slice(0, 8)
    : '0'

  const setPricesAndTotal = async () => {
    const ethUsdPrice = await getEthUsdPrice()
    const rethUsdPrice = await getRethUsdPrice()
    const stethEthPrice = await getStethEthPrice()
    const stethUsdPrice = currency(ethUsdPrice * stethEthPrice).value

    setEthUsdPrice(ethUsdPrice)
    setRethUsdPrice(rethUsdPrice)
    setStethUsdPrice(stethUsdPrice)
    setTotal(
      formattedEtherBalance * ethUsdPrice +
        formattedRethBalance * rethUsdPrice +
        formattedStethBalance * stethUsdPrice
    )
  }

  useInterval(() => {
    setPricesAndTotal()
  }, 10000)

  useEffect(() => {
    setPricesAndTotal()
  }, [formattedEtherBalance, formattedRethBalance, formattedStethBalance])

  return (
    <Flex h="100%" direction="column" justifyContent="space-between">
      <Flex direction={'column'} padding="20px">
        <Flex alignItems={'center'} marginBottom={'40px'}>
          <Label>Wallet</Label>
          <Spacer />
          <Menu placement="bottom-end">
            <MenuButton
              as={Button}
              ml="4"
              bg="none"
              border="1px solid"
              borderColor="gray.500"
              paddingLeft="10px"
              paddingRight="15px"
              fontSize="sm"
              fontWeight="medium"
              _hover={{ background: 'purple.500', borderColor: 'purple.500' }}
              _active={{ background: 'purple.500' }}
            >
              <Flex alignItems={'center'}>
                <WalletIcon name={name} />
                <Text>{shortenAddress(account)}</Text>
                <Box marginLeft={'10px'}>
                  <FaIcon icon={faAngleDown} />
                </Box>
              </Flex>
            </MenuButton>
            <MenuList bg="purple.500" border="none">
              <MenuItem
                onClick={deactivate}
                _hover={{ background: 'purple.300' }}
              >
                Disconnect
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <VStack
          divider={<StackDivider borderColor="gray.500" />}
          align="stretch"
        >
          <Token
            label="GRVT"
            icon={<GrvtTokenIcon />}
            balance={formattedGrtvBalance}
            usd={1.0}
          />
          <Token
            label="VUSD"
            icon={<VusdTokenIcon />}
            balance={formattedVusdBalance}
            usd={1.0}
          />
          <Token
            label="ETH"
            icon={<EthTokenIcon />}
            balance={formattedEtherBalance}
            usd={ethUsdPrice}
          />
          <Token
            label="rETH"
            icon={<RethTokenIcon />}
            balance={formattedRethBalance}
            usd={rethUsdPrice}
          />
          <Token
            label="stETH"
            icon={<StethTokenIcon />}
            balance={formattedStethBalance}
            usd={stethUsdPrice}
          />
        </VStack>
      </Flex>
      <Flex
        alignItems="baseLine"
        padding="20px"
        borderTop="1px solid"
        borderColor="gray.500"
      >
        <Label>Total</Label>
        <Text marginLeft="10px" fontWeight="medium">
          {currency(total).format()}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Wallet
