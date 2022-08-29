import { Container, Flex, Box } from '@chakra-ui/react'
import { useEthers, useNotifications } from '@usedapp/core'
import React, { useState } from 'react'
import Notifications from '../Notifications'
import ConnectWallet from '../ConnectWallet'
import Wallet from '../Wallet'
import Head, { MetaProps } from './Head'

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
        {account ? (
          <>
            <Box w="250px" h="100%">
              test
            </Box>
            <Box w="1100px" h="100%">
              <Container h="100%" maxWidth="container.xl">
                {children}
                <Notifications notifications={notifications} />
              </Container>
            </Box>
            <Box
              w="300px"
              h="100%"
              borderLeft="1px solid"
              borderColor={'gray.500'}
            >
              <Wallet name={wallet} account={account} deactivate={deactivate} />
            </Box>
          </>
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
