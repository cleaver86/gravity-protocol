import { useEffect, useState } from 'react'
import { useEtherBalance, useTokenBalance } from '@usedapp/core'
import { BigNumber, utils } from 'ethers'
import currency from 'currency.js'
import useInterval from './useInterval'
import {
  getEthUsdPrice,
  getStethEthPrice,
  getRethUsdPrice,
} from '../utils/fetchPrices'

export const CURRENCY_USD = 'usd'
export const CURRENCY_ETH = 'eth'
export const CURRENCY_GRVT = 'grvt'
export const CURRENCY_VUSD = 'vusd'
export const CURRENCY_RETH = 'reth'
export const CURRENCY_STETH = 'steth'
export const TOKEN_ADDRESS_GRVT = 'TEMP_GRVT_ADDRESS'
export const TOKEN_ADDRESS_VUSD = 'TEMP_VUSD_ADDRESS'
export const TOKEN_ADDRESS_RETH = '0xae78736cd615f374d3085123a210448e74fc6393'
export const TOKEN_ADDRESS_STETH = '0xae7ab96520de3a18e5e111b5eaab095312d7fe84'

const ethToken = {
  name: CURRENCY_ETH,
  address: null,
  priceCurrency: CURRENCY_USD,
  precision: 6,
  useBalance: useEtherBalance,
  getPrice: getEthUsdPrice,
}

const erc20Tokens = [
  {
    name: CURRENCY_GRVT,
    address: TOKEN_ADDRESS_GRVT,
    priceCurrency: CURRENCY_USD,
    precision: 6,
    useBalance: () => BigNumber.from('0x3019682D372367546'),
    getPrice: () => 35.0,
  },
  {
    name: CURRENCY_VUSD,
    address: TOKEN_ADDRESS_VUSD,
    priceCurrency: CURRENCY_USD,
    precision: 2,
    useBalance: () => BigNumber.from('0x194672999D372367546'),
    getPrice: () => 1.0,
  },
  {
    name: CURRENCY_RETH,
    address: TOKEN_ADDRESS_RETH,
    priceCurrency: CURRENCY_USD,
    precision: 6,
    useBalance: useTokenBalance,
    getPrice: getRethUsdPrice,
  },
  {
    name: CURRENCY_STETH,
    address: TOKEN_ADDRESS_STETH,
    priceCurrency: CURRENCY_ETH,
    precision: 6,
    useBalance: useTokenBalance,
    getPrice: getStethEthPrice,
  },
]

const getDefaultPrices = () => {
  return (
    erc20Tokens.reduce((r, { name }) => {
      r[name] = 0
      return r
    }),
    {
      [CURRENCY_ETH]: 0,
    }
  )
}

const getBalances = (account) => {
  const ethBalance = ethToken.useBalance(account)
  const formattedEthBalance = ethBalance
    ? currency(utils.formatEther(ethBalance), { precision: ethToken.precision })
        .value
    : 0

  return erc20Tokens.reduce(
    (r, { name, address, precision, useBalance }) => {
      const balance = useBalance(address, account)
      r[name] = balance
        ? currency(utils.formatEther(balance), { precision: precision || 6 })
            .value
        : 0
      return r
    },
    {
      [CURRENCY_ETH]: formattedEthBalance,
    }
  )
}

const useWallet = (account) => {
  const [prices, setPrices] = useState(getDefaultPrices)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const balances = getBalances(account)

  const getPricesAndTotal = async () => {
    setLoading(true)

    const ethUsdPrice = await ethToken.getPrice()
    let total = ethUsdPrice * balances[CURRENCY_ETH]
    const erc20TokenPrices = await Promise.all(
      erc20Tokens.map(async ({ name, getPrice, priceCurrency }) => {
        let price = await getPrice()

        // Convert prices in ETH to USD (eg. stETH)
        if (priceCurrency === CURRENCY_ETH) {
          price = currency(ethUsdPrice * price).value
        }

        total += balances[name] * price

        return { name, price }
      })
    )
    const prices = erc20TokenPrices.reduce(
      (r, { name, price }) => {
        r[name] = price
        return r
      },
      {
        [CURRENCY_ETH]: ethUsdPrice,
      }
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
