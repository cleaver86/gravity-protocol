import React from 'react'
import Vessel from '../../components/layout/Vessel'
import RethTokenIcon from '../../public/images/token-reth.svg'

function Reth(): JSX.Element {
  return <Vessel name="rETH" icon={<RethTokenIcon />} />
}

export default Reth
