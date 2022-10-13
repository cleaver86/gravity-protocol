import { Link as ChakraLink } from '@chakra-ui/react'

/**
 * Component
 */
function Link({ children, href, ...rest }): JSX.Element {
  return (
    <ChakraLink
      href={href}
      color="purple.300"
      fontSize="md"
      fontWeight="medium"
      _hover={{
        textDecoration: 'underline',
      }}
      {...rest}
    >
      {children}
    </ChakraLink>
  )
}

export default Link
