import { Flex, Text } from '@chakra-ui/react'
import currencyJs from 'currency.js'

const MonetaryText = ({
  children,
  currency,
  fontSize,
  align,
  showCurrency,
  color,
  ...rest
}) => {
  const symbol = currency && currency.toLowerCase() === 'usd' ? '$' : ''

  return (
    <Flex alignItems="baseline" justifyContent={align}>
      <Text fontSize={fontSize} fontWeight="medium" color={color} {...rest}>
        {currencyJs(children).format({ symbol })}
      </Text>
      {showCurrency && currency && (
        <Text fontSize="sm" marginLeft="5px" color={color}>
          {currency}
        </Text>
      )}
    </Flex>
  )
}

MonetaryText.defaultProps = {
  showCurrency: true,
  color: null,
}

export default MonetaryText
