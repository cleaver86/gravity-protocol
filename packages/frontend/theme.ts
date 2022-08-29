import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({ 
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    gray: {
      300: '#847D9F',
      500: '#3A3060'
    },
    purple: {
      100: '#D079FF',
      300: '#4A3696',
      500: '#332567',
      700: '#251D32',
      900: '#0C0911'
    }
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  fontWeights: {
    medium: 500
  },
  components: {
    Button: {
      sizes: {
        md: {
          borderRadius: '20px'
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'purple.700'
      },
      a: {
        color: 'purple.100 !important',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  }
})

export default theme