import { generateTestingUtils } from 'eth-testing'
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from '../test-utils'
import userEvent from '@testing-library/user-event'
import { renderDAppHook } from '@usedapp/testing'
import { MultiCall, ERC20Mock } from '@usedapp/core'
import { WALLET_PROVIDER_METAMASK } from '../constants'
import Wallet from './Wallet'

const ACCOUNT_ADDRESS_LONG = '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf'
const ACCOUNT_ADDRESS_SHORT = '0xf61B...9EEf'
const AMOUNT_ONE_ETH = '0xde0b6b3a7640000'

describe('Wallet', () => {
  const testingUtils = generateTestingUtils({
    providerType: WALLET_PROVIDER_METAMASK,
  })
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
    // Manually inject the mocked provider in the window as MetaMask does
    global.window.ethereum = testingUtils.getProvider()
  })
  afterEach(() => {
    testingUtils.clearAllMocks()
  })

  test('Should match snapshot', async () => {
    testingUtils.mockConnectedWallet([ACCOUNT_ADDRESS_LONG])

    const { container } = render(
      <Wallet
        name={WALLET_PROVIDER_METAMASK}
        account={ACCOUNT_ADDRESS_LONG}
        deactivate={() => {}}
      />,
      {
        wrapperProps: { account: '0x51b1c97E8E1141D92fBdA8be2f592ffefe1e85f8' },
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('Shortened address should be displayed', async () => {
    testingUtils.mockConnectedWallet([ACCOUNT_ADDRESS_LONG])

    render(
      <Wallet
        name={WALLET_PROVIDER_METAMASK}
        account={ACCOUNT_ADDRESS_LONG}
        deactivate={() => {}}
      />,
      {
        wrapperProps: { account: '0x51b1c97E8E1141D92fBdA8be2f592ffefe1e85f8' },
      }
    )

    expect(screen.getByText(ACCOUNT_ADDRESS_SHORT)).toBeInTheDocument()
  })

  test('Clicking disconnect should invoke callback', async () => {
    testingUtils.mockConnectedWallet([ACCOUNT_ADDRESS_LONG])
    const deactivate = jest.fn()

    render(
      <Wallet
        name={WALLET_PROVIDER_METAMASK}
        account={ACCOUNT_ADDRESS_LONG}
        deactivate={deactivate}
      />,
      {
        wrapperProps: { account: '0x51b1c97E8E1141D92fBdA8be2f592ffefe1e85f8' },
      }
    )

    const accountButton = await screen.getByRole('button', {
      name: /metamask 0xf61B...9EEf/i,
    })

    await userEvent.click(accountButton)

    const disconnectButton = await screen.getByRole('menuitem', {
      name: /Disconnect/i,
    })
    await userEvent.click(disconnectButton)

    expect(deactivate).toBeCalled()
  })

  // test('Eth balance should be displayed', async () => {
  //   console.log(global.window.ethereum)
  //   testingUtils.mockReadonlyProvider()
  //   testingUtils.mockRequestAccounts([
  //     '0x51b1c97E8E1141D92fBdA8be2f592ffefe1e85f8',
  //   ])
  //   testingUtils.mockConnectedWallet([
  //     '0x51b1c97E8E1141D92fBdA8be2f592ffefe1e85f8',
  //   ])
  //   testingUtils.mockBalance(
  //     '0x51b1c97E8E1141D92fBdA8be2f592ffefe1e85f8',
  //     '0xde0b6b3a7640000'
  //   )
  //   console.log(global.window.ethereum)

  //   render(
  //     <Wallet
  //       name={WALLET_PROVIDER_METAMASK}
  //       account={'0x51b1c97E8E1141D92fBdA8be2f592ffefe1e85f8'}
  //       deactivate={() => {}}
  //     />,
  //     {
  //       wrapperProps: { account: '0x51b1c97E8E1141D92fBdA8be2f592ffefe1e85f8' },
  //     }
  //   )

  //   const ethBalanceText = await screen.getByTestId('ETH-balance')

  //   expect(ethBalanceText).toHaveTextContent('1')
  // })
})
