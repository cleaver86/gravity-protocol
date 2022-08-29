import { chakra } from "@chakra-ui/react"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
//import { faChevronDown } from '@fortawesome/free-regular-svg-icons'
//import { faChevronDown } from '@fortawesome/pro-regular-svg-icons'
import { faAngleDown } from '@fortawesome/pro-solid-svg-icons'

const icons = {
  
}

const FaIcon = ({ icon }: { icon: IconDefinition }) => {
    const Icon = chakra(FontAwesomeIcon);

    return (
        <Icon height="18px" icon={faAngleDown} />
    )
}

export default FaIcon;