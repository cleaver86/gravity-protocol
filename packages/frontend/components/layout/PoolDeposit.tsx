import { memo, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Box, FormControl, SimpleGrid } from '@chakra-ui/react'
import CurrencyInput from '../CurrencyInput'
import Summary from '../Summary'
import Alert from '../Alert'
import { getCurrency, getFormattedCurrency } from '../../utils/currency'

type Props = {
  vusdBalance: number
  totalDeposit: number
  poolTvl: number
}

type FormData = {
  depositedAmount: null | number
}

/**
 * Component
 */
function PoolDeposit({
  vusdBalance,
  totalDeposit,
  poolTvl,
}: Props): JSX.Element {
  const [availableVusd, setAvailableVusd] = useState(vusdBalance)
  const { control, handleSubmit, watch } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      depositedAmount: null,
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
  }, [depositedAmount, vusdBalance])

  return (
    <SimpleGrid
      columns={{ sm: 1, lg: 2 }}
      spacing={{ base: 10, '2xl': 20 }}
      gridGap={{ base: 'none', lg: '2.5rem' }}
      marginBottom="90px"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Controller
          control={control}
          name="depositedAmount"
          render={({ field: { onChange } }) => (
            <FormControl marginBottom="50px">
              <CurrencyInput
                name="depositedAmount"
                currency="VUSD"
                label="Amount"
                decimals={2}
                available={getFormattedCurrency(availableVusd, 2)}
                isAllowed={(value) => {
                  return value == null || value <= vusdBalance
                }}
                onValueChange={onChange}
                onClickPercentage={(percentage) => {
                  onChange(getCurrency(vusdBalance * percentage))
                }}
              />
            </FormControl>
          )}
        />
      </form>
      <Box>
        {depositedAmount == null ? (
          <Alert status="info">Deposit VUSD to begin purchasing assets</Alert>
        ) : (
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
