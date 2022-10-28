import { memo, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Checkbox,
  Flex,
  SimpleGrid,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useMediaQuery,
} from '@chakra-ui/react'
import CurrencyInput from '../CurrencyInput'
import Summary from '../Summary'
import Alert from '../Alert'
import { getCurrency, getFormattedCurrency } from '../../utils/currency'

const getTotalFromRowIndexes = (claimableAssets, indexes, key) => {
  return claimableAssets.reduce((previousValue, currentValue, i) => {
    if (indexes.has(i)) {
      return previousValue + currentValue[key]
    }

    return previousValue
  }, 0)
}

/**
 * Component
 */
function PoolClaim({ claimableAssets }): JSX.Element {
  const [isSmallRes] = useMediaQuery('(max-width: 992px)')
  const [checkedAssetIndexes, setCheckedAssetIndexes] = useState(
    new Set(claimableAssets.map((a, i) => i))
  )
  const [checkedToVusdIndexes, setCheckedToVusdIndexes] = useState(new Set())
  const [checkedToVesselIndexes, setCheckedToVesselIndexes] = useState(
    new Set()
  )

  return (
    <>
      <TableContainer marginBottom="50px">
        <Table variant="simple" w="auto">
          <Thead>
            <Tr>
              <Th w="30px" maxW="30px" padding="0 5px" isMobile={isSmallRes}>
                <Checkbox
                  size="lg"
                  isChecked={
                    checkedAssetIndexes.size === claimableAssets.length
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheckedAssetIndexes(
                        new Set(claimableAssets.map((a, i) => i))
                      )
                    } else {
                      setCheckedAssetIndexes(new Set())
                    }
                  }}
                />
              </Th>
              <Th
                w="10%"
                color="gray.300"
                fontSize="sm"
                fontWeight="semibold"
                isMobile={isSmallRes}
              >
                Asset
              </Th>
              <Th
                w="120px"
                maxW="120px"
                color="gray.300"
                fontSize="sm"
                fontWeight="semibold"
                isMobile={isSmallRes}
              >
                <Flex alignItems="center">
                  <Checkbox
                    size="lg"
                    marginRight="10px"
                    isChecked={
                      checkedToVusdIndexes.size === claimableAssets.length
                    }
                    isDisabled={
                      checkedToVesselIndexes.size === claimableAssets.length
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCheckedToVusdIndexes(
                          new Set(claimableAssets.map((a, i) => i))
                        )
                      } else {
                        setCheckedToVusdIndexes(new Set())
                      }
                    }}
                  />
                  To VUSD
                </Flex>
              </Th>
              <Th
                w="130px"
                maxW="130px"
                color="gray.300"
                fontSize="sm"
                fontWeight="semibold"
                isMobile={isSmallRes}
              >
                <Flex alignItems="center">
                  <Checkbox
                    size="lg"
                    marginRight="10px"
                    isChecked={
                      checkedToVesselIndexes.size === claimableAssets.length
                    }
                    isDisabled={
                      checkedToVusdIndexes.size === claimableAssets.length
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCheckedToVesselIndexes(
                          new Set(claimableAssets.map((a, i) => i))
                        )
                      } else {
                        setCheckedToVesselIndexes(new Set())
                      }
                    }}
                  />
                  To Vessel
                </Flex>
              </Th>
              <Th
                w="20%"
                color="gray.300"
                fontSize="sm"
                fontWeight="semibold"
                isMobile={isSmallRes}
                isNumeric
              >
                liq. Price
              </Th>
              <Th
                w="20%"
                color="gray.300"
                fontSize="sm"
                fontWeight="semibold"
                isMobile={isSmallRes}
                isNumeric
              >
                Mkt Price
              </Th>
              <Th
                w="30%"
                color="gray.300"
                fontSize="sm"
                fontWeight="semibold"
                isMobile={isSmallRes}
                isNumeric
              >
                Claim Value
              </Th>
              <Th
                w="20%"
                color="gray.300"
                fontSize="sm"
                fontWeight="semibold"
                isMobile={isSmallRes}
                isNumeric
              >
                P/L
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {claimableAssets.map(
              (
                {
                  name,
                  amount,
                  liquidationPrice,
                  marketPrice,
                  claimValue,
                  profitLoss,
                },
                i
              ) => {
                const borderBottom =
                  claimableAssets.length - 1 === i ? 'none' : '1px solid'

                return (
                  <Tr key={`${name}-claim-row`}>
                    <Td
                      w="30px"
                      maxW="30px"
                      padding="0 5px"
                      borderBottom={borderBottom}
                      isMobile={isSmallRes}
                    >
                      <Checkbox
                        size="lg"
                        isChecked={checkedAssetIndexes.has(i)}
                        onChange={(e) => {
                          const updatedSet = new Set(
                            Array.from(checkedAssetIndexes)
                          )
                          if (e.target.checked) {
                            updatedSet.add(i)
                          } else {
                            updatedSet.delete(i)
                          }

                          setCheckedAssetIndexes(updatedSet)
                        }}
                      />
                    </Td>
                    <Td
                      w="10%"
                      borderBottom={borderBottom}
                      fontWeight="medium"
                      isMobile={isSmallRes}
                    >{`${amount} ${name}`}</Td>
                    <Td
                      w="120px"
                      maxW="120px"
                      borderBottom={borderBottom}
                      isMobile={isSmallRes}
                    >
                      <Checkbox
                        size="lg"
                        isChecked={
                          checkedToVusdIndexes.has(i) &&
                          !checkedToVesselIndexes.has(i)
                        }
                        isDisabled={checkedToVesselIndexes.has(i)}
                        onChange={(e) => {
                          const updatedSet = new Set(
                            Array.from(checkedToVusdIndexes)
                          )
                          if (e.target.checked) {
                            updatedSet.add(i)
                          } else {
                            updatedSet.delete(i)
                          }

                          setCheckedToVusdIndexes(updatedSet)
                        }}
                      />
                    </Td>
                    <Td
                      w="130px"
                      maxW="130px"
                      borderBottom={borderBottom}
                      isMobile={isSmallRes}
                    >
                      <Checkbox
                        size="lg"
                        isChecked={
                          checkedToVesselIndexes.has(i) &&
                          !checkedToVusdIndexes.has(i)
                        }
                        isDisabled={checkedToVusdIndexes.has(i)}
                        onChange={(e) => {
                          const updatedSet = new Set(
                            Array.from(checkedToVesselIndexes)
                          )
                          if (e.target.checked) {
                            updatedSet.add(i)
                          } else {
                            updatedSet.delete(i)
                          }

                          setCheckedToVesselIndexes(updatedSet)
                        }}
                      />
                    </Td>
                    <Td
                      w="20%"
                      borderBottom={borderBottom}
                      fontWeight="medium"
                      isMobile={isSmallRes}
                      isNumeric
                    >
                      {getFormattedCurrency(liquidationPrice)}
                    </Td>
                    <Td
                      w="20%"
                      borderBottom={borderBottom}
                      fontWeight="medium"
                      isMobile={isSmallRes}
                      isNumeric
                    >
                      {getFormattedCurrency(marketPrice)}
                    </Td>
                    <Td
                      w="30%"
                      borderBottom={borderBottom}
                      fontWeight="medium"
                      isMobile={isSmallRes}
                      isNumeric
                    >
                      {getFormattedCurrency(claimValue)}
                    </Td>
                    <Td
                      w="20%"
                      borderBottom={borderBottom}
                      fontWeight="medium"
                      color="green"
                      isMobile={isSmallRes}
                      isNumeric
                    >
                      {`+${getFormattedCurrency(profitLoss)}`}
                    </Td>
                  </Tr>
                )
              }
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {checkedAssetIndexes.size > 0 && (
        <SimpleGrid
          columns={{ sm: 1, lg: 2 }}
          spacing={20}
          gridGap={'2.5rem'}
          marginBottom="90px"
        >
          <Box></Box>
          <Summary
            items={[
              {
                id: 'totalValueToClaim',
                label: 'Total Value to Claim',
                value: getFormattedCurrency(
                  getTotalFromRowIndexes(
                    claimableAssets,
                    checkedAssetIndexes,
                    'claimValue'
                  ) -
                    claimableAssets.reduce(
                      (previousValue, { claimValue }, i) => {
                        if (
                          checkedAssetIndexes.has(i) &&
                          checkedToVesselIndexes.has(i)
                        ) {
                          // TODO Calculate from VUSD price
                          return previousValue + claimValue
                        }
                        return previousValue
                      },
                      0
                    )
                ),
                symbol: 'USD',
                tooltip: 'Some Tooltip',
                subItems: claimableAssets.reduce(
                  (previousValue, { amount, name }, i) => {
                    if (
                      checkedAssetIndexes.has(i) &&
                      !checkedToVusdIndexes.has(i) &&
                      !checkedToVesselIndexes.has(i)
                    ) {
                      previousValue.push({
                        id: name,
                        value: amount,
                        symbol: name,
                      })
                    }
                    return previousValue
                  },
                  checkedToVusdIndexes.size > 0
                    ? [
                        {
                          id: 'vusd',
                          value: getFormattedCurrency(
                            claimableAssets.reduce(
                              (previousValue, { claimValue }, i) => {
                                if (
                                  checkedAssetIndexes.has(i) &&
                                  checkedToVusdIndexes.has(i)
                                ) {
                                  // TODO Calculate from VUSD price
                                  return previousValue + claimValue
                                }
                                return previousValue
                              },
                              0
                            )
                          ),
                          symbol: 'VUSD',
                        },
                      ]
                    : []
                ),
              },
              {
                id: 'collateralToVessel',
                label: 'Collateral to Vessel',
                value: getFormattedCurrency(
                  claimableAssets.reduce((previousValue, { claimValue }, i) => {
                    if (
                      checkedAssetIndexes.has(i) &&
                      checkedToVesselIndexes.has(i)
                    ) {
                      // TODO Calculate from VUSD price
                      return previousValue + claimValue
                    }
                    return previousValue
                  }, 0)
                ),
                symbol: 'USD',
                tooltip: 'Some Tooltip',
                hidden: checkedToVesselIndexes.size === 0,
                subItems: claimableAssets.reduce(
                  (previousValue, { amount, name }, i) => {
                    if (
                      checkedAssetIndexes.has(i) &&
                      checkedToVesselIndexes.has(i)
                    ) {
                      previousValue.push({
                        id: name,
                        value: amount,
                        symbol: name,
                      })
                    }
                    return previousValue
                  },
                  []
                ),
              },
              {
                id: 'totalProfitLoss',
                label: 'Total P/L',
                value: `+${getFormattedCurrency(
                  getTotalFromRowIndexes(
                    claimableAssets,
                    checkedAssetIndexes,
                    'profitLoss'
                  )
                )}`,
                symbol: 'USD',
                tooltip: 'Some Tooltip',
                color: 'green',
              },
              {
                id: 'grvtRewards',
                label: 'GRVT Rewards',
                value: getFormattedCurrency(
                  getTotalFromRowIndexes(
                    claimableAssets,
                    checkedAssetIndexes,
                    'grvtRewards'
                  )
                ),
                symbol: 'GRVT',
                tooltip: 'Some Tooltip',
              },
            ]}
            actions={
              checkedToVusdIndexes.size > 0
                ? [
                    {
                      id: 'poolVusd',
                      label: 'Pool VUSD',
                      tooltip: 'Some Tooltip',
                      onChange: () => {
                        console.log(123)
                      },
                    },
                  ]
                : []
            }
            additionalItems={[
              {
                id: 'grvtApr',
                label: 'GRVT APR',
                value: '7.00',
                symbol: '%',
                tooltip: 'Some Tooltip',
              },
              {
                id: 'liquidationBonus',
                label: 'Liquidation Bonus',
                value: '10.00',
                symbol: '%',
                tooltip: 'Some Tooltip',
              },
            ]}
            proceedText="Claim"
            onProceed={() => {
              //Proceed
            }}
          />
        </SimpleGrid>
      )}
    </>
  )
}

export default memo(PoolClaim)
