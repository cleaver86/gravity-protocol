import { Box, Flex, Heading } from '@chakra-ui/react'
import FaIcon from '../components/FaIcon'
import { faCircleInfo } from '@fortawesome/pro-regular-svg-icons'

const Label = ({ children, info, orientation }) => {
  return (
    <Flex
      marginBottom={orientation === 'vertical' ? '10px' : '0'}
      marginRight={orientation === 'horizontal' ? '10px' : '0'}
    >
      {info && (
        <Box marginRight="5px">
          <FaIcon height="15px" icon={faCircleInfo} color="gray.300" />
        </Box>
      )}
      <Heading
        size="xs"
        textTransform="uppercase"
        fontWeight="semibold"
        color="gray.300"
      >
        {children}
      </Heading>
    </Flex>
  )
}

Label.defaultProps = {
  orientation: 'vertical',
}

export default Label
