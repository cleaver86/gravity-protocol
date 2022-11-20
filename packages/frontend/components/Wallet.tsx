import { useContext, useEffect, useState } from 'react'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  ExpandedIndex,
  Flex,
  Spacer,
  StackDivider,
  Text,
  VStack,
  useMediaQuery,
} from '@chakra-ui/react'
import { TOKENS } from '../constants'
import {
  WalletContextProps,
  WalletProvider,
  TokenMonetaryValues,
} from '../types'
import { WalletContext } from '../providers/WalletProvider'
import { getFormattedCurrency } from '../utils/currency'
import AccountDropdown from './WalletAccountDropdown'
import WalletToken from './WalletToken'
import Label from './Label'
import TokenIcon from './TokenIcon'

const WalletContent = ({ balances, prices, total }: WalletContextProps) => (
  <Flex h="100%" direction="column" justifyContent="space-between">
    <Flex direction={'column'} padding="0 20px">
      <VStack divider={<StackDivider borderColor="gray.500" />} align="stretch">
        {Object.keys(TOKENS).map((key) => (
          <WalletToken
            key={key}
            label={key.toUpperCase()}
            icon={<TokenIcon id={key} />}
            balance={balances[key as keyof TokenMonetaryValues]}
            usd={prices[key as keyof TokenMonetaryValues]}
          />
        ))}
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

type WalletProps = WalletProvider & {
  account: string
  deactivate: () => void
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
