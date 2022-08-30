import React from 'react'
import IconHeading from '../components/IconHeading'
import { faVault } from '@fortawesome/pro-regular-svg-icons'

function Stake(): JSX.Element {
  return (
    <>
      <IconHeading icon={faVault}>Stake</IconHeading>
      <text>This is the staking section.</text>
    </>
  )
}

export default Stake
