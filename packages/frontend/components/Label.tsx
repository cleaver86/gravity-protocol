import { Box, Flex, Text } from '@chakra-ui/react'
import FaIcon from '../components/FaIcon'
import { faCircleInfo } from '@fortawesome/pro-regular-svg-icons'

const Label = ({ children, info, orientation, ...rest }) => {
  return (
    <Text
      fontSize="sm"
      textTransform="uppercase"
      fontWeight="semibold"
      color="gray.300"
      marginBottom={orientation === 'vertical' && '10px'}
      marginRight={orientation === 'horizontal' && '10px'}
      {...rest}
    >
      <Flex display="inline-flex" alignItems="center">
        {info && (
          <Box marginTop="-2px" marginRight="5px">
            <FaIcon height="15px" icon={faCircleInfo} color="gray.300" />
          </Box>
        )}
        {children}
      </Flex>
    </Text>
  )
}

Label.defaultProps = {
  orientation: 'vertical',
  align: 'flex-start',
}

export default Label
