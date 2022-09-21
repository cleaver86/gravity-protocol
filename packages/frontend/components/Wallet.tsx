import { useContext } from 'react'
import {
  chakra,
  Box,
  Button,
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
import { shortenAddress } from '@usedapp/core'
import { WalletContext } from '../providers/WalletProvider'
import currency from 'currency.js'
import Link from './Link'
import GrvtTokenIcon from '../public/images/token-grvt.svg'
import VusdTokenIcon from '../public/images/token-vusd.svg'
import EthTokenIcon from '../public/images/token-eth.svg'
import RethTokenIcon from '../public/images/token-reth.svg'
import StethTokenIcon from '../public/images/token-steth.svg'
import WalletIcon from './WalletIcon'
import FaIcon from './FaIcon'
import { faAngleDown } from '@fortawesome/pro-solid-svg-icons'

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
  const { loading, balances, prices, total } = useContext(WalletContext)

  return (
    <Flex
      h="100%"
      direction="column"
      justifyContent="space-between"
      borderLeft="1px solid"
      borderColor="gray.500"
      background="purple.800"
    >
      <Flex direction={'column'} padding="40px 20px 20px 20px">
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
                  <FaIcon icon={faAngleDown} height="18px" />
                </Box>
              </Flex>
            </MenuButton>
            <MenuList bg="purple.500" border="none">
              <MenuItem
                onClick={deactivate}
                _hover={{ background: 'purple.400' }}
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
          <Token label="GRVT" icon={<GrvtTokenIcon />} balance={0} usd={35.0} />
          <Token label="VUSD" icon={<VusdTokenIcon />} balance={0} usd={1.0} />
          <Token
            label="ETH"
            icon={<EthTokenIcon />}
            balance={balances['eth']}
            usd={prices['eth']}
          />
          <Token
            label="rETH"
            icon={<RethTokenIcon />}
            balance={balances['reth']}
            usd={prices['reth']}
          />
          <Token
            label="stETH"
            icon={<StethTokenIcon />}
            balance={balances['steth']}
            usd={prices['steth']}
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
