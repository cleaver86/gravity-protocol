import { Button, Flex, Image } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import React from 'react'
import { walletconnect, walletlink } from '../lib/connectors'

function ConnectWallet({ onConnect }): JSX.Element {
  const { activate, activateBrowserWallet } = useEthers()

  return (
    <Flex
      height="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Button
        justifyContent="space-between"
        width="100%"
        mb="4"
        size="lg"
        variant="outline"
        rightIcon={
          <Image
            maxWidth="20px"
            src="/images/logo-metamask.png"
            alt="MetaMask"
          />
        }
        onClick={() => {
          activateBrowserWallet()
          onConnect('metaMask')
        }}
      >
        MetaMask
      </Button>
      <Button
        justifyContent="space-between"
        width="100%"
        mb="4"
        size="lg"
        variant="outline"
        rightIcon={
          <Image
            maxWidth="20px"
            src="/images/logo-walletconnect.svg"
            alt="WalletConnect"
          />
        }
        onClick={() => {
          activate(walletconnect)
          onConnect('walletConnect')
        }}
      >
        WalletConnect
      </Button>
      <Button
        justifyContent="space-between"
        width="100%"
        mb="4"
        size="lg"
        variant="outline"
        rightIcon={
          <Image
            maxWidth="20px"
            src="/images/logo-coinbase.png"
            alt="Coinbase Wallet"
          />
        }
        onClick={() => {
          activate(walletlink)
          onConnect('coinbase')
        }}
      >
        Coinbase Wallet
      </Button>
    </Flex>
  )
}

export default ConnectWallet
