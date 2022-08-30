import React from 'react'
import IconHeading from '../components/IconHeading'
import { faArrowRightArrowLeft } from '@fortawesome/pro-regular-svg-icons'

function Borrow(): JSX.Element {
  return (
    <>
      <IconHeading icon={faArrowRightArrowLeft}>Borrow</IconHeading>
      <text>This is the borrow section.</text>
    </>
  )
}

export default Borrow
