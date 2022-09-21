import { Container, Flex, Box } from '@chakra-ui/react'
import { useEthers, useNotifications } from '@usedapp/core'
import React, { useState } from 'react'
import Notifications from '../Notifications'
import ConnectWallet from '../ConnectWallet'
import Wallet from '../Wallet'
import MainNav from './MainNav'
import Head, { MetaProps } from './Head'
import { WalletProvider } from '../../providers/WalletProvider'

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
  const [wallet, setWallet] = useState()
  const { notifications } = useNotifications()

  return (
    <>
      <Head customMeta={customMeta} />
      <Flex h="calc(100vh)" justify="space-between">
        <Gradiant />
        {account ? (
          <WalletProvider account={account}>
            <Box w="250px" h="100%" position="relative" zIndex={50}>
              <MainNav />
            </Box>
            <Box w="1100px" h="100%" position="relative" zIndex={50}>
              <Container h="100%" paddingTop="40px" maxWidth="container.xl">
                {children}
                <Notifications notifications={notifications} />
              </Container>
            </Box>
            <Box w="300px" h="100%" position="relative" zIndex={50}>
              <Wallet name={wallet} account={account} deactivate={deactivate} />
            </Box>
          </WalletProvider>
        ) : (
          <Box width="100%" padding="0 600px 0 600px">
            <ConnectWallet
              onConnect={(wallet) => {
                setWallet(wallet)
              }}
            />
          </Box>
        )}
      </Flex>
    </>
  )
}

export default Layout
