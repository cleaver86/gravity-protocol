import { Box, Heading } from '@chakra-ui/react'
import FaIcon from './FaIcon'

/**
 * Component
 */
function IconHeading({ children, icon }): JSX.Element {
  return (
    <Heading
      display="flex"
      alignItems="center"
      fontWeight="medium"
      fontSize="3xl"
      as="h1"
      mb="8"
    >
      <FaIcon height="23px" icon={icon} />
      <Box marginLeft="20px">{children}</Box>
    </Heading>
  )
}

export default IconHeading
