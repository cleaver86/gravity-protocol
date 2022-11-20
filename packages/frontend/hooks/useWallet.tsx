import { useCallback, useEffect, useState } from 'react'
import { useEtherBalance, useTokenBalance } from '@usedapp/core'
import { BigNumberish, utils } from 'ethers'
import currency from 'currency.js'
import { TokenMonetaryValues } from '../types'
import { getDefaultTokenValues } from '../utils/general'
import {
  CURRENCY_USD,
  TOKENS,
  TOKEN_ADDRESS_GRVT,
  TOKEN_ADDRESS_RETH,
  TOKEN_ADDRESS_STETH,
  TOKEN_ADDRESS_VUSD,
} from '../constants'
import useInterval from './useInterval'
import {
  getGrvtUsdPrice,
  getVusdUsdPrice,
  getEthUsdPrice,
  getStethEthPrice,
  getRethUsdPrice,
} from '../utils/prices'

type Token = {
  name: string
  priceCurrency:
    | typeof TOKENS.eth
    | typeof TOKENS.grvt
    | typeof TOKENS.vusd
    | typeof TOKENS.reth
    | typeof TOKENS.steth
  precision: number
  getPrice: () => Promise<number>
}

type EthToken = Token & {
  useBalance: (account: string) => BigNumberish
}

const ethToken = {
  name: TOKENS.eth,
  priceCurrency: CURRENCY_USD,
  precision: 6,
  useBalance: useEtherBalance, //BigNumber.from('0x2214622D372367546'),
  getPrice: getEthUsdPrice,
} as EthToken

type Erc20Token = Token & {
  address: string
  useBalance: (address: string, account: string) => BigNumberish
}

const erc20Tokens = [
  {
    name: TOKENS.grvt,
    address: TOKEN_ADDRESS_GRVT,
    priceCurrency: CURRENCY_USD,
    precision: 6,
    useBalance: useTokenBalance, //BigNumber.from('0x3019682D372367546')
    getPrice: getGrvtUsdPrice,
  },
  {
    name: TOKENS.vusd,
    address: TOKEN_ADDRESS_VUSD,
    priceCurrency: CURRENCY_USD,
    precision: 6,
    useBalance: useTokenBalance, //BigNumber.from('0x194672999D372367546')
    getPrice: getVusdUsdPrice,
  },
  {
    name: TOKENS.reth,
    address: TOKEN_ADDRESS_RETH,
    priceCurrency: CURRENCY_USD,
    precision: 6,
    useBalance: useTokenBalance,
    getPrice: getRethUsdPrice,
  },
  {
    name: TOKENS.steth,
    address: TOKEN_ADDRESS_STETH,
    priceCurrency: TOKENS.eth,
    precision: 6,
    useBalance: useTokenBalance,
    getPrice: getStethEthPrice,
  },
] as Erc20Token[]

const getBalances = (account: string): TokenMonetaryValues => {
  const ethBalance = ethToken.useBalance(account)
  const formattedEthBalance = ethBalance
    ? currency(utils.formatEther(ethBalance), { precision: ethToken.precision })
        .value
    : 0

  return erc20Tokens.reduce(
    (r, { name, address, precision, useBalance }: Erc20Token) => {
      const balance = useBalance(address, account)
      r[name as keyof TokenMonetaryValues] = balance
        ? currency(utils.formatEther(balance), { precision: precision || 6 })
            .value
        : 0
      return r
    },
    {
      [TOKENS.eth]: formattedEthBalance,
    } as TokenMonetaryValues
  )
}

const getPrices = async () => {
  const prices: TokenMonetaryValues = {
    ...getDefaultTokenValues(),
    [TOKENS.eth]: await ethToken.getPrice(),
  }
  for await (const { name, priceCurrency, getPrice } of erc20Tokens) {
    let price = await getPrice()
    // Convert prices in ETH to USD (eg. stETH)
    if (priceCurrency === TOKENS.eth) {
      price = currency(
        prices[TOKENS.eth as keyof TokenMonetaryValues] * price
      ).value
    }
    prices[name as keyof TokenMonetaryValues] = price
  }

  return prices
}

const useWallet = (account: string) => {
  const [prices, setPrices] = useState<TokenMonetaryValues>(
    getDefaultTokenValues()
  )
  const [total, setTotal] = useState(0)
  const balances = getBalances(account)
  const updatePrices = useCallback(async () => {
    const updatedPrices = await getPrices()
    setPrices(updatedPrices)
  }, [])
  const updateTotal = useCallback(() => {
    const t = Object.keys(prices).reduce((acc, key) => {
      const balance = balances[key as keyof TokenMonetaryValues]
      const price = prices[key as keyof TokenMonetaryValues]
      return acc + balance * price
    }, 0)

    setTotal(t)
  }, [balances, prices])

  useInterval(() => {
    updatePrices()
  }, 10000)

  useEffect(() => {
    updatePrices()
  }, [updatePrices])

  useEffect(() => {
    updateTotal()
  }, [updateTotal, prices])

  return { balances, prices, total }
}

export default useWallet
