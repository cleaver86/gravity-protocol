import { Flex, FlexProps, Text, TextProps } from '@chakra-ui/react'
import currencyJs from 'currency.js'

type Props = TextProps & {
  children: number
  currency?: string
  showCurrency?: boolean
  flexProps?: FlexProps
}

const MonetaryText = ({
  children,
  currency,
  showCurrency = true,
  flexProps = {},
  ...rest
}: Props) => {
  const symbol = currency && currency.toLowerCase() === 'usd' ? '$' : ''

  return (
    <Flex alignItems="baseline" {...flexProps}>
      <Text fontWeight="medium" {...rest}>
        {currencyJs(children).format({ symbol })}
      </Text>
      {showCurrency && currency && (
        <Text fontSize="sm" marginLeft="5px">
          {currency}
        </Text>
      )}
    </Flex>
  )
}

export default MonetaryText
