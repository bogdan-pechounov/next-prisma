import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { theme } from '@/theme'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import Box from '@mui/material/Box'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box mb={2}>
        <Navbar />
      </Box>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
