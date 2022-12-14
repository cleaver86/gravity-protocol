import { Flex, Heading, HeadingProps } from '@chakra-ui/react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import FaIcon from './FaIcon'

type Props = HeadingProps & {
  children: React.ReactNode
  icon: IconDefinition
}

/**
 * Component
 */
function IconHeading({ children, icon, ...rest }: Props): JSX.Element {
  return (
    <Flex>
      <FaIcon height="23px" icon={icon} />
      <Heading
        display="flex"
        alignItems="center"
        fontWeight="medium"
        fontSize="2xl"
        paddingLeft="20px"
        as="h1"
        mb="8"
        {...rest}
      >
        {children}
      </Heading>
    </Flex>
  )
}

export default IconHeading
