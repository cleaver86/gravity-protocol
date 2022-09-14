import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  Flex,
  FormErrorMessage,
  FormControl,
  HStack,
  SimpleGrid,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Text,
} from '@chakra-ui/react'
import IconHeading from '../IconHeading'
import Label from '../Label'
import MonetaryText from '../MonetaryText'
import RatioChart from '../RatioChart'
import RatioCard from '../RatioCard'
import LoanValueChart from '../LoanValueChart'
import CurrencyInput from '../CurrencyInput'
import { getFormattedCurrency } from '../../utils/currency'

/**
 * Component
 */
function Vessel({ name, icon }): JSX.Element {
  const [maxBorrowAmount, setMaxBorrowAmount] = useState(0)
  const { control, handleSubmit, setValue, watch, formState } = useForm({
    mode: 'onChange',
    defaultValues: {
      collateral: '',
      borrow: '',
    },
  })
  const watchCollateral = watch('collateral', 0)
  const WALLET_ETH = 100000.55

  function onSubmit(values) {
    console.log(values)
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
      <Box marginBottom="100px">
        <IconHeading icon={icon} isFontAwesome={false}>
          {`${name} Vessel`}
        </IconHeading>
      </Box>
      <SimpleGrid templateColumns="2fr 1fr" spacing={10} marginBottom="90px">
        <Box>
          <Box marginBottom="60px">
            <Label>Available to Borrow</Label>
            <MonetaryText currency="VUSD" fontSize="4xl">
              {216000.0}
            </MonetaryText>
          </Box>
          <Box marginBottom="10px">
            <RatioChart />
          </Box>
          <HStack spacing="3">
            <RatioCard
              currency="ETH"
              label={`Wallet (${name})`}
              color="purple.300"
            >
              {240000.0}
            </RatioCard>
            <RatioCard
              currency="ETH"
              label={`Collateral (${name})`}
              color="green"
            >
              {0.0}
            </RatioCard>
            <RatioCard currency="VUSD" label="Debt" color="orange">
              {0.0}
            </RatioCard>
          </HStack>
        </Box>
        <Box>
          <Label align="center" info>
            Vessel LTV
          </Label>
          <Text
            fontSize="4xl"
            fontWeight="medium"
            textAlign="center"
            color="green"
          >
            10.00%
          </Text>
          <Flex marginTop="-70px">
            <LoanValueChart />
          </Flex>
          <Box marginTop="-162px">
            <Label align="center" info>
              System LTV
            </Label>
            <Text
              fontSize="2xl"
              fontWeight="medium"
              textAlign="center"
              color="green"
            >
              20.00%
            </Text>
          </Box>
        </Box>
      </SimpleGrid>
      <Tabs colorScheme="purple">
        <TabList
          borderBottomWidth="1px"
          borderColor="gray.500"
          marginBottom="40px"
        >
          <Tab minWidth="200px" borderBottomWidth="3px" fontWeight="medium">
            Borrow
          </Tab>
          <Tab minWidth="200px" borderBottomWidth="3px" fontWeight="medium">
            Repay
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid
              templateColumns="1fr 1fr"
              spacing={10}
              marginBottom="90px"
            >
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
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default Vessel
