import { useEffect, useState } from 'react'
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
function VesselBorrow(): JSX.Element {
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
  const watchCollateral = watch('collateral', 0)
  const WALLET_ETH = 100000.55

  function onSubmit() {
    //console.log(values)
  }

  useEffect(() => {
    if (watchCollateral == null || watchCollateral <= 0) {
      setValue('borrow', '')
      setMaxBorrowAmount(0)
    } else {
      setMaxBorrowAmount(watchCollateral * 0.9)
    }
  }, [watchCollateral])

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
                available={getFormattedCurrency(WALLET_ETH, 6)}
                isAllowed={(values) => {
                  const { value } = values

                  return value <= WALLET_ETH
                }}
                onValueChange={(values) => {
                  onChange(values.floatValue)
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
        {watchCollateral > 0 && (
          <Controller
            control={control}
            name="borrow"
            render={({ field }) => (
              <FormControl marginBottom="40px">
                <CurrencyInput
                  currency="VUSD"
                  label="Borrow Amount"
                  decimals={2}
                  available={getFormattedCurrency(maxBorrowAmount, 2)}
                  isAllowed={(values) => {
                    const { value } = values

                    return value <= maxBorrowAmount
                  }}
                  {...field}
                />
              </FormControl>
            )}
          />
        )}
        <Button type="submit">Borrow</Button>
      </form>
      <Box>
        <Summary />
      </Box>
    </>
  )
}

export default VesselBorrow
