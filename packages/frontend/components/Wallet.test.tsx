import { utils } from 'ethers'
import { useMediaQuery } from '@chakra-ui/react'
import { render, screen, within, waitFor } from '../test-utils'
import userEvent from '@testing-library/user-event'
import {
  WALLET_PROVIDER_METAMASK,
  TOKENS,
  WALLET_PROVIDER_COINBASE,
  WALLET_PROVIDER_WALLETCONNECT,
} from '../constants'
import Wallet from './Wallet'

const MOCK_ACCOUNT_LONG = '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf'
const MOCK_TOKEN_BALANCE = '1.1234567'
const MOCK_TOKEN_BALANCE_BIG_NUMBER = utils.parseEther(MOCK_TOKEN_BALANCE)
const MOCK_TOKEN_USD_PRICE = 1000.75
const MOCK_TOKEN_ETH_PRICE = 1

const FORMATTED_ACCOUNT_SHORT = '0xf61B...9EEf'
const FORMATTED_BALANCE = '1.123457'
const FORMATTED_PRICE = '$1,000.75'
const FORMATTED_TOKEN_TOTAL = '$1,124.30'
const FORMATTED_WALLET_TOTAL = '$5,621.50'

jest.mock('@usedapp/core', () => ({
  ...jest.requireActual('@usedapp/core'),
  useEtherBalance: jest
    .fn()
    .mockImplementation(() => MOCK_TOKEN_BALANCE_BIG_NUMBER),
  useTokenBalance: jest
    .fn()
    .mockImplementation(() => MOCK_TOKEN_BALANCE_BIG_NUMBER),
}))

jest.mock('../utils/prices', () => ({
  getEthUsdPrice: jest.fn(() => MOCK_TOKEN_USD_PRICE),
  getStethEthPrice: jest.fn(() => MOCK_TOKEN_ETH_PRICE),
  getRethUsdPrice: jest.fn(() => MOCK_TOKEN_USD_PRICE),
  getGrvtUsdPrice: jest.fn(() => MOCK_TOKEN_USD_PRICE),
  getVusdUsdPrice: jest.fn(() => MOCK_TOKEN_USD_PRICE),
}))

const RES_SMALLER_THAN_1280 = false

jest.mock('@chakra-ui/react', () => ({
  __esModule: true,
  ...jest.requireActual('@chakra-ui/react'),
  useMediaQuery: jest.fn(() => [RES_SMALLER_THAN_1280]),
}))

const mockUseMediaQuery = useMediaQuery as jest.Mock<boolean[]>

const renderOptions = {
  wrapperProps: { account: MOCK_ACCOUNT_LONG },
}

