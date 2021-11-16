import styled from 'styled-components'
import { IconButton, Menu, MenuItem } from '@material-ui/core'

import { SM } from '@contextProviders/AppThemeProvider/theme'
import { NAVBAR_HEIGHT_MOBILE } from '@modules/Navbar/Navbar.styled'
import { BOTTOM_NAVIGATION_HEIGHT } from '@modules/BottomNavigation/BottomNavigation.styled'

export const StyledMenu = styled(Menu)`
  .MuiPaper-rounded {
    border-radius: 10px;
  }

  .MuiList-root {
    width: 400px !important;
    padding-right: 0 !important;
    background-color: ${({ theme }) => theme.palette.background.paper};
  }

  @media screen and (max-width: ${SM}px) {
    .MuiList-root {
      position: fixed;
      top: ${NAVBAR_HEIGHT_MOBILE}px;
      left: 0;
      width: 100vw !important;
      bottom: ${BOTTOM_NAVIGATION_HEIGHT}px;
      overflow: auto;
    }

    .MuiPaper-root {
      background-color: transparent;
      box-shadow: none;
    }
  }
`

export const MoreButton = styled(IconButton)`
  margin-left: auto;
`

export const StyledMenuItem = styled(MenuItem)`
  display: flex;
  align-items: center;
  gap: 7px;
`
