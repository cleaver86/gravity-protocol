import { Badge, Text } from '@chakra-ui/react'
import { StatusType } from '../types'
import FaIcon from './FaIcon'
import {
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/pro-regular-svg-icons'

export type StatusProps = {
  type: StatusType
}

const status = {
  normal: {
    color: 'green',
    icon: faCheckCircle,
  },
  caution: {
    color: 'orange.200',
    icon: faExclamationCircle,
  },
  recovery: {
    color: 'red.100',
    icon: faExclamationCircle,
  },
}

/**
 * Component
 */
const Status = ({ type }: StatusProps): JSX.Element => {
  return (
    <Badge
      display="inline-flex"
      alignItems="center"
      size="md"
      variant="outline"
      padding="5px 20px 5px 18px"
      boxShadow="none"
      border="1px solid"
      borderColor={status[type]?.color}
      color={status[type].color}
      borderRadius="20px"
      fontSize="sm"
    >
      <FaIcon icon={status[type]?.icon} color={status[type]?.color} />
      <Text marginLeft="5px">{type}</Text>
    </Badge>
  )
}

export default Status
