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

const CustomInput = ({ currency, label, available, ...rest }) => {
  return (
    <>
      <Flex justifyContent="right" marginBottom="10px">
        <Box marginRight="auto">
          <Label>{label}</Label>
        </Box>
        <Box marginTop="-10px">
          <Button fontWeight="medium" variant="ghost">
            10%
          </Button>
          <Button fontWeight="medium" variant="ghost">
            50%
          </Button>
          <Button fontWeight="medium" variant="ghost">
            Max
          </Button>
        </Box>
      </Flex>
      <InputGroup position="relative" zIndex="0">
        <Input {...rest} />
        <InputRightElement
          margin="5px 20px"
          fontWeight="medium"
          children={<Text>{currency}</Text>}
        />
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
