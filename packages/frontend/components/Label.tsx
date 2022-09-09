import { Box, Flex, Text } from '@chakra-ui/react'
import FaIcon from '../components/FaIcon'
import { faCircleInfo } from '@fortawesome/pro-regular-svg-icons'

const Label = ({ children, info, orientation, align }) => {
  return (
    <Flex
      alignItems="center"
      marginBottom={orientation === 'vertical' ? '10px' : '0'}
      marginRight={orientation === 'horizontal' ? '10px' : '0'}
      justifyContent={align}
    >
      {info && (
        <Box marginRight="5px">
          <FaIcon height="15px" icon={faCircleInfo} color="gray.300" />
        </Box>
      )}
      <Text
        fontSize="14px"
        textTransform="uppercase"
        fontWeight="semibold"
        color="gray.300"
        textAlign={align}
      >
        {children}
      </Text>
    </Flex>
  )
}

Label.defaultProps = {
  orientation: 'vertical',
  align: 'flex-start',
}

export default Label
