import { Link as ChakraLink } from '@chakra-ui/react'

/**
 * Component
 */
function Link({ children, href }): JSX.Element {
  return (
    <ChakraLink
      href={href}
      color="purple.100"
      fontSize="sm"
      fontWeight="medium"
      marginLeft="5px"
      _hover={{
        textDecoration: 'underline',
      }}
    >
      {children}
    </ChakraLink>
  )
}

export default Link
