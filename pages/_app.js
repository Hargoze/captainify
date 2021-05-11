import { ChakraProvider, ColorModeProvider} from '@chakra-ui/react'
import theme from '../theme'


function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider options={{
        initialColorMode: "light",
        useSystsemColorMode: true
      }}>
        <SafeHydrate><Component {...pageProps} /></SafeHydrate>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp