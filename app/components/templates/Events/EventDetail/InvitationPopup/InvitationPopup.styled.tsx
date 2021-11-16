import { MD } from '@contextProviders/AppThemeProvider/theme'
import { Card } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { BOTTOM_NAVIGATION_HEIGHT } from '@modules/BottomNavigation/BottomNavigation.styled'
import styled from 'styled-components'

export const Wrapper = styled(Card)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  max-width: 400px;
  width: 90%;
  padding: 20px;

  @media screen and (max-width: ${MD}px) {
    bottom: calc(15px + ${BOTTOM_NAVIGATION_HEIGHT}px);
    right: 15px;
  }
`

export const CloseIcon = styled(Close)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`
