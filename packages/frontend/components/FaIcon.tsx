import { chakra } from '@chakra-ui/react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faChevronDown } from '@fortawesome/free-regular-svg-icons'
//import { faChevronDown } from '@fortawesome/pro-regular-svg-icons'

const FaIcon = ({
  icon,
  height,
  color,
  _groupHover,
}: {
  icon: IconDefinition
}) => {
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

FaIcon.defaultProps = {
  color: 'gray.200',
}

export default FaIcon
