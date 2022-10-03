import { createContext } from 'react'
import useWallet from '../hooks/useWallet'

export const WalletContext = createContext()

export const WalletProvider = ({ account, children }) => {
  const wallet = useWallet(account)
  return (
    <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>
  )
}
