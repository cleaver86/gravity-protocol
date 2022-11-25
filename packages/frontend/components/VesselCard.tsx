import { Box, Flex, Text, Spacer } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Vessel } from '../types'
import Label from './Label'
import MonetaryText from './MonetaryText'
import Status from './Status'
import TokenHeading from './TokenHeading'

const getLtvColor = (ltv: number): string => {
  if (ltv < 30) {
    return 'green'
  } else if (ltv < 60) {
    return 'orange'
  } else if (ltv >= 60) {
    return 'red.100'
  }

  return 'gray.100'
}

const Vessel = ({
  id,
  display,
  available,
  debt,
  systemLtv,
  systemStatus,
  personalLtv,
  fee,
  maxPersonalLtv,
}: Vessel) => {
  return (
    <NextLink href={`borrow/${id}`}>
      <Box
        backgroundColor="purple.700"
        border="1px solid"
        borderColor="gray.500"
        borderRadius="5px"
        minWidth={{ base: 'none', md: '500px' }}
        _hover={{
          border: '1px solid',
          borderColor: 'gray.300',
          cursor: 'pointer',
        }}
      >
        <Box padding={{ base: '20px 20px', md: '20px 30px' }} minHeight="280px">
          <Flex alignItems="flex-start" marginBottom="40px">
            <TokenHeading id={id} paddingLeft="15px">
              {display} Vessel
            </TokenHeading>
            <Spacer />
            <Status type={systemStatus} />
          </Flex>
          <Flex>
            <Flex direction="column" w="60%">
              <Box marginBottom="20px">
                <Label>Available to Borrow</Label>
                <MonetaryText currency="VUSD" fontSize="xl">
                  {available}
                </MonetaryText>
              </Box>
              {debt > 0 && (
                <Box marginBottom="20px">
                  <Label>Debt</Label>
                  <MonetaryText currency="VUSD" fontSize="xl">
                    {debt}
                  </MonetaryText>
                </Box>
              )}
            </Flex>
            <Flex direction="column" w="40%">
              <Box marginBottom="20px">
                <Label tooltip="TOOL_TIP">System LTV</Label>
                <Text
                  fontSize="xl"
                  fontWeight="medium"
                  color={getLtvColor(systemLtv)}
                >
                  {systemLtv.toFixed(2)}%
                </Text>
              </Box>
              {personalLtv && (
                <Box marginBottom="20px">
                  <Label tooltip="TOOL_TIP">Personal LTV</Label>
                  <Text
                    fontSize="xl"
                    fontWeight="medium"
                    color={getLtvColor(personalLtv)}
                  >
                    {personalLtv ? personalLtv.toFixed(2) : '-'}%
                  </Text>
                </Box>
              )}
            </Flex>
          </Flex>
        </Box>
        <Box
          padding={{ base: '20px 20px', md: '20px 30px' }}
          backgroundColor="purple.800"
          borderTop="1px solid"
          borderColor="gray.500"
          borderBottomRadius="5px"
        >
          <Flex>
            <Flex w="60%" alignItems="flex-end">
              <Label marginRight="10px" marginBottom="0" tooltip="TOOL_TIP">
                One-Time Fee
              </Label>
              <Text fontWeight="medium" color="gray.100">
                {fee.toFixed(2)}%
              </Text>
            </Flex>
            <Flex w="40%" alignItems="flex-end">
              <Label marginRight="10px" marginBottom="0" tooltip="TOOL_TIP">
                Max LTV
              </Label>
              <Text fontWeight="medium" color="gray.100">
                {maxPersonalLtv.toFixed(2)}%
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </NextLink>
  )
}

export default Vessel
