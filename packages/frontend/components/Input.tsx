import { Input as ChakraInput } from '@chakra-ui/react'

/**
 * Component
 */
function Input(props): JSX.Element {
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
