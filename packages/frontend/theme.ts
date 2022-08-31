import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    gray: {
      100: '#E7EBF0',
      200: '#BEBBC1',
      300: '#847D9F',
      500: '#3A3060',
    },
    purple: {
      100: '#D079FF',
      300: '#4A3696',
      500: '#332567',
      600: '#2D2041',
      700: '#251D32',
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
        bg: 'purple.700',
      },
    },
  },
})

export default theme
