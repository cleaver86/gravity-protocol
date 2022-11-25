import {
  Box,
  Button,
  Flex,
  InputGroup,
  InputRightElement,
  InputProps,
  Text,
} from '@chakra-ui/react'
import { NumericFormat } from 'react-number-format'
import Label from './Label'
import Input from './Input'

type InputWrapperProps = InputProps & {
  currency: string
  label: string
  available: string
  onClickPercentage?: (arg0: number) => void
}

type CurrencyInputProps = InputProps & {
  currency: string
  label: string
  available: string
  decimals?: number
  onClickPercentage?: (arg0: number) => void
  onValueChange: (arg0: number | null) => void
  isAllowed: (arg0: number | null) => boolean
}

const InputWrapper = ({
  currency,
  label,
  available,
  onClickPercentage,
  ...rest
}: InputWrapperProps) => {
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
function CurrencyInput({
  name,
  label,
  currency,
  available,
  decimals = 2,
  onClickPercentage,
  onValueChange,
  isAllowed,
}: CurrencyInputProps): JSX.Element {
  return (
    <NumericFormat
      customInput={InputWrapper}
      name={name}
      label={label}
      currency={currency}
      available={available}
      allowLeadingZeros={false}
      allowNegative={false}
      decimalScale={decimals}
      onClickPercentage={onClickPercentage}
      thousandSeparator=","
      placeholder="0.00"
      onValueChange={({ floatValue }) => {
        onValueChange(floatValue || null)
      }}
      isAllowed={({ floatValue }) => {
        return isAllowed(floatValue || null)
      }}
    />
  )
}

export default CurrencyInput
