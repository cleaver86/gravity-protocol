import { useEffect, useState } from 'react'
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Link,
  Flex,
  Spacer,
  VStack,
  Text,
  Tooltip,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import FaIcon from '../FaIcon'
import {
  faArrowRightArrowLeft,
  faBook,
  faHouse,
  faScaleBalanced,
  faVault,
  IconDefinition,
} from '@fortawesome/pro-regular-svg-icons'
import {
  faDiscord,
  faGithub,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import GravityLogo from '../../public/images/logo-gravity.svg'
import GravityIcon from '../../public/images/icon-gravity.svg'

const NAV_WIDTH_FULL = '250px'
const NAV_WIDTH_SMALL = '75px'

type NavItemProps = {
  text: string
  icon: IconDefinition
  route: string
  disableTooltip?: boolean
}

const NavItem = ({
  text,
  icon,
  route,
  disableTooltip = false,
}: NavItemProps): JSX.Element => {
  const router = useRouter()

  let active

  if (route === '/') {
    active = router.pathname === route
  } else {
    active = router.pathname.includes(route)
  }

  const color = active ? 'purple.300' : 'gray.100'
  const hoverColor = active ? 'purple.300' : 'white'

  return (
    <NextLink href={route} passHref>
      <Flex
        role="group"
        borderRadius="40px"
        alignItems="center"
        marginTop="5px !important"
        padding={{ base: '0 20px 0 10px', xl: '0', '2xl': '0 20px 0 10px' }}
        _hover={{ background: 'purple.500', cursor: 'pointer' }}
      >
        <Tooltip label={text} placement="right" isDisabled={disableTooltip}>
          <Flex
            w="50px"
            h="50px"
            justifyContent="center"
            alignItems="center"
            padding="10px"
          >
            <FaIcon
              height="23px"
              icon={icon}
              color={color}
              _groupHover={{ color: hoverColor }}
            />
          </Flex>
        </Tooltip>
        <Link
          color={color}
          fontWeight="medium"
          marginLeft="10px"
          marginTop="3px"
          _groupHover={{ color: hoverColor, textDecoration: 'none' }}
          display={{ base: 'inline', xl: 'none', '2xl': 'inline' }}
          as="p"
        >
          {text}
        </Link>
      </Flex>
    </NextLink>
  )
}

type SocialIconLinkProps = {
  href: string
  icon: IconDefinition
  tooltip: string
  tooltipPlacement: 'top' | 'right'
}

const SocialIconLink = ({
  href,
  icon,
  tooltip,
  tooltipPlacement,
}: SocialIconLinkProps): JSX.Element => (
  <Link href={href} role="group" padding={{ base: '2px 0', '2xl': '0' }}>
    <Tooltip label={tooltip} placement={tooltipPlacement}>
      <Flex
        w="50px"
        h="50px"
        justifyContent="center"
        alignItems="center"
        padding="10px"
        borderRadius="40px"
        _hover={{ background: 'purple.500' }}
      >
        <FaIcon
          height="23px"
          icon={icon}
          color="gray.100"
          _groupHover={{ color: 'white' }}
        />
      </Flex>
    </Tooltip>
  </Link>
)

type NavProps = {
  disableTooltip: boolean
}

const Nav = ({ disableTooltip = false }: NavProps): JSX.Element => {
  const socialMediaTooltipPlacement = disableTooltip ? 'top' : 'right'

  return (
    <Box h="100%" zIndex={100} background="purple.800">
      <Flex
        width={{
          base: NAV_WIDTH_FULL,
          xl: NAV_WIDTH_SMALL,
          '2xl': NAV_WIDTH_FULL,
        }}
        h="100%"
        direction="column"
        alignItems="center"
        paddingTop="40px"
        borderRight="1px solid"
        borderColor="gray.500"
        background="purple.800"
      >
        <Box marginTop="3px">
          <Box
            display={{
              base: 'block',
              xl: 'none',
              '2xl': 'block',
            }}
            _hover={{ cursor: 'pointer' }}
          >
            <NextLink href="/">
              <GravityLogo />
            </NextLink>
          </Box>
          <Box
            display={{ base: 'none', xl: 'block', '2xl': 'none' }}
            _hover={{ cursor: 'pointer' }}
          >
            <NextLink href="/">
              <GravityIcon />
            </NextLink>
          </Box>
        </Box>
        <VStack
          alignItems="left"
          marginTop="50px"
          marginLeft={{ base: '-50px', xl: '0', '2xl': '-50px' }}
        >
          <NavItem
            text="Home"
            icon={faHouse}
            route="/"
            disableTooltip={disableTooltip}
          />
          <NavItem
            text="Borrow"
            icon={faArrowRightArrowLeft}
            route="/borrow"
            disableTooltip={disableTooltip}
          />
          <NavItem
            text="Pool"
            icon={faScaleBalanced}
            route="/pool"
            disableTooltip={disableTooltip}
          />
          <NavItem
            text="Stake"
            icon={faVault}
            route="/stake"
            disableTooltip={disableTooltip}
          />
          <NavItem
            text="Docs"
            icon={faBook}
            route="/docs"
            disableTooltip={disableTooltip}
          />
        </VStack>
        <Spacer />
        <Flex
          w="100%"
          direction={{ base: 'row', xl: 'column', '2xl': 'row' }}
          justifyContent="space-around"
          alignItems="center"
          padding="8px 0"
          borderTop="1px solid"
          borderColor="gray.500"
        >
          <SocialIconLink
            icon={faTwitter}
            href="https://twitter.com/GravityProtocol"
            tooltip="Twitter"
            tooltipPlacement={socialMediaTooltipPlacement}
          />
          <SocialIconLink
            icon={faGithub}
            href="https://github.com/Gravity-Finance"
            tooltip="Github"
            tooltipPlacement={socialMediaTooltipPlacement}
          />
          <SocialIconLink
            icon={faDiscord}
            href="https://discord.com/invite/GravityProtocol"
            tooltip="Discord"
            tooltipPlacement={socialMediaTooltipPlacement}
          />
        </Flex>
      </Flex>
    </Box>
  )
}

type MainNavProps = {
  toggleNav: boolean
  onToggleNav: () => void
}

/**
 * Component
 */
function MainNav({ toggleNav, onToggleNav }: MainNavProps): JSX.Element {
  const [isLargeRes] = useMediaQuery('(min-width: 1280px)')
  const [isExtraLargeRes] = useMediaQuery('(min-width: 1536px)')
  const [drawerAnimating, setDrawerAnimating] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false })

  useEffect(() => {
    if (toggleNav && !isOpen) {
      setDrawerAnimating(true)
      onOpen()
    }
  }, [toggleNav])

  useEffect(() => {
    if (isOpen) {
      setDrawerAnimating(false)
      onToggleNav()
    }
  }, [isOpen])

  return (
    <>
      {(isLargeRes && <Nav disableTooltip={isExtraLargeRes} />) ||
        ((isOpen || drawerAnimating) && (
          <Drawer
            placement="left"
            onClose={() => {
              setDrawerAnimating(true)
              onClose()
            }}
            isOpen={isOpen}
            onCloseComplete={() => {
              setDrawerAnimating(false)
            }}
          >
            <DrawerOverlay />
            <DrawerContent w={NAV_WIDTH_FULL} maxW={NAV_WIDTH_FULL}>
              <Nav disableTooltip />
            </DrawerContent>
          </Drawer>
        ))}
    </>
  )
}

export default MainNav
