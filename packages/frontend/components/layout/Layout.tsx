import React, { useState } from 'react'
import { Container, Flex, Box } from '@chakra-ui/react'
import { useEthers, useNotifications } from '@usedapp/core'
import Notifications from '../Notifications'
import ConnectWallet from '../ConnectWallet'
import Wallet from '../Wallet'
import MainNav from './MainNav'
import Head, { MetaProps } from './Head'
import { MainNavProvider } from '../../providers/MainNavProvider'
import { WalletProvider } from '../../providers/WalletProvider'
import { WalletProvider as WalletProviderType } from '../../types'

// Extends `window` to add `ethereum`.
declare global {
  interface Window {
    ethereum: any
  }
}

/**
 * Prop Types
 */
interface LayoutProps {
  children: React.ReactNode
  customMeta?: MetaProps
}

const Gradiant = () => (
  <Box
    w="100%"
    h="175px"
    position="absolute"
    zIndex={0}
    bgGradient="linear(purple.700, purple.800)"
  />
)

/**
 * Component
 */
const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  const { account, deactivate } = useEthers()
  const [walletName, setWalletName] = useState<WalletProviderType['name']>()
  const [toggleNav, setToggleNav] = useState(false)
  const { notifications } = useNotifications()

  return (
    <>
      <Head customMeta={customMeta} />
      {account && walletName ? (
        <WalletProvider account={account}>
          <Flex
            direction={{ base: 'column', xl: 'row' }}
            h="calc(100vh)"
            justify="space-between"
            overflow="hidden"
          >
            <Gradiant />
            <MainNav
              toggleNav={toggleNav}
              onToggleNav={() => {
                setToggleNav(false)
              }}
            />
            <Container
              h="100%"
              padding="0 30px"
              paddingTop={{ base: '10px', xl: '40px' }}
              maxWidth="68.750em"
              overflow="scroll"
              position="relative"
              zIndex={50}
              sx={{
                '::-webkit-scrollbar': {
                  display: 'none',
                },
                scrollBarWidth: 'none',
              }}
            >
              <MainNavProvider
                toggleMainNav={() => {
                  setToggleNav(true)
                }}
              >
                {children}
              </MainNavProvider>
              <Notifications notifications={notifications} />
            </Container>
            <Box
              w={{ base: '100%', xl: '300px' }}
              position="relative"
              zIndex={50}
            >
              <Wallet
                name={walletName}
                account={account}
                deactivate={deactivate}
              />
            </Box>
          </Flex>
        </WalletProvider>
      ) : (
        <Flex width="100%" height="100vh" justifyContent="center">
          <ConnectWallet
            onConnect={(wallet) => {
              setWalletName(wallet)
            }}
          />
        </Flex>
      )}
    </>
  )
}

export default Layout
