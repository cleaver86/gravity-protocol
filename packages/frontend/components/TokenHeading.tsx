import { Flex, Heading, HeadingProps } from '@chakra-ui/react'
import TokenIcon from './TokenIcon'

type Props = HeadingProps & {
  id: string
  children: React.ReactNode
}

/**
 * Component
 */
function IconHeading({ children, id, ...rest }: Props): JSX.Element {
  return (
    <Flex>
      <TokenIcon id={id} />
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
