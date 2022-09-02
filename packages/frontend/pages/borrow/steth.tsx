import React from 'react'
import Vessel from '../../components/layout/Vessel'
import StethTokenIcon from '../../public/images/token-steth.svg'

function Steth(): JSX.Element {
  return <Vessel name="stETH" icon={<StethTokenIcon />} />
}

export default Steth
