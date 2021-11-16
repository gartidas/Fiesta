import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import {
  CssBaseline,
  PaletteType,
  StylesProvider,
  Theme,
  ThemeProvider as MuiThemeProvider
} from '@material-ui/core'

import Hidden from '@elements/Hidden'
import GlobalStyles from './GlobalStyles'
import useWindowSize from '@hooks/useWindowSize'
import useLocalStorage from '@hooks/useLocalStorage'
import { getTheme } from '@contextProviders/AppThemeProvider/theme'

interface IAppThemeContextValue {
  switchTheme: () => void
  theme: Theme
  isDark: boolean
}

const AppThemeContext = createContext<IAppThemeContextValue>(null!)
export const useAppTheme = () => useContext(AppThemeContext)

const AppThemeProvider: FC = ({ children }) => {
  const [themeType, setThemeType] = useLocalStorage<PaletteType>('FIESTA.theme', 'light')
  const [isMounted, setIsMounted] = useState(false)
  const windowSize = useWindowSize()

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) jssStyles.parentElement?.removeChild(jssStyles)
  }, [])

  useEffect(() => setIsMounted(true), [])

  const switchTheme = useCallback(() => {
    setThemeType(prev => (prev === 'light' ? 'dark' : 'light'))
  }, [setThemeType])

  const theme = getTheme(themeType, windowSize)
  const value: IAppThemeContextValue = { theme, switchTheme, isDark: themeType === 'dark' }

  const body = (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <AppThemeContext.Provider value={value}>
            <CssBaseline />
            <GlobalStyles />

            {children}
          </AppThemeContext.Provider>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  )

  return isMounted ? body : <Hidden hidden>{body}</Hidden> // This can cause problems
}

export default AppThemeProvider
