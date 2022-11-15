import { useEffect, useState } from 'react'
import { useEtherBalance, useTokenBalance } from '@usedapp/core'
import { BigNumber, BigNumberish, utils } from 'ethers'
import currency from 'currency.js'
import { TokenMonetaryValues } from '../types'
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
  getEthUsdPrice,
  getStethEthPrice,
  getRethUsdPrice,
  getDefaultTokenValues,
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
    useBalance: () => BigNumber.from('0x00'), //BigNumber.from('0x3019682D372367546')
    getPrice: () => 35.0,
  },
  {
    name: TOKENS.vusd,
    address: TOKEN_ADDRESS_VUSD,
    priceCurrency: CURRENCY_USD,
    precision: 2,
    useBalance: () => BigNumber.from('0x00'), //BigNumber.from('0x194672999D372367546')
    getPrice: () => 1.0,
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

const useWallet = (account: string) => {
  const [prices, setPrices] = useState<TokenMonetaryValues>(
    getDefaultTokenValues
  )
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const balances = getBalances(account)
  const getPricesAndTotal = async () => {
    setLoading(true)

    const ethUsdPrice = await ethToken.getPrice()
    let total = ethUsdPrice * balances[TOKENS.eth as keyof TokenMonetaryValues]
    const erc20TokenPrices = await Promise.all(
      erc20Tokens.map(async ({ name, getPrice, priceCurrency }) => {
        let price = await getPrice()

        // Convert prices in ETH to USD (eg. stETH)
        if (priceCurrency === TOKENS.eth) {
          price = currency(ethUsdPrice * price).value
        }

        total += balances[name as keyof TokenMonetaryValues] * price

        return { name, price }
      })
    )

    const prices = erc20TokenPrices.reduce(
      (r: TokenMonetaryValues, { name, price }): TokenMonetaryValues => {
        r[name as keyof TokenMonetaryValues] = price
        return r
      },
      {
        [TOKENS.eth]: ethUsdPrice,
      } as TokenMonetaryValues
    )

    setPrices(prices)
    setTotal(total)
    setLoading(false)
  }

  useInterval(() => {
    getPricesAndTotal()
  }, 10000)

  useEffect(() => {
    getPricesAndTotal()
  }, [])

  return { loading, balances, prices, total }
}

export default useWallet
