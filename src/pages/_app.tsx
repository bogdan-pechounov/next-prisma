import Navbar from '@/components/Navbar'
import { store } from '@/lib/store/store'
import '@/styles/globals.css'
import 'swiper/css'
import { theme } from '@/lib/theme'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import Box from '@mui/material/Box'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* App */}
          <Box mb={2}>
            <Navbar />
          </Box>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  )
}
