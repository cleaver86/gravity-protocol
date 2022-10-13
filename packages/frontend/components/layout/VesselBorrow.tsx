import { memo, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import Label from '../Label'
import CurrencyInput from '../CurrencyInput'
import LeverageSlider from '../LeverageSlider'
import Summary from '../Summary'
import Alert from '../Alert'
import { getFormattedCurrency } from '../../utils/currency'

/**
 * Component
 */
function VesselBorrow({ name, balance, price, maxLoanToValue }): JSX.Element {
  const [availableCollateral, setAvailableCollateral] = useState(balance)
  const [maxBorrowAmount, setMaxBorrowAmount] = useState(0)
  const [borrowMode, setBorrowMode] = useState('normal')
  const [leverage, setLeverage] = useState(0)
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

  useEffect(() => {
    if (borrowMode === 'leverage') {
      setLeverage(1)
    } else {
      setLeverage(0)
    }
  }, [borrowMode])

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
          name="collateral"
          render={({ field: { onChange, ...rest } }) => (
            <FormControl marginBottom="50px">
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
        <Box marginBottom="50px">
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
            {leverage > 0 && (
              <Text alignSelf="center" marginLeft="auto">
                {leverage}X Leverage
              </Text>
            )}
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
              <FormControl marginBottom="50px">
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
      </form>
      <Box>
        {(!depositedCollateral && (
          <Alert status="info">Deposit collateral to start borrowing.</Alert>
        )) ||
          (!borrow && (
            <Alert status="info" marginTop={[{ base: 'none', lg: '140px' }]}>
              Select a borrow mode and amount.
            </Alert>
          )) ||
          (borrow > 0 && (
            <Summary
              received={borrow}
              collateralName={name}
              collateralPrice={price}
              collateralUnits={depositedCollateral}
              leverage={leverage}
              maxLoanToValue={maxLoanToValue}
            />
          ))}
      </Box>
    </SimpleGrid>
  )
}

export default memo(VesselBorrow)
