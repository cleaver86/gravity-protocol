import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  SimpleGrid,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td as ChakraTd,
  Text,
} from '@chakra-ui/react'
import Alert from './Alert'
import Label from './Label'

const SummaryLabel = ({ children, muted, tooltip, info }) => (
  <Label
    textTransform="capitalize"
    orientation="horizontal"
    color={muted ? 'gray.300' : 'gray.100'}
    fontWeight="medium"
    fontSize="md"
    tooltip={tooltip}
    info={info}
  >
    {children}
  </Label>
)

const SummaryText = ({ children, fontSize, muted, ...rest }) => (
  <Text
    fontSize={fontSize}
    color={muted ? 'gray.300' : 'gray.100'}
    fontWeight="medium"
    {...rest}
  >
    {children}
  </Text>
)

const Td = ({ children, ...rest }) => (
  <ChakraTd whiteSpace="normal" padding="0.40rem 0" {...rest}>
    {children}
  </ChakraTd>
)

/**
 * Component
 */
function Summary({ items, additionalItems, actions, proceedText, onProcced }) {
  return (
    <Box
      w="100%"
      padding={[{ base: '20px 20px 40px 20px', sm: '20px 30px 40px 30px' }]}
      background="purple.900"
      borderRadius="10px"
    >
      <TableContainer>
        <Table variant="unstyled">
          <Tbody>
            {items.map(
              ({
                id,
                label,
                value,
                symbol,
                tooltip,
                hidden,
                color,
                subItems,
              }) => {
                return (
                  !hidden && (
                    <>
                      <Tr key={`${id}-summary-item-row`}>
                        <Td
                          w="70%"
                          paddingBottom={
                            subItems && subItems.length > 0 ? 0 : '.25rem'
                          }
                        >
                          <SummaryLabel tooltip={tooltip} info>
                            {label}
                          </SummaryLabel>
                        </Td>
                        <Td w="30%">
                          <SummaryText
                            color={color}
                            align="right"
                            fontWeight="semibold"
                          >
                            {value}
                          </SummaryText>
                        </Td>
                        <Td w="50px" paddingLeft="10px" textAlign="left">
                          <SummaryText fontSize="sm" fontWeight="medium">
                            {symbol}
                          </SummaryText>
                        </Td>
                      </Tr>
                      {subItems && (
                        <>
                          {subItems.map(({ label, value, symbol }) => (
                            <Tr
                              key={`${id}-summary-sub-item-row`}
                              borderLeft="1px solid"
                              borderColor="gray.400"
                            >
                              <Td padding="0.25rem 0">
                                <SummaryLabel align="right">
                                  {label}
                                </SummaryLabel>
                              </Td>
                              <Td padding="0.25rem 0">
                                <SummaryText
                                  fontSize="sm"
                                  align="right"
                                  fontWeight="semibold"
                                >
                                  {value}
                                </SummaryText>
                              </Td>
                              <Td
                                padding="0.25rem 0"
                                w="50px"
                                paddingLeft="10px"
                                textAlign="left"
                              >
                                <SummaryText fontSize="sm" fontWeight="medium">
                                  {symbol}
                                </SummaryText>
                              </Td>
                            </Tr>
                          ))}
                        </>
                      )}
                    </>
                  )
                )
              }
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {actions.length > 0 && (
        <>
          <Divider margin="20px 0" />
          <TableContainer>
            <Table variant="unstyled">
              <Tbody>
                {actions.map(({ id, label, tooltip }) => (
                  <>
                    <Tr key={`${id}-summary-action-row`}>
                      <Td w="90%">
                        <SummaryLabel tooltip={tooltip} info>
                          {label}
                        </SummaryLabel>
                      </Td>
                      <Td w="10%" textAlign="right">
                        <Checkbox size="lg" />
                      </Td>
                    </Tr>
                  </>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
      {additionalItems.length > 0 && (
        <>
          <Divider margin="20px 0" />
          <TableContainer>
            <Table variant="unstyled">
              <Tbody>
                {additionalItems.map(
                  ({ id, label, value, symbol, tooltip }) => (
                    <>
                      <Tr key={`${id}-summary-item-row`}>
                        <Td>
                          <SummaryLabel tooltip={tooltip} info muted>
                            {label}
                          </SummaryLabel>
                        </Td>
                        <Td>
                          <SummaryText align="right" muted>
                            {value}
                          </SummaryText>
                        </Td>
                        <Td>
                          <SummaryText fontSize="sm" fontWeight="medium" muted>
                            {symbol}
                          </SummaryText>
                        </Td>
                      </Tr>
                    </>
                  )
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
      {/* <Alert status="warning">LTV Warning Here</Alert> */}
      <Button
        w="100%"
        size="lg"
        marginTop="20px"
        borderRadius="40px"
        onClick={onProcced}
      >
        {proceedText}
      </Button>
    </Box>
  )
}

Summary.defaultProps = {
  items: [],
  additionalItems: [],
  actions: [],
  proceedText: 'Proceed',
}

export default Summary