describe('Wallet', () => {
  test('Should match snapshot', async () => {
    const { container } = render(
      <Wallet
        name={WALLET_PROVIDER_METAMASK}
        account={MOCK_ACCOUNT_LONG}
        deactivate={jest.fn()}
      />,
      renderOptions
    )

    await screen.findByText(FORMATTED_WALLET_TOTAL)

    expect(container).toMatchSnapshot()
  })

  test('Icon for MetaMask provider should be displayed', async () => {
    render(
      <Wallet
        name={WALLET_PROVIDER_METAMASK}
        account={MOCK_ACCOUNT_LONG}
        deactivate={jest.fn()}
      />,
      renderOptions
    )

    await screen.findByText(FORMATTED_WALLET_TOTAL)

    expect(screen.getByAltText(WALLET_PROVIDER_METAMASK)).toBeInTheDocument()
  })

  test('Icon for Coinbase provider should be displayed', async () => {
    render(
      <Wallet
        name={WALLET_PROVIDER_COINBASE}
        account={MOCK_ACCOUNT_LONG}
        deactivate={jest.fn()}
      />,
      renderOptions
    )

    await screen.findByText(FORMATTED_WALLET_TOTAL)

    expect(screen.getByAltText(WALLET_PROVIDER_COINBASE)).toBeInTheDocument()
  })

  test('Icon for WalletConnect provider should be displayed', async () => {
    render(
      <Wallet
        name={WALLET_PROVIDER_WALLETCONNECT}
        account={MOCK_ACCOUNT_LONG}
        deactivate={jest.fn()}
      />,
      renderOptions
    )

    await screen.findByText(FORMATTED_WALLET_TOTAL)

    expect(
      screen.getByAltText(WALLET_PROVIDER_WALLETCONNECT)
    ).toBeInTheDocument()
  })

  test('Shortened address should be displayed', async () => {
    render(
      <Wallet
        name={WALLET_PROVIDER_METAMASK}
        account={MOCK_ACCOUNT_LONG}
        deactivate={jest.fn()}
      />,
      renderOptions
    )

    await screen.findByText(FORMATTED_WALLET_TOTAL)

    expect(screen.getByText(FORMATTED_ACCOUNT_SHORT)).toBeInTheDocument()
  })

  test('Clicking disconnect should invoke callback', async () => {
    const deactivate = jest.fn()

    render(
      <Wallet
        name={WALLET_PROVIDER_METAMASK}
        account={MOCK_ACCOUNT_LONG}
        deactivate={deactivate}
      />,
      renderOptions
    )

    await screen.findByText(FORMATTED_WALLET_TOTAL)

    const accountButton = screen.getByRole('button', {
      name: /metamask 0xf61B...9EEf/i,
    })

    await userEvent.click(accountButton)

    const disconnectButton = screen.getByRole('menuitem', {
      name: /Disconnect/i,
    })
    await userEvent.click(disconnectButton)

    expect(deactivate).toBeCalled()
  })

  test('Should not render content within accordion', async () => {
    render(
      <Wallet
        name={WALLET_PROVIDER_METAMASK}
        account={MOCK_ACCOUNT_LONG}
        deactivate={jest.fn()}
      />,
      renderOptions
    )

    await screen.findByText(FORMATTED_WALLET_TOTAL)

    const accordionButton = screen.queryByRole('button', {
      name: /Wallet/i,
    })

    expect(accordionButton).not.toBeInTheDocument()
  })

  test('Balances for each token should be displayed and rounded to 6 decimals', async () => {
    render(
      <Wallet
        name={WALLET_PROVIDER_METAMASK}
        account={MOCK_ACCOUNT_LONG}
        deactivate={jest.fn()}
      />,
      renderOptions
    )

    await screen.findByText(FORMATTED_WALLET_TOTAL)

    for (const token in TOKENS) {
      const balanceText = screen.getByTestId(`${token}-balance`)
      within(balanceText).getByText(FORMATTED_BALANCE)
    }
  })

  test('Prices for each token should be displayed', async () => {
    render(
      <Wallet
        name={WALLET_PROVIDER_METAMASK}
        account={MOCK_ACCOUNT_LONG}
        deactivate={jest.fn()}
      />,
      renderOptions
    )

    await screen.findByText(FORMATTED_WALLET_TOTAL)

    for (const token in TOKENS) {
      const balanceText = screen.getByTestId(`${token}-price`)
      within(balanceText).getByText(FORMATTED_PRICE)
    }
  })

  test('Buy link should be rendered for each token', async () => {
    render(
      <Wallet
        name={WALLET_PROVIDER_METAMASK}
        account={MOCK_ACCOUNT_LONG}
        deactivate={jest.fn()}
      />,
      renderOptions
    )

    await screen.findByText(FORMATTED_WALLET_TOTAL)

    for (const token in TOKENS) {
      const buyLink = screen.getByTestId(`${token}-buy`)
      expect(buyLink).toHaveAttribute('href', `https://curve.fi/${token}`)
    }
  })

  test('Totals for each token should be displayed', async () => {
    render(
      <Wallet
        name={WALLET_PROVIDER_METAMASK}
        account={MOCK_ACCOUNT_LONG}
        deactivate={jest.fn()}
      />,
      renderOptions
    )

    await screen.findByText(FORMATTED_WALLET_TOTAL)

    for (const token in TOKENS) {
      const balanceText = screen.getByTestId(`${token}-total`)
      within(balanceText).getByText(FORMATTED_TOKEN_TOTAL)
    }
  })

  test('Wallet total should be displayed', async () => {
    render(
      <Wallet
        name={WALLET_PROVIDER_METAMASK}
        account={MOCK_ACCOUNT_LONG}
        deactivate={jest.fn()}
      />,
      renderOptions
    )

    await screen.findByText(FORMATTED_WALLET_TOTAL)
  })
})

