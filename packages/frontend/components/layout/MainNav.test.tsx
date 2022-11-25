import React from 'react'
import { useMediaQuery } from '@chakra-ui/react'
import {
  render,
  screen,
  within,
  waitFor,
  waitForElementToBeRemoved,
} from '../../test-utils'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'
import MainNav from './MainNav'

const MOCK_ACCOUNT_LONG = '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf'

jest.mock('next/router', () => require('next-router-mock'))
jest.mock('next/dist/client/router', () => require('next-router-mock'))
jest.mock('@chakra-ui/react', () => ({
  __esModule: true,
  ...jest.requireActual('@chakra-ui/react'),
  useMediaQuery: jest.fn(() => [false]),
}))

const mockUseMediaQuery = useMediaQuery as jest.Mock<boolean[]>

const renderOptions = {
  wrapperProps: { account: MOCK_ACCOUNT_LONG },
}

const NAV_ITEM_LABELS = ['Home', 'Borrow', 'Pool', 'Stake', 'Docs']

describe('MainNav at 1536px or wider (Icons with text)', () => {
  beforeEach(() => {
    mockUseMediaQuery.mockReturnValueOnce([true]).mockReturnValueOnce([true])
    mockRouter.setCurrentUrl('/')
  })

  test('Should render main navigation items with the proper hrefs', async () => {
    render(<MainNav openDrawer={false} onOpenDrawer={jest.fn} />, renderOptions)

    const navigation = screen.getByRole('navigation')
    const navItems = within(navigation).getAllByRole('link')

    expect(navItems[0]).toHaveAttribute('href', '/')
    expect(navItems[1]).toHaveAttribute('href', '/borrow')
    expect(navItems[2]).toHaveAttribute('href', '/pool')
    expect(navItems[3]).toHaveAttribute('href', '/stake')
    expect(navItems[4]).toHaveAttribute('href', '/docs')
  })

  test('Nav items should not have tooltips', async () => {
    render(<MainNav openDrawer={false} onOpenDrawer={jest.fn} />, renderOptions)

    const navItems = ['Home', 'Borrow', 'Pool', 'Stake', 'Docs']

    for (let i = 0; i <= navItems.length - 1; i++) {
      const tooltipContainer = screen.getByTestId(
        `${navItems[i].toLowerCase()}-tooltip-container`
      )
      await userEvent.hover(tooltipContainer)

      await waitFor(() => {
        const tooltip = screen.queryByRole('tooltip')
        expect(tooltip).not.toBeInTheDocument()
      })
    }
  })
})

describe('MainNav between 1280px and 1536px wide (Icon Bar)', () => {
  beforeEach(() => {
    mockUseMediaQuery.mockReturnValueOnce([true]).mockReturnValueOnce([false])
    mockRouter.setCurrentUrl('/')
  })

  test.skip('Should match snapshot', async () => {
    const { container } = render(
      <MainNav openDrawer={false} onOpenDrawer={jest.fn} />,
      renderOptions
    )

    expect(container).toMatchSnapshot()
  })

  test('Should render main navigation items with the proper hrefs', async () => {
    render(<MainNav openDrawer={false} onOpenDrawer={jest.fn} />, renderOptions)

    const navigation = screen.getByRole('navigation')
    const navItems = within(navigation).getAllByRole('link')

    expect(navItems[0]).toHaveAttribute('href', '/')
    expect(navItems[1]).toHaveAttribute('href', '/borrow')
    expect(navItems[2]).toHaveAttribute('href', '/pool')
    expect(navItems[3]).toHaveAttribute('href', '/stake')
    expect(navItems[4]).toHaveAttribute('href', '/docs')
  })

  test('Nav items should have tooltips', async () => {
    render(<MainNav openDrawer={false} onOpenDrawer={jest.fn} />, renderOptions)

    for (let i = 0; i <= NAV_ITEM_LABELS.length - 1; i++) {
      const tooltipContainer = screen.getByTestId(
        `${NAV_ITEM_LABELS[i].toLowerCase()}-tooltip-container`
      )
      await userEvent.hover(tooltipContainer)
      const tooltip = await screen.findByRole('tooltip')

      expect(tooltip).toHaveTextContent(NAV_ITEM_LABELS[i])

      await userEvent.unhover(tooltipContainer)

      await waitForElementToBeRemoved(() => screen.queryByRole('tooltip'))
    }
  })
})

describe('MainNav at less than 1280px wide (Drawer with icons and text)', () => {
  beforeEach(() => {
    mockUseMediaQuery.mockReturnValueOnce([false])
    mockRouter.setCurrentUrl('/')
  })

  test('Should not render nav if drawer has not been opened', async () => {
    render(<MainNav openDrawer={false} onOpenDrawer={jest.fn} />, renderOptions)

    const drawerModal = screen.queryByRole('dialog')
    const navigation = screen.queryByRole('navigation')

    expect(drawerModal).not.toBeInTheDocument()
    expect(navigation).not.toBeInTheDocument()
  })

  test('Should render nav if drawer has been opened', async () => {
    render(<MainNav openDrawer={true} onOpenDrawer={jest.fn} />, renderOptions)

    const drawerModal = await screen.findByRole('dialog')
    const logoLink = screen.getAllByTestId('gravity-logo-link')
    const navigation = screen.getByRole('navigation')
    const navItems = within(navigation).getAllByRole('link')

    expect(drawerModal).toBeInTheDocument()
    expect(logoLink[0]).toHaveAttribute('href', '/')
    expect(logoLink[1]).toHaveAttribute('href', '/')
    expect(navItems[0]).toHaveAttribute('href', '/')
    expect(navItems[1]).toHaveAttribute('href', '/borrow')
    expect(navItems[2]).toHaveAttribute('href', '/pool')
    expect(navItems[3]).toHaveAttribute('href', '/stake')
    expect(navItems[4]).toHaveAttribute('href', '/docs')
  })

  test('Nav items should not have tooltips', async () => {
    render(<MainNav openDrawer={true} onOpenDrawer={jest.fn} />, renderOptions)

    await screen.findByRole('dialog')

    for (let i = 0; i <= NAV_ITEM_LABELS.length - 1; i++) {
      const tooltipContainer = screen.getByTestId(
        `${NAV_ITEM_LABELS[i].toLowerCase()}-tooltip-container`
      )
      await userEvent.hover(tooltipContainer)

      await waitFor(() => {
        const tooltip = screen.queryByRole('tooltip')
        expect(tooltip).not.toBeInTheDocument()
      })
    }
  })
})
