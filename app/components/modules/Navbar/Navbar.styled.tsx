import styled from 'styled-components'
import { AppBar, ButtonGroup, IconButton } from '@material-ui/core'

import { Container } from '@elements/Container'
import FiestaLogo from '@elements/FiestaLogo'
import { MD, SM } from '@contextProviders/AppThemeProvider/theme'

export const NAVBAR_HEIGHT = 80
export const NAVBAR_HEIGHT_MOBILE = 60

export const StyledAppBar = styled(AppBar)<{ transparent: 0 | 1 }>`
  background-color: ${({ theme, transparent }) =>
    transparent ? 'transparent' : theme.palette.background.default};
`

export const Logo = styled(FiestaLogo)`
  margin-right: auto;
  cursor: pointer;
  font-size: 2.5rem !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7) !important;

  @media screen and (max-width: ${MD}px) {
    font-size: 1.8rem !important;
  }

  @media screen and (max-width: ${SM}px) {
    font-size: 1.4rem !important;
  }
`

export const StyledContainer = styled(Container)`
  height: ${NAVBAR_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: ${SM}px) {
    height: ${NAVBAR_HEIGHT_MOBILE}px;
  }
`

export const NavIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.palette.themeText.themeBlack};
  background: ${({ theme }) => theme.palette.background.default}88;
`

export const Menu = styled.div`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.palette.themeText.themeBlack};

  .MuiAvatar-root {
    margin-left: 18px;
    width: 36px;
    height: 36px;
    cursor: pointer;
  }

  @media screen and (min-width: ${MD}px) {
    > button {
      margin-left: 6px;
      margin-right: 6px;
    }
  }
`

export const StyledButtonGroup = styled(ButtonGroup)`
  > button {
    min-width: 80px;
    border-radius: 0;
    box-shadow: none;
    border: none;
  }

  button + button {
    background: ${({ theme }) => theme.palette.gradients.primary};
    color: white !important;
  }
`
