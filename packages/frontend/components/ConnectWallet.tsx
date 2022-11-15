import { Button, Flex, Image } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import React from 'react'
import { walletconnect, walletlink } from '../lib/connectors'
import {
  WALLET_PROVIDER_METAMASK,
  WALLET_PROVIDER_COINBASE,
  WALLET_PROVIDER_WALLETCONNECT,
} from '../constants'
import { WalletProvider } from '../types'

type Props = {
  onConnect: (arg0: WalletProvider['name']) => void
}

function ConnectWallet({ onConnect }: Props): JSX.Element {
  const { activate, activateBrowserWallet } = useEthers()

  return (
    <Flex
      height="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
      minWidth="400px"
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
          onConnect(WALLET_PROVIDER_METAMASK)
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
          onConnect(WALLET_PROVIDER_WALLETCONNECT)
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
          onConnect(WALLET_PROVIDER_COINBASE)
        }}
      >
        Coinbase Wallet
      </Button>
    </Flex>
  )
}

export default ConnectWallet
