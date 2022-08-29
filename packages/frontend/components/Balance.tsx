import { Text } from '@chakra-ui/react'
import { useEtherBalance, useEthers, useTokenBalance } from '@usedapp/core'
import { utils } from 'ethers'

const RETH = '0xae78736cd615f374d3085123a210448e74fc6393'
const STETH = '0xae7ab96520de3a18e5e111b5eaab095312d7fe84'

/**
 * Component
 */
function Balance(): JSX.Element {
  const { account } = useEthers()
  const etherBalance = useEtherBalance(account)
  const formattedEther = etherBalance ? utils.formatEther(etherBalance) : ''
  const rethBalance = useTokenBalance(RETH, account);
  const formattedReth = rethBalance ? utils.formatEther(rethBalance) : ''
  const stethBalance = useTokenBalance(STETH, account);
  const formattedSteth = rethBalance ? utils.formatEther(stethBalance) : ''


  return <div>
    <text>ETH: ${formattedEther}</text>
    <text>rETH: ${formattedReth}</text>
    <text>stETH: ${formattedSteth}</text>
  </div>
}

export default Balance