describe('Wallet max width 1280', () => {
  // TODO Figure out how to do snapshots with dynamically generated ids from Chakra UI
  test.skip('Should match snapshot', async () => {
    mockUseMediaQuery.mockReturnValue([true])

    const { container } = render(
      <Wallet
        name={WALLET_PROVIDER_METAMASK}
        account={MOCK_ACCOUNT_LONG}
        deactivate={jest.fn()}
      />,
      renderOptions
    )

    await screen.findByText(FORMATTED_WALLET_TOTAL)

    expect(container).toMatchSnapshot()
  })

  test('Shortened address should be displayed', async () => {
    mockUseMediaQuery.mockReturnValue([true])

    render(
      <Wallet
        name={WALLET_PROVIDER_METAMASK}
        account={MOCK_ACCOUNT_LONG}
        deactivate={jest.fn()}
      />,
      renderOptions
    )

    await screen.findByText(FORMATTED_WALLET_TOTAL)

    expect(screen.getByText(FORMATTED_ACCOUNT_SHORT)).toBeVisible()
  })

  test('Clicking disconnect should invoke callback', async () => {
    mockUseMediaQuery.mockReturnValue([true])
    const deactivate = jest.fn()

    render(
      <Wallet
        name={WALLET_PROVIDER_METAMASK}
        account={MOCK_ACCOUNT_LONG}
        deactivate={deactivate}
      />,
      renderOptions
    )

    await screen.findByText(FORMATTED_WALLET_TOTAL)

    const accountButton = screen.getByRole('button', {
      name: /metamask 0xf61B...9EEf/i,
    })

    await userEvent.click(accountButton)

    const disconnectButton = screen.getByRole('menuitem', {
      name: /Disconnect/i,
    })
    await userEvent.click(disconnectButton)

    expect(deactivate).toBeCalled()
  })

  test('Content should be initially hidden within collapsed accordion', async () => {
    mockUseMediaQuery.mockReturnValue([true])

    render(
      <Wallet
        name={WALLET_PROVIDER_METAMASK}
        account={MOCK_ACCOUNT_LONG}
        deactivate={jest.fn()}
      />,
      renderOptions
    )

    await screen.findByText(FORMATTED_WALLET_TOTAL)

    const accordionButton = screen.getByRole('button', {
      name: /Wallet/i,
    })

    const balanceText = screen.getByText(FORMATTED_WALLET_TOTAL)

    expect(accordionButton).toHaveAttribute('aria-expanded', 'false')
    expect(balanceText).toBeInTheDocument()
    expect(balanceText).not.toBeVisible()
  })

  test('Content should be displayed when accordion is expanded', async () => {
    mockUseMediaQuery.mockReturnValue([true])

    render(
      <Wallet
        name={WALLET_PROVIDER_METAMASK}
        account={MOCK_ACCOUNT_LONG}
        deactivate={jest.fn()}
      />,
      renderOptions
    )

    const accordionButton = screen.getByRole('button', {
      name: /Wallet/i,
    })

    await userEvent.click(accordionButton)
    const balanceText = screen.getByText(FORMATTED_WALLET_TOTAL)

    await waitFor(() => {
      try {
        expect(balanceText).toBeVisible()
        expect(accordionButton).toHaveAttribute('aria-expanded', 'true')
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    })
  })
})
