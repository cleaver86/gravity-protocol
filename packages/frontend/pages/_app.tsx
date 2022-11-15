import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import theme from '../theme'
import { ChakraProvider } from '@chakra-ui/react'
import { Mainnet, DAppProvider, Config } from '@usedapp/core'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: 'https://rpc.ankr.com/eth',
  },
  pollingInterval: 10000,
  notifications: {
    expirationPeriod: 1000,
    checkInterval: 1000,
  },
}

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <DAppProvider config={config}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </DAppProvider>
  )
}

export default MyApp
