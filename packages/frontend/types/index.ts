import {
  STATUS_SYSTEM_NORMAL,
  STATUS_SYSTEM_CAUTION,
  STATUS_SYSTEM_RECOVERY,
  TOKENS,
  WALLET_PROVIDER_METAMASK,
  WALLET_PROVIDER_COINBASE,
  WALLET_PROVIDER_WALLETCONNECT,
} from '../constants'


export type StatusType =
  | typeof STATUS_SYSTEM_NORMAL
  | typeof STATUS_SYSTEM_CAUTION
  | typeof STATUS_SYSTEM_RECOVERY

export type Vessel = {
  // Identifier (eth, reth, steth)
  // [Contract]
  id: string

  // Used for labels within the UI (ETH, rETH, stETH) 
  // [UI] Constant
  display: string

  // One-time fee for opening Vessel
  // [Contract]
  fee: number

  // Represents System Loan-to-Value health
  // [UI] Calculated from systemLtv
  systemStatus: StatusType

  // Amount available to borrow
  // [UI] Calculated using collateral, debt, personalLtv, and maxPersonalLtv
  available: number

  // Amount of collateral deposited
  // [Contract]
  collateral: number

  // How much VUSD has been borrowed
  // [Contract]
  debt: number

  // Amount to be redeemed across all vessels before vessel gets redeemed against
  // [Contract]
  redemptionQueue: number | null

  // Price a collateral unit has to hit for a liquidation to occur
  // [UI] Calculated using debt, collateral, and maxPersonalLtv
  liquidationPrice: number | null

  // Loan-to-Value average across all Vessels of the same collateral type
  // [Contract]
  systemLtv: number

  // Loan-to-Value for Vessel
  // [UI] Calculated using debt and collateral
  personalLtv: number | null

  // The maxiumum system Loan-to-Value before all Vessels of the collateral type go into Recovery Mode
  // [Contract]
  maxSystemLtv: number

  // The maxiumum personal Loan-to-Value before vessel is liquidated
  // [Contract]
  maxPersonalLtv: number
}

export type Pool = {
  // Amount of VUSD deposited into Stability Pool for current account
  // [Contract]
  totalDeposit: number

  // Total amount of VUSD deposited into Stability Pool across all accounts
  // [Contract]
  poolTvl: number

  // Total cumulative value of assets claimed 
  // [Contract]
  totalClaimed: number

  // Value of assets that are currently claimable
  // [UI] Calculated from claimableAssets
  totalClaimable: number

  // Cumulative GRVT rewards
  // [Contract]
  grvtRewards: number

  // Array of assets that are currently claimable
  // [Contract]
  claimableAssets: ClaimableAsset[]
}

export type ClaimableAsset = {
  // Identifier (eth, reth, steth)
  // [Contract]
  id: string

  // Used for labels within the UI (ETH, rETH, stETH)
  // [UI] Constant
  display: string

  // Amount of asset to be claimed
  // [Contract] 
  amount: number

  // Price that asset was liquidated at
  // [Contract]
  liquidationPrice: number

  // Current market price of asset
  // [UI] Fetched from Chainlink
  marketPrice: number

  // marketPrice * amount
  // [UI] Calculated
  claimValue: number

  // (marketPrice * amount) - (liquidationPrice * amount)
  // [UI] Calculated
  profitLoss: number

  // Amount of GRVT token rewards received for claim
  // [Contract] 
  grvtRewards: number
}


export type Stake = {
  // Amount of GRVT tokens being staked
  // [Contract] 
  deposited: number

  // Amount of tokens that are currently claimable
  // [Contract] 
  claimable: number

  // Cumulative amount of GRVT tokens
  // [Contract] 
  totalClaimed: number
}

export type Portfolio = {
  // Total portfolio value
  // [UI] Calculated from totalClaimable, totalDeposited, staked, and totalDebt
  portfolioValue: number

  // Total value that is claimable via the Stability Pool and Staking
  // [UI] calculated from staked and pool
  totalClaimable: number

  // Total value that is deposited as collateral within Vessels and VUSD in the Stability Pool
  // [UI] calculated from vessels and pool
  totalDeposited: number

  // Total amount of debt across open Vessels
  // [UI] calculated from vessels
  totalDebt: number

  staked: Stake
  pool: Pool
  vessels: Vessel[]
}

export type WalletContextProps = {
  balances: TokenMonetaryValues
  prices: TokenMonetaryValues
  total: number
}

export type WalletProvider = {
  name:
    | typeof WALLET_PROVIDER_METAMASK
    | typeof WALLET_PROVIDER_COINBASE
    | typeof WALLET_PROVIDER_WALLETCONNECT
}

export type TokenMonetaryValues = { [key in keyof typeof TOKENS]: number }

export type TokenIcons = { [key in keyof typeof TOKENS]: React.ReactElement }
