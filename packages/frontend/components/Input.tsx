import { Input as ChakraInput, InputProps } from '@chakra-ui/react'

/**
 * Component
 */
const Input = (props: InputProps): JSX.Element => {
  return (
    <ChakraInput
      fontWeight="medium"
      padding="24px 24px 24px 18px"
      focusBorderColor="gray.300"
      {...props}
    />
  )
}
export default Input
