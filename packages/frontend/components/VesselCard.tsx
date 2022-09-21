import { Badge, Box, Flex, Heading, Text, Spacer } from '@chakra-ui/react'
import NextLink from 'next/link'
import FaIcon from './FaIcon'
import { faCircleInfo } from '@fortawesome/pro-regular-svg-icons'
import Label from './Label'
import MonetaryText from './MonetaryText'

const getLtvColor = (ltv) => {
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
  name,
  icon,
  available,
  debt,
  systemLtv,
  personalLtv,
  oneTimeFee,
  maxLtv,
}) => {
  return (
    <NextLink href={`borrow/${name.toLowerCase()}`}>
      <Box
        backgroundColor="purple.700"
        border="1px solid"
        borderColor="gray.500"
        borderRadius="5px"
        minWidth="500px"
        _hover={{
          border: '1px solid',
          borderColor: 'gray.300',
          cursor: 'pointer',
        }}
      >
        <Box padding="20px 30px" minHeight="250px">
          <Flex alignItems="flex-end" marginBottom="40px">
            {icon}
            <Heading fontSize="2xl" fontWeight="medium" marginLeft="10px">
              {name.toUpperCase()} Vessel
            </Heading>

            <Spacer />
            {systemLtv > 90 && (
              <Badge
                variant="solid"
                background="red.300"
                opacity="1"
                borderRadius="20px"
                padding="5px 15px"
              >
                <Flex alignItems="center">
                  <FaIcon height="15px" icon={faCircleInfo} color="white" />
                  <Text
                    fontSize="small"
                    fontWeight="semibold"
                    color="white"
                    marginLeft="5px"
                  >
                    Recovery Mode
                  </Text>
                </Flex>
              </Badge>
            )}
          </Flex>
          <Flex>
            <Flex direction="column" w="60%">
              <Box marginBottom="20px">
                <Label>Available to Borrow</Label>
                <MonetaryText currency="VUSD" fontSize="xl">
                  {available}
                </MonetaryText>
              </Box>
              {debt && (
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
                <Label info>System LTV</Label>
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
                  <Label info>Personal LTV</Label>
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
          padding="20px 30px"
          backgroundColor="purple.800"
          borderTop="1px solid"
          borderColor="gray.500"
          borderBottomRadius="5px"
        >
          <Flex>
            <Flex w="60%" alignItems="center">
              <Label orientation="horizontal" info>
                One-Time Fee
              </Label>
              <Text fontWeight="medium" color="gray.100">
                {oneTimeFee.toFixed(2)}%
              </Text>
            </Flex>
            <Flex w="40%" alignItems="center">
              <Label orientation="horizontal" info>
                Max LTV
              </Label>
              <Text fontWeight="medium" color="gray.100">
                {maxLtv.toFixed(2)}%
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </NextLink>
  )
}

export default Vessel
