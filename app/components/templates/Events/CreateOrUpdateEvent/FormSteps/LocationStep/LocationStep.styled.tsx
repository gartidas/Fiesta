import { SM } from '@contextProviders/AppThemeProvider/theme'
import { Card } from '@material-ui/core'
import { NAVBAR_HEIGHT, NAVBAR_HEIGHT_MOBILE } from '@modules/Navbar/Navbar.styled'
import styled from 'styled-components'

export const StyledCard = styled(Card)`
  height: calc(100vh - ${NAVBAR_HEIGHT}px - 120px);

  @media screen and (max-width: ${SM}px) {
    height: calc(100vh - ${NAVBAR_HEIGHT_MOBILE}px - 120px);
  }
`
