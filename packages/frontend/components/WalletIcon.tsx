import { Image } from '@chakra-ui/react'

/**
 * Component
 */
function WalletIcon({ name }): JSX.Element {
  const iconSrc = {
    metaMask: '/images/logo-metamask.png',
    coinbase: '/images/logo-coinbase.png',
    walletConnect: '/images/logo-walletconnect.svg'
  }

  return (
    <Image
      maxHeight="20px"
      marginTop="-2px"
      marginRight="10px"
      src={iconSrc[name]}
      alt="MetaMask"
    />
  )
}

export default WalletIcon
