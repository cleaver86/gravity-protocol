import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { WalletProvider } from './providers/WalletProvider'
import theme from './theme'

type Providers = {
  children: React.ReactNode
  account?: string
}

const AllTheProviders = ({ children, account }: Providers) => {
  if (!account) {
    throw new Error('AllTheProviders: account must be provided')
  }

  return (
    <ChakraProvider theme={theme}>
      <WalletProvider account={account}>{children}</WalletProvider>
    </ChakraProvider>
  )
}

type Options = Omit<RenderOptions, 'wrapper'> & {
  wrapperProps: {
    account?: string
  }
}

const customRender = (ui: ReactElement, options?: Options) => {
  return render(ui, {
    wrapper: (props) => (
      <AllTheProviders {...props} {...options?.wrapperProps} />
    ),
    ...options,
  })
}

export * from '@testing-library/react'
export { customRender as render }
