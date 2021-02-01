import { ChakraProvider, ColorModeProvider} from '@chakra-ui/react'
import theme from '../theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider options={{
        initialColorMode: "light",
        useSystsemColorMode: true
      }}>
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp