import {
  Box,
  Button,
  Flex,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import { NumericFormat } from 'react-number-format'
import Label from './Label'
import Input from './Input'

const CustomInput = ({
  currency,
  label,
  available,
  onClickPercentage,
  ...rest
}) => {
  return (
    <>
      <Flex justifyContent="right">
        <Box marginRight="auto">
          <Label marginBottom="20px">{label}</Label>
        </Box>
        {onClickPercentage && (
          <Box marginTop="-10px">
            <Button
              fontWeight="medium"
              variant="ghost"
              onClick={() => {
                onClickPercentage(0.1)
              }}
            >
              10%
            </Button>
            <Button
              fontWeight="medium"
              variant="ghost"
              onClick={() => {
                onClickPercentage(0.5)
              }}
            >
              50%
            </Button>
            <Button
              fontWeight="medium"
              variant="ghost"
              onClick={() => {
                onClickPercentage(1)
              }}
            >
              Max
            </Button>
          </Box>
        )}
      </Flex>
      <InputGroup position="relative" zIndex="0">
        <Input {...rest} />
        <InputRightElement margin="5px 20px" fontWeight="medium">
          <Text>{currency}</Text>
        </InputRightElement>
      </InputGroup>
      <Flex
        position="absolute"
        margin="-15px 20px 0 0"
        justifyContent="right"
        fontSize="sm"
        right="0"
      >
        <Text
          padding="5px"
          fontWeight="medium"
          color="gray.300"
          background="purple.800"
        >
          Available {available}
        </Text>
      </Flex>
    </>
  )
}

/**
 * Component
 */
function CurrencyInput({ decimals, onChange, ...rest }): JSX.Element {
  return (
    <NumericFormat
      customInput={CustomInput}
      allowLeadingZeros={false}
      allowNegative={false}
      decimalScale={decimals}
      thousandSeparator=","
      placeholder="0.00"
      onValueChange={(values) => {
        onChange(values.floatValue)
      }}
      {...rest}
    />
  )
}

export default CurrencyInput
