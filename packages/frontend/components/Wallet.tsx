import { useContext, useEffect, useState } from 'react'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ExpandedIndex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
  Spacer,
  StackDivider,
  Text,
  VStack,
  useMediaQuery,
} from '@chakra-ui/react'
import { shortenAddress } from '@usedapp/core'
import { WalletProvider } from '../types'
import { WalletContext } from '../providers/WalletProvider'
import { getFormattedCurrency } from '../utils/currency'
import Link from './Link'
import Label from './Label'
import TokenIcon from './TokenIcon'
import WalletIcon from './WalletIcon'
import FaIcon from './FaIcon'
import { faAngleDown } from '@fortawesome/pro-solid-svg-icons'

type WalletProps = WalletProvider & {
  account: string
  deactivate: () => void
}

const AccountDropdown = ({ name, account, deactivate }: WalletProps) => (
  <Box top="11px" right="20px" zIndex="100">
    <Menu placement="bottom-end">
      <MenuButton
        as={Button}
        bg="none"
        border="1px solid"
        borderColor="gray.500"
        paddingLeft="10px"
        paddingRight="15px"
        fontSize="sm"
        fontWeight="medium"
        _hover={{
          background: 'purple.500',
          borderColor: 'purple.500',
        }}
        _active={{ background: 'purple.500' }}
      >
        <Flex alignItems={'center'}>
          <WalletIcon name={name} />
          <Text color="gray.100">{shortenAddress(account)}</Text>
          <Box marginLeft={'10px'}>
            <FaIcon icon={faAngleDown} height="18px" />
          </Box>
        </Flex>
      </MenuButton>
      <MenuList bg="purple.500" border="none">
        <MenuItem onClick={deactivate} _hover={{ background: 'purple.400' }}>
          Disconnect
        </MenuItem>
      </MenuList>
    </Menu>
  </Box>
)

type WalletContentProps = {
  balances: {
    grvt: number
    vusd: number
    eth: number
    reth: number
    steth: number
  }
  prices: {
    grvt: number
    vusd: number
    eth: number
    reth: number
    steth: number
  }
  total: number
}

const WalletContent = ({ balances, prices, total }: WalletContentProps) => (
  <Flex h="100%" direction="column" justifyContent="space-between">
    <Flex direction={'column'} padding="0 20px">
      <VStack divider={<StackDivider borderColor="gray.500" />} align="stretch">
        <Token
          label="GRVT"
          icon={<TokenIcon id="grvt" />}
          balance={balances['grvt']}
          usd={prices['grvt']}
        />
        <Token
          label="VUSD"
          icon={<TokenIcon id="vusd" />}
          balance={balances['vusd']}
          usd={prices['vusd']}
        />
        <Token
          label="ETH"
          icon={<TokenIcon id="eth" />}
          balance={balances['eth']}
          usd={prices['eth']}
        />
        <Token
          label="rETH"
          icon={<TokenIcon id="reth" />}
          balance={balances['reth']}
          usd={prices['reth']}
        />
        <Token
          label="stETH"
          icon={<TokenIcon id="steth" />}
          balance={balances['steth']}
          usd={prices['steth']}
        />
      </VStack>
    </Flex>
    <Spacer />
    <Flex
      alignItems="baseline"
      padding="20px"
      borderTop="1px solid"
      borderColor="gray.500"
    >
      <Label>Total</Label>
      <Text marginLeft="10px" fontWeight="medium">
        {getFormattedCurrency(total, 2, '$')}
      </Text>
    </Flex>
  </Flex>
)

type TokenProps = {
  label: string
  icon: React.ReactNode
  balance: number
  usd: number
}

const Token = ({ label, icon, balance, usd }: TokenProps) => {
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
            <Text
              data-testid={`${label}-balance`}
              fontSize="md"
              fontWeight="medium"
            >
              {getFormattedCurrency(balance, 6)}
            </Text>
            <Text fontSize="sm" fontWeight="medium" marginLeft="5px">
              {label}
            </Text>
          </Flex>
          <Text data-testid={`${label}-total`} fontSize="sm" color="gray.300">
            {getFormattedCurrency(balance * usd, 2, '$')}
          </Text>
        </Box>
        <Spacer />
        <Box textAlign="right">
          <Text data-testid={`${label}-price`} fontSize="sm" color="gray.300">
            {getFormattedCurrency(usd, 2, '$')}
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
function Wallet({ name, account, deactivate }: WalletProps): JSX.Element {
  const { balances, prices, total } = useContext(WalletContext)
  const [isSmallerThan1280] = useMediaQuery('(max-width: 1279px)')
  const [accordIndex, setAccordIndex] = useState<ExpandedIndex>(0)

  useEffect(() => {
    setAccordIndex(isSmallerThan1280 ? -1 : 0)
  }, [isSmallerThan1280])

  return (
    <Box
      borderTop={!isSmallerThan1280 ? 'none' : '1px solid'}
      borderTopColor="gray.500"
      borderLeft={{ base: 'none', xl: '1px solid' }}
      borderColor={{ base: 'none', xl: 'gray.500' }}
      background="purple.800"
      h="100%"
    >
      {(isSmallerThan1280 && (
        <Accordion
          onChange={setAccordIndex}
          index={accordIndex}
          border="none"
          allowToggle
        >
          <AccordionItem border="none">
            <Box
              position="absolute"
              display="inline-block"
              marginTop="10px"
              right="20px"
            >
              <AccountDropdown
                name={name}
                account={account}
                deactivate={deactivate}
              />
            </Box>
            <AccordionButton
              padding="20px"
              opacity="1 !important"
              cursor="auto !important"
            >
              <Flex>
                <AccordionIcon />
                <Label margin="0">Wallet</Label>
              </Flex>
            </AccordionButton>
            <AccordionPanel h="calc(100vh - 65px)" padding="20px 0 0 0">
              <WalletContent
                balances={balances}
                prices={prices}
                total={total}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )) || (
        <Box h="100%">
          <Flex padding="35px 20px 50px 20px">
            <Label margin="0">Wallet</Label>
            <Spacer />
            <AccountDropdown
              name={name}
              account={account}
              deactivate={deactivate}
            />
          </Flex>
          <Box h="calc(100vh - 125px)">
            <WalletContent balances={balances} prices={prices} total={total} />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Wallet
