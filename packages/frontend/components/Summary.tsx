import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td as ChakraTd,
  TableCellProps,
  Text,
  TextProps,
  Tooltip,
} from '@chakra-ui/react'
import FaIcon from '../components/FaIcon'
import { faCircleInfo } from '@fortawesome/pro-regular-svg-icons'

type SummaryLabelProps = {
  children: React.ReactNode
  muted?: boolean
  tooltip?: string
}

const SummaryLabel = ({
  children,
  muted = false,
  tooltip,
}: SummaryLabelProps) => (
  <Flex alignItems="center" marginBottom="5px">
    {tooltip && (
      <Tooltip label={tooltip} borderRadius="3px">
        <Box marginTop="-2px" marginRight="5px">
          <FaIcon icon={faCircleInfo} color="gray.300" />
        </Box>
      </Tooltip>
    )}
    <Text
      textTransform="capitalize"
      color={muted ? 'gray.300' : 'gray.100'}
      fontWeight="medium"
      fontSize="md"
    >
      {children}
    </Text>
  </Flex>
)

type SummaryTextProps = TextProps & {
  muted?: boolean
}

const SummaryText = ({
  children,
  muted = false,
  ...rest
}: SummaryTextProps) => (
  <Text
    color={muted ? 'gray.300' : 'gray.100'}
    fontWeight="medium"
    align="right"
    {...rest}
  >
    {children}
  </Text>
)

const Td = ({ children, ...rest }: TableCellProps) => (
  <ChakraTd whiteSpace="normal" padding="0.40rem 0" {...rest}>
    {children}
  </ChakraTd>
)

export type SubItemType = {
  id: string
  label?: string
  value: string | number
  symbol: string
}

type Item = {
  id: string
  label: string
  value: string
  symbol: string
  tooltip: string
  hidden?: boolean
  color?: string
  subItems?: SubItemType[]
}

type Action = {
  id: string
  label: string
  tooltip: string
  onChange: () => void
}

type SummaryProps = {
  items: Item[]
  additionalItems: Item[]
  actions: Action[]
  proceedText: string
  onProceed: () => void
}

/**
 * Component
 */
const Summary = ({
  items,
  additionalItems,
  actions,
  proceedText,
  onProceed,
}: SummaryProps): JSX.Element => {
  return (
    <Box
      w="100%"
      padding={{ base: '20px 20px 40px 20px', sm: '20px 30px 40px 30px' }}
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
                          <SummaryLabel tooltip={tooltip}>{label}</SummaryLabel>
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
                        <Td w="50px" paddingLeft="10px">
                          <SummaryText fontSize="sm" align="left">
                            {symbol}
                          </SummaryText>
                        </Td>
                      </Tr>
                      {subItems && (
                        <>
                          {subItems.map(
                            (item: SubItemType): JSX.Element => (
                              <Tr
                                key={`${id}-summary-sub-item-row`}
                                borderLeft="1px solid"
                                borderColor="gray.400"
                              >
                                <Td padding="0.25rem 0">
                                  <SummaryLabel>
                                    {item.label || ''}
                                  </SummaryLabel>
                                </Td>
                                <Td padding="0.25rem 0">
                                  <SummaryText
                                    fontSize="sm"
                                    align="right"
                                    fontWeight="semibold"
                                  >
                                    {item.value}
                                  </SummaryText>
                                </Td>
                                <Td
                                  padding="0.25rem 0"
                                  w="50px"
                                  paddingLeft="10px"
                                >
                                  <SummaryText fontSize="sm" align="left">
                                    {item.symbol}
                                  </SummaryText>
                                </Td>
                              </Tr>
                            )
                          )}
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
                        <SummaryLabel tooltip={tooltip}>{label}</SummaryLabel>
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
                          <SummaryLabel tooltip={tooltip} muted>
                            {label}
                          </SummaryLabel>
                        </Td>
                        <Td>
                          <SummaryText align="right" muted>
                            {value}
                          </SummaryText>
                        </Td>
                        <Td>
                          <SummaryText fontSize="sm" muted>
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
        onClick={onProceed}
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
