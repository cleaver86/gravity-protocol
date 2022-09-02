import { Box, Heading } from '@chakra-ui/react'
import FaIcon from './FaIcon'

/**
 * Component
 */
function IconHeading({ children, icon, isFontAwesome }): JSX.Element {
  console.log(icon)
  return (
    <Heading
      display="flex"
      alignItems="center"
      fontWeight="medium"
      fontSize="3xl"
      as="h1"
      mb="8"
    >
      {isFontAwesome ? <FaIcon height="23px" icon={icon} /> : icon}
      <Box marginLeft="20px">{children}</Box>
    </Heading>
  )
}

IconHeading.defaultProps = {
  isFontAwesome: true,
}

export default IconHeading
