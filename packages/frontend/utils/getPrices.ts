import { ethers } from 'ethers'
import currency from 'currency.js'

const RPC_MAINNET = 'https://rpc.ankr.com/eth'
const CHAINLINK_ETH_USD_ADDRESS = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419'
const CHAINLINK_STETH_ETH_ADDRESS = '0x86392dC19c0b719886221c78AB11eb8Cf5c52812'

// This constant describes the ABI interface of the contract, which will provide the price of ETH
// It looks like a lot, and it is, but this information is generated when we compile the contract
// We need to let ethers know how to interact with this contract.
const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'description',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint80', name: '_roundId', type: 'uint80' }],
    name: 'getRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'version',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
]

export async function getEthUsdPrice() {
  const provider = new ethers.providers.JsonRpcProvider(RPC_MAINNET)
  // We create an instance of the contract which we can interact with
  const priceFeed = new ethers.Contract(
    CHAINLINK_ETH_USD_ADDRESS,
    aggregatorV3InterfaceABI,
    provider
  )
  // We get the data from the last round of the contract
  const roundData = await priceFeed.latestRoundData()
  // Determine how many decimals the price feed has (10**decimals)
  const decimals = await priceFeed.decimals()

  // We convert the price to a number and return it
  return currency(roundData.answer.toString() / Math.pow(10, decimals)).value
}

export async function getStethEthPrice() {
  const provider = new ethers.providers.JsonRpcProvider(RPC_MAINNET)
  // We create an instance of the contract which we can interact with
  const priceFeed = new ethers.Contract(
    CHAINLINK_STETH_ETH_ADDRESS,
    aggregatorV3InterfaceABI,
    provider
  )
  // We get the data from the last round of the contract
  const roundData = await priceFeed.latestRoundData()
  // Determine how many decimals the price feed has (10**decimals)
  const decimals = await priceFeed.decimals()

  // We convert the price to a number and return it
  return currency(roundData.answer.toString() / Math.pow(10, decimals), {
    precision: decimals,
  }).value
}

export async function getRethUsdPrice() {
  const value = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=rocket-pool-eth&vs_currencies=usd'
  )
  const json = await value.json()

  return json['rocket-pool-eth'].usd
}
