import { Badge, Text } from '@chakra-ui/react'
import FaIcon from './FaIcon'
import { faCheckCircle } from '@fortawesome/pro-regular-svg-icons'

/**
 * Component
 */
function Status({ type }): JSX.Element {
  return (
    <Badge
      display="inline-flex"
      alignItems="center"
      size="md"
      variant="outline"
      padding="5px 20px 5px 18px"
      boxShadow="none"
      border="1px solid"
      borderColor="green"
      color="green"
      borderRadius="20px"
      fontSize="sm"
    >
      <FaIcon height="15px" icon={faCheckCircle} color="green" />
      <Text marginLeft="5px">{type}</Text>
    </Badge>
  )
}

export default Status
