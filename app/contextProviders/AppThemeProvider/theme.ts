import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles'
import { PaletteType } from '@material-ui/core'

import red from '@material-ui/core/colors/red'
import { getTypographyOptions } from './typography'
import { UseWindowSizeReturn } from '@hooks/useWindowSize'

export const SM = 400
export const MD = 700
export const LG = 900
export const XL = 1024
export const XXL = 1320

const lightTheme: ThemeOptions = {
  palette: {
    type: 'light',
    isDark: false,
    primary: {
      main: '#fe2c55'
    },
    secondary: {
      main: '#2c2c2c'
    },
    error: {
      main: red.A700
    },
    gradients: {
      primary: 'linear-gradient(to left, #fa7268, #fe2c55)'
    },
    themeText: {
      black: '#000000',
      white: '#ffffff',
      themeGray: '#444444',
      themeBlack: '#000000',
      themeWhite: '#ffffff'
    },
    background: {
      default: '#f7f7f7',
      paper: '#ffffff'
    }
  },
  breakpoints: {
    values: { xs: SM, sm: MD, md: LG, lg: XL, xl: XXL }
  },
  overrides: {
    MuiBackdrop: { root: { backgroundColor: 'rgba(0,0,0,0.8)' } },
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#151A21'
      }
    }
  }
}

const darkTheme: ThemeOptions = {
  ...lightTheme,
  palette: {
    ...lightTheme.palette,
    isDark: true,
    type: 'dark',
    secondary: {
      main: '#cbcad0'
    },
    themeText: {
      ...lightTheme.palette!.themeText,
      themeGray: '#aaaaaa',
      themeBlack: '#ffffff',
      themeWhite: '#000000'
    },
    background: {
      default: '#0B0E11',
      paper: '#151A21'
    },
    gradients: lightTheme.palette!.gradients
  }
}

export const getTheme = (type: PaletteType, windowSize: UseWindowSizeReturn) => {
  const theme = type === 'light' ? lightTheme : darkTheme
  const themeWithTypography = { ...theme, typography: getTypographyOptions(windowSize) }
  return createMuiTheme(themeWithTypography)
}
