import React from 'react'
import Vessel from '../../components/layout/Vessel'
import EthTokenIcon from '../../public/images/token-eth.svg'

function Eth(): JSX.Element {
  return <Vessel name="ETH" icon={<EthTokenIcon />} />
}

export default Eth
