import { Flex, Text } from '@chakra-ui/react'
import currencyJs from 'currency.js'

const MonetaryText = ({ children, currency, fontSize, align }) => {
  const symbol = currency.toLowerCase() === 'usd' ? '$' : ''

  return (
    <Flex alignItems="baseline" justifyContent={align}>
      <Text fontSize={fontSize} fontWeight="medium">
        {currencyJs(children).format({ symbol })}
      </Text>
      <Text fontSize="sm" marginLeft="5px">
        {currency}
      </Text>
    </Flex>
  )
}

export default MonetaryText
