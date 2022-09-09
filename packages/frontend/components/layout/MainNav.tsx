import { Box, Link, Flex, Spacer, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import FaIcon from '../FaIcon'
import {
  faArrowRightArrowLeft,
  faBook,
  faHouse,
  faScaleBalanced,
  faVault,
} from '@fortawesome/pro-regular-svg-icons'
import {
  faDiscord,
  faGithub,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import GravityLogo from '../../public/images/logo-gravity.svg'

const NavItem = ({ text, icon, route }) => {
  const router = useRouter()
  let active

  if (route === '/') {
    active = router.pathname === route
  } else {
    active = router.pathname.includes(route)
  }

  const color = active ? 'purple.100' : 'gray.100'
  const hoverColor = active ? 'purple.100' : 'white'

  return (
    <Flex role="group">
      <Flex width="30px" justifyContent="center">
        <FaIcon
          height="23px"
          icon={icon}
          color={color}
          _groupHover={{ color: hoverColor }}
        />
      </Flex>
      <NextLink href={route} passHref>
        <Link
          color={color}
          fontWeight="medium"
          marginLeft="20px"
          _groupHover={{ color: hoverColor, textDecoration: 'none' }}
        >
          {text}
        </Link>
      </NextLink>
    </Flex>
  )
}

const SocialIconLink = ({ href, icon }) => (
  <Link href={href} role="group">
    <FaIcon
      height="23px"
      icon={icon}
      color="gray.200"
      _groupHover={{ color: 'white' }}
    />
  </Link>
)

/**
 * Component
 */
function MainNav(): JSX.Element {
  return (
    <Flex
      h="100%"
      direction="column"
      alignItems="center"
      paddingTop="40px"
      borderRight="1px solid"
      borderColor="gray.500"
      background="purple.700"
    >
      <Box marginTop="3px">
        <GravityLogo />
      </Box>
      <VStack
        spacing="32px"
        marginLeft="-40px"
        alignItems="left"
        marginTop="50px"
      >
        <NavItem text="Home" icon={faHouse} route="/" />
        <NavItem text="Borrow" icon={faArrowRightArrowLeft} route="/borrow" />
        <NavItem text="Pool" icon={faScaleBalanced} route="/pool" />
        <NavItem text="Stake" icon={faVault} route="/stake" />
        <NavItem text="Docs" icon={faBook} route="/docs" />
      </VStack>
      <Spacer />
      <Flex
        w="100%"
        justifyContent="space-around"
        padding="20px 0"
        borderTop="1px solid"
        borderColor="gray.500"
      >
        <SocialIconLink
          icon={faTwitter}
          href="https://twitter.com/GravityProtocol"
        />
        <SocialIconLink
          icon={faGithub}
          href="https://github.com/GravityProtocol"
        />
        <SocialIconLink
          icon={faDiscord}
          href="https://discord.com/invite/GravityProtocol"
        />
      </Flex>
    </Flex>
  )
}

export default MainNav
