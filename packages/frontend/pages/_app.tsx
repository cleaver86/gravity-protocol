import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import theme from '../theme'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { Mainnet, DAppProvider, Config } from '@usedapp/core'
import type { AppProps } from 'next/app'
import React from 'react'
// import { MulticallContract } from '../artifacts/contracts/contractAddress'
import { useApollo } from '../lib/apolloClient'
import Layout from '../components/layout/Layout'

// scaffold-eth's INFURA_ID, SWAP IN YOURS FROM https://infura.io/dashboard/ethereum
// export const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: 'https://rpc.ankr.com/eth',
  },
}
// const config: Config = {
//   readOnlyUrls: {
//     [ChainId.Ropsten]: `https://ropsten.infura.io/v3/${INFURA_ID}`,
//     [ChainId.Hardhat]: 'http://localhost:8545',
//     [ChainId.Localhost]: 'http://localhost:8545',
//   },
//   networks: [
//     ChainId.Mainnet,
//     ChainId.Goerli,
//     ChainId.Kovan,
//     ChainId.Rinkeby,
//     ChainId.Ropsten,
//     ChainId.xDai,
//     ChainId.Localhost,
//     ChainId.Hardhat,
//   ],
//   multicallAddresses: {
//     ...MulticallAddresses,
//     [ChainId.Hardhat]: MulticallContract,
//     [ChainId.Localhost]: MulticallContract,
//   },
//   refresh: 'everyBlock'
// }

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const apolloClient = useApollo(pageProps)
  return (
    <ApolloProvider client={apolloClient}>
      <DAppProvider config={config}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </DAppProvider>
    </ApolloProvider>
  )
}

export default MyApp
