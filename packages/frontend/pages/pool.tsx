import React from 'react'
import IconHeading from '../components/IconHeading'
import { faBalanceScale } from '@fortawesome/pro-regular-svg-icons'

function Pool(): JSX.Element {
  return (
    <>
      <IconHeading icon={faBalanceScale}>Stability Pool</IconHeading>
      <text>This is the stability pool section.</text>
    </>
  )
}

export default Pool
