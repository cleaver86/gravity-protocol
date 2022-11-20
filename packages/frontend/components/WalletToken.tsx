import { Box, Flex, Spacer, Text } from '@chakra-ui/react'
import { getFormattedCurrency } from '../utils/currency'
import Link from './Link'

type TokenProps = {
  label: string
  icon: React.ReactNode
  balance: number
  usd: number
}

const WalletToken = ({ label, icon, balance, usd }: TokenProps) => {
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
              data-testid={`${label.toLowerCase()}-balance`}
              fontSize="md"
              fontWeight="medium"
            >
              {getFormattedCurrency(balance, 6)}
            </Text>
            <Text fontSize="sm" fontWeight="medium" marginLeft="5px">
              {label}
            </Text>
          </Flex>
          <Text
            data-testid={`${label.toLowerCase()}-total`}
            fontSize="sm"
            color="gray.300"
          >
            {getFormattedCurrency(balance * usd, 2, '$')}
          </Text>
        </Box>
        <Spacer />
        <Box textAlign="right">
          <Text
            data-testid={`${label.toLowerCase()}-price`}
            fontSize="sm"
            color="gray.300"
          >
            {getFormattedCurrency(usd, 2, '$')}
          </Text>
          <Link
            role="link"
            data-testid={`${label.toLowerCase()}-buy`}
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

export default WalletToken
