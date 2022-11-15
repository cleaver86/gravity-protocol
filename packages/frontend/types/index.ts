import {
  STATUS_SYSTEM_NORMAL,
  STATUS_SYSTEM_CAUTION,
  STATUS_SYSTEM_RECOVERY,
  TOKENS,
  WALLET_PROVIDER_METAMASK,
  WALLET_PROVIDER_COINBASE,
  WALLET_PROVIDER_WALLETCONNECT,
} from '../constants'

export type StatusType = typeof STATUS_SYSTEM_NORMAL | typeof STATUS_SYSTEM_CAUTION | typeof STATUS_SYSTEM_RECOVERY

export type Vessel = {
  id: string
  display: string
  fee: number
  systemStatus: StatusType
  available: number
  collateral: number
  debt: number
  redemptionQueue: number | null
  liquidationPrice: number | null
  systemLtv: number
  personalLtv: number | null
  maxSystemLtv: number
  maxPersonalLtv: number
}

export type WalletProvider = {
  name: typeof WALLET_PROVIDER_METAMASK | typeof WALLET_PROVIDER_COINBASE | typeof WALLET_PROVIDER_WALLETCONNECT
}

export type TokenMonetaryValues = { [key in keyof typeof TOKENS]: number }

export type TokenIcons = { [key in keyof typeof TOKENS]: React.ReactElement }