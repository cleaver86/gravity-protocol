import { memo, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  Text,
} from '@chakra-ui/react'
import Label from '../Label'
import CurrencyInput from '../CurrencyInput'
import LeverageSlider from '../LeverageSlider'
import Summary from '../Summary'
import { getFormattedCurrency } from '../../utils/currency'

/**
 * Component
 */
function VesselBorrow({ name, balance, price, maxLoanToValue }): JSX.Element {
  const [availableCollateral, setAvailableCollateral] = useState(balance)
  const [maxBorrowAmount, setMaxBorrowAmount] = useState(0)
  const [borrowMode, setBorrowMode] = useState('normal')
  const [leverage, setLeverage] = useState(0.0)
  const { control, handleSubmit, setValue, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      collateral: '',
      borrow: '',
    },
  })
  const depositedCollateral = watch('collateral', 0)
  const borrow = watch('borrow', 0)

  function onSubmit() {
    //console.log(values)
  }

  useEffect(() => {
    if (depositedCollateral == null || depositedCollateral <= 0) {
      setAvailableCollateral(balance)
      setMaxBorrowAmount(0)
    } else {
      setAvailableCollateral(balance - depositedCollateral)
      setMaxBorrowAmount(depositedCollateral * price * maxLoanToValue)
    }

    setValue('borrow', '')
  }, [depositedCollateral, balance, price, name, setValue])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Controller
          control={control}
          name="collateral"
          render={({ field: { onChange, ...rest } }) => (
            <FormControl marginBottom="40px">
              <CurrencyInput
                currency="ETH"
                label="Deposit Collateral"
                decimals={6}
                available={getFormattedCurrency(availableCollateral, 6)}
                isAllowed={(values) => {
                  const { value } = values

                  return value <= balance
                }}
                onValueChange={(values) => {
                  onChange(values.floatValue)
                }}
                onClickPercentage={(percentage) => {
                  onChange(balance * percentage)
                }}
                {...rest}
              />
            </FormControl>
          )}
        />
        <Box marginBottom="40px">
          <Label marginBottom="20px">Borrow Mode</Label>
          <Flex>
            <ButtonGroup isAttached variant="outline">
              <Button
                variant={borrowMode === 'normal' ? 'solid' : 'outline'}
                borderRadius="5px"
                fontWeight="medium"
                onClick={() => {
                  setBorrowMode('normal')
                }}
              >
                Normal
              </Button>
              <Button
                variant={borrowMode === 'leverage' ? 'solid' : 'outline'}
                borderRadius="5px"
                fontWeight="medium"
                onClick={() => {
                  setBorrowMode('leverage')
                }}
              >
                Leverage
              </Button>
            </ButtonGroup>

            <Text alignSelf="center" marginLeft="auto">
              {leverage}X Leverage
            </Text>
          </Flex>
          {borrowMode === 'leverage' && (
            <LeverageSlider onChange={(val) => setLeverage(parseFloat(val))} />
          )}
        </Box>
        {depositedCollateral > 0 && (
          <Controller
            control={control}
            name="borrow"
            render={({ field: { onChange, ...rest } }) => (
              <FormControl marginBottom="40px">
                <CurrencyInput
                  currency="VUSD"
                  label="Borrow Amount"
                  decimals={2}
                  available={getFormattedCurrency(maxBorrowAmount - borrow, 2)}
                  isAllowed={(values) => {
                    const { value } = values

                    return value <= maxBorrowAmount - borrow
                  }}
                  onValueChange={(values) => {
                    onChange(values.floatValue)
                  }}
                  onClickPercentage={(percentage) => {
                    onChange(maxBorrowAmount * percentage)
                  }}
                  {...rest}
                />
              </FormControl>
            )}
          />
        )}
        <Button type="submit">Borrow</Button>
      </form>
      <Box>
        {/* {borrow > 0 && ( */}
        <Summary
          received={borrow}
          collateralPrice={price}
          collateralUnits={depositedCollateral}
          maxLoanToValue={maxLoanToValue}
        />
        {/* )} */}
      </Box>
    </>
  )
}

export default memo(VesselBorrow)
