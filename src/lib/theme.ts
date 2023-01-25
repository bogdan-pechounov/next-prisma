import { blue, lightBlue, blueGrey } from '@mui/material/colors'
import { createTheme, PaletteColorOptions } from '@mui/material/styles'

const primary: PaletteColorOptions = {
  100: '#cdd7e2',
  200: '#9bb0c6',
  300: '#6a88a9',
  400: '#38618d',
  500: '#063970',
  600: '#052e5a',
  700: '#042243',
  800: '#02172d',
  900: '#010b16',
  main: '#063970',
  light: '#38618d',
}

export const theme = createTheme({
  palette: {
    primary,
  },
  typography: {
    fontFamily: 'Yeseva One, cursive',
  },
})
