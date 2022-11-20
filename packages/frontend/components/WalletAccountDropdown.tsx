import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
  Text,
} from '@chakra-ui/react'
import { shortenAddress } from '@usedapp/core'
import { WalletProvider } from '../types'
import WalletIcon from './WalletIcon'
import FaIcon from './FaIcon'
import { faAngleDown } from '@fortawesome/pro-solid-svg-icons'

type WalletProps = WalletProvider & {
  account: string
  deactivate: () => void
}

const AccountDropdown = ({ name, account, deactivate }: WalletProps) => (
  <Box top="11px" right="20px" zIndex="100">
    <Menu placement="bottom-end">
      <MenuButton
        as={Button}
        bg="none"
        border="1px solid"
        borderColor="gray.500"
        paddingLeft="10px"
        paddingRight="15px"
        fontSize="sm"
        fontWeight="medium"
        _hover={{
          background: 'purple.500',
          borderColor: 'purple.500',
        }}
        _active={{ background: 'purple.500' }}
      >
        <Flex alignItems={'center'}>
          <WalletIcon name={name} />
          <Text color="gray.100">{shortenAddress(account)}</Text>
          <Box marginLeft={'10px'}>
            <FaIcon icon={faAngleDown} height="18px" />
          </Box>
        </Flex>
      </MenuButton>
      <MenuList bg="purple.500" border="none">
        <MenuItem onClick={deactivate} _hover={{ background: 'purple.400' }}>
          Disconnect
        </MenuItem>
      </MenuList>
    </Menu>
  </Box>
)

export default AccountDropdown
