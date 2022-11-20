import { Image } from '@chakra-ui/react'
import {
  WALLET_PROVIDER_METAMASK,
  WALLET_PROVIDER_COINBASE,
  WALLET_PROVIDER_WALLETCONNECT,
} from '../constants'
import { WalletProvider } from '../types'

/**
 * Component
 */
const WalletIcon = ({ name }: WalletProvider): JSX.Element => {
  const iconSrc = {
    [WALLET_PROVIDER_METAMASK]: '/images/logo-metamask.png',
    [WALLET_PROVIDER_COINBASE]: '/images/logo-coinbase.png',
    [WALLET_PROVIDER_WALLETCONNECT]: '/images/logo-walletconnect.svg',
  }

  return (
    <Image
      maxHeight="20px"
      marginTop="-2px"
      marginRight="10px"
      src={iconSrc[name]}
      alt={name}
    />
  )
}

export default WalletIcon
