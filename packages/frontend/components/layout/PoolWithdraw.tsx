import { memo, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Box, FormControl, SimpleGrid } from '@chakra-ui/react'
import CurrencyInput from '../CurrencyInput'
import Summary from '../Summary'
import Alert from '../Alert'
import { getCurrency, getFormattedCurrency } from '../../utils/currency'

type PoolWithdrawProps = {
  totalDeposit: number
  poolTvl: number
}

type FormData = {
  withdrawalAmount: null | number
}

/**
 * Component
 */
function PoolWithdraw({
  totalDeposit,
  poolTvl,
}: PoolWithdrawProps): JSX.Element {
  const [availableToWithdraw, setAvailableToWithdraw] = useState(totalDeposit)
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      withdrawalAmount: null,
    },
  })
  const withdrawalAmount = watch('withdrawalAmount', 0)

  function onSubmit() {
    //console.log(values)
  }

  useEffect(() => {
    if (withdrawalAmount == null || withdrawalAmount <= 0) {
      setAvailableToWithdraw(totalDeposit)
    } else {
      setAvailableToWithdraw(totalDeposit - withdrawalAmount)
    }
  }, [withdrawalAmount])

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
          name="withdrawalAmount"
          render={({ field: { onChange, ...rest } }) => (
            <FormControl marginBottom="50px">
              <CurrencyInput
                name="withdrawalAmount"
                currency="VUSD"
                label="Amount"
                decimals={2}
                available={getFormattedCurrency(totalDeposit, 2)}
                isAllowed={(value) => {
                  return value == null || value <= totalDeposit
                }}
                onValueChange={onChange}
                onClickPercentage={(percentage) => {
                  onChange(getCurrency(totalDeposit * percentage))
                }}
              />
            </FormControl>
          )}
        />
      </form>
      <Box>
        {withdrawalAmount == null ? (
          <Alert status="info">WITHDRAWAL_MESSAGE_HERE</Alert>
        ) : (
          <Summary
            items={[
              {
                id: 'withdrawalAmount',
                label: 'Withdrawal Amount',
                value: getFormattedCurrency(withdrawalAmount),
                symbol: 'VUSD',
                tooltip: 'Some Tooltip',
              },
              {
                id: 'remainingDeposit',
                label: 'Remaining Deposit',
                value: getFormattedCurrency(totalDeposit - withdrawalAmount),
                symbol: 'VUSD',
                tooltip: 'Some Tooltip',
              },
              {
                id: 'newPoolShare',
                label: 'New Pool Share',
                value: (
                  (100 * (totalDeposit - withdrawalAmount)) /
                  poolTvl
                ).toFixed(6),
                symbol: '%',
                tooltip: 'Some Tooltip',
              },
              {
                id: 'newPoolTvl',
                label: 'New Pool TVL',
                value: getFormattedCurrency(poolTvl - withdrawalAmount),
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
            proceedText="Withdraw"
            onProceed={() => {
              //Proceed
            }}
          />
        )}
      </Box>
    </SimpleGrid>
  )
}

export default memo(PoolWithdraw)
