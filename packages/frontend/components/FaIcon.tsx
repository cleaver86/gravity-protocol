import { chakra } from '@chakra-ui/react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  icon: IconDefinition
  height?: string
  color?: string
  _groupHover?: object
}

const FaIcon = ({
  icon,
  height = '15px',
  color = 'gray.200',
  _groupHover,
}: Props): JSX.Element => {
  const Icon = chakra(FontAwesomeIcon)

  return (
    <Icon
      height={height}
      width="auto"
      color={color}
      icon={icon}
      _groupHover={_groupHover}
    />
  )
}

export default FaIcon
