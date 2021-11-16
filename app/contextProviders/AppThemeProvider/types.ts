import { Theme } from '@material-ui/core'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    isDark: boolean
    gradients: {
      primary: string
    }
    themeText: {
      black: string
      white: string
      themeGray: string
      themeBlack: string
      themeWhite: string
    }
  }

  interface PaletteOptions {
    isDark: boolean
    gradients: {
      primary: string
    }
    themeText: {
      black: string
      white: string
      themeGray: string
      themeBlack: string
      themeWhite: string
    }
  }
}
