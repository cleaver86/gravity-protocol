import GrvtTokenIcon from '../public/images/token-grvt.svg'
import VusdTokenIcon from '../public/images/token-vusd.svg'
import EthTokenIcon from '../public/images/token-eth.svg'
import RethTokenIcon from '../public/images/token-reth.svg'
import StethTokenIcon from '../public/images/token-steth.svg'
import { TokenIcons } from '../types'

const icons = {
  grvt: <GrvtTokenIcon />,
  vusd: <VusdTokenIcon />,
  eth: <EthTokenIcon />,
  reth: <RethTokenIcon />,
  steth: <StethTokenIcon />,
} as TokenIcons

type Props = {
  id: string
}

const TokenIcon = ({ id }: Props): JSX.Element => {
  return icons[id as keyof TokenIcons]
}

export default TokenIcon
