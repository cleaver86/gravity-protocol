import { Alert as ChakraAlert, AlertProps, Text } from '@chakra-ui/react'
import FaIcon from './FaIcon'
import {
  faCircleExclamation,
  faCircleInfo,
} from '@fortawesome/pro-regular-svg-icons'

type Props = AlertProps & {
  status: 'info' | 'warning'
}

const icons = {
  info: {
    svg: faCircleInfo,
    color: 'gray.200',
  },
  warning: {
    svg: faCircleExclamation,
    color: 'orange.200',
  },
}

/**
 * Component
 */
function Alert({ children, status, ...rest }: Props): JSX.Element {
  return (
    <ChakraAlert
      status={status}
      justifyContent="center"
      borderRadius="5px"
      marginBottom="20px"
      padding="20px 40px"
      {...rest}
    >
      <FaIcon
        icon={icons[status].svg}
        height="20px"
        color={icons[status].color}
      />
      <Text fontWeight="medium" marginLeft="10px">
        {children}
      </Text>
    </ChakraAlert>
  )
}

export default Alert
