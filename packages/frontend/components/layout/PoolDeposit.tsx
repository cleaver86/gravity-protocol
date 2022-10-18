import { memo, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Box, FormControl, SimpleGrid } from '@chakra-ui/react'
import CurrencyInput from '../CurrencyInput'
import Summary from '../Summary'
import Alert from '../Alert'
import { getCurrency, getFormattedCurrency } from '../../utils/currency'

/**
 * Component
 */
function PoolDeposit({ vusdBalance, totalDeposit, poolTvl }): JSX.Element {
  const [availableVusd, setAvailableVusd] = useState(vusdBalance)
  const { control, handleSubmit, setValue, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      depositedAmount: '',
    },
  })
  const depositedAmount = watch('depositedAmount', 0)

  function onSubmit() {
    //console.log(values)
  }

  useEffect(() => {
    if (depositedAmount == null || depositedAmount <= 0) {
      setAvailableVusd(vusdBalance)
    } else {
      setAvailableVusd(vusdBalance - depositedAmount)
    }
  }, [depositedAmount])

  return (
    <SimpleGrid
      columns={{ sm: 1, lg: 2 }}
      spacing={[{ base: 10, '2xl': 20 }]}
      gridGap={[{ base: 'none', lg: '2.5rem' }]}
      marginBottom="90px"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Controller
          control={control}
          name="depositedAmount"
          render={({ field: { onChange, ...rest } }) => (
            <FormControl marginBottom="50px">
              <CurrencyInput
                currency="VUSD"
                label="Amount"
                decimals={2}
                available={getFormattedCurrency(availableVusd, 2)}
                isAllowed={(values) => {
                  const { value } = values

                  return value <= vusdBalance
                }}
                onValueChange={(values) => {
                  onChange(values.floatValue)
                }}
                onClickPercentage={(percentage) => {
                  onChange(getCurrency(vusdBalance * percentage))
                }}
                {...rest}
              />
            </FormControl>
          )}
        />
      </form>
      <Box>
        {(!depositedAmount && (
          <Alert status="info">Deposit VUSD to begin purchasing assets</Alert>
        )) || (
          <Summary
            items={[
              {
                id: 'depositAmount',
                label: 'Deposit Amount',
                value: getFormattedCurrency(depositedAmount),
                symbol: 'VUSD',
                tooltip: 'Some Tooltip',
              },
              {
                id: 'totalDeposit',
                label: 'Total Deposit',
                value: getFormattedCurrency(totalDeposit + depositedAmount),
                symbol: 'VUSD',
                tooltip: 'Some Tooltip',
              },
              {
                id: 'newPoolShare',
                label: 'New Pool Share',
                value: (
                  (100 * (totalDeposit + depositedAmount)) /
                  poolTvl
                ).toFixed(6),
                symbol: '%',
                tooltip: 'Some Tooltip',
              },
              {
                id: 'newPoolTvl',
                label: 'New Pool TVL',
                value: getFormattedCurrency(poolTvl + depositedAmount),
                symbol: 'VUSD',
                tooltip: 'Some Tooltip',
              },
            ]}
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
            proceedText="Deposit"
            onProceed={() => {
              //Proceed
            }}
          />
        )}
      </Box>
    </SimpleGrid>
  )
}

export default memo(PoolDeposit)
