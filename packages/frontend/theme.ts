import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

const themeProps = {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    gray: {
      100: '#E7EBF0',
      200: '#BEBBC1',
      300: '#847D9F',
      500: '#3A2C53',
    },
    purple: {
      200: '#D079FF',
      300: '#D079FF',
      400: '#4A3696',
      500: '#332567',
      600: '#352451',
      700: '#2D2041',
      800: '#251D32',
      900: '#0C0911',
    },
    green: '#19F785',
    red: {
      100: '#FF505E',
      300: '#D32E3C',
    },
    orange: '#F7AB19',
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  fontWeights: {
    medium: 500,
  },
  components: {
    Button: {
      sizes: {
        md: {
          borderRadius: '20px',
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'purple.800',
      },
    },
  }
} 

const theme = extendTheme(themeProps, withDefaultColorScheme({ colorScheme: 'purple' }))

export default theme
