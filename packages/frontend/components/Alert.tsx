import { Alert as ChakraAlert, Text } from '@chakra-ui/react'
import FaIcon from './FaIcon'
import { faCircleExclamation } from '@fortawesome/pro-regular-svg-icons'

/**
 * Component
 */
function Alert({ children }): JSX.Element {
  return (
    <ChakraAlert status="warning" borderRadius="5px" marginBottom="20px">
      <FaIcon icon={faCircleExclamation} height="20px" color="orange.200" />
      <Text marginLeft="10px">{children}</Text>
    </ChakraAlert>
  )
}

export default Alert
