import { Box, Flex, Text, Tooltip, FlexProps } from '@chakra-ui/react'
import FaIcon from '../components/FaIcon'
import { faCircleInfo } from '@fortawesome/pro-regular-svg-icons'

type Props = FlexProps & {
  children: React.ReactNode
  tooltip?: string
}

const Label = ({ children, tooltip, ...flexProps }: Props): JSX.Element => {
  return (
    <Flex alignItems="center" marginBottom="10px" {...flexProps}>
      {tooltip && (
        <Tooltip label={tooltip} borderRadius="3px">
          <Box marginTop="-2px" marginRight="5px">
            <FaIcon icon={faCircleInfo} color="gray.300" />
          </Box>
        </Tooltip>
      )}
      <Text
        fontSize="sm"
        textTransform="uppercase"
        fontWeight="semibold"
        color="gray.300"
      >
        {children}
      </Text>
    </Flex>
  )
}

export default Label
