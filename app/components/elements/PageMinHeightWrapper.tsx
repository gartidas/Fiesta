import styled, { css } from 'styled-components'
import { NAVBAR_HEIGHT, NAVBAR_HEIGHT_MOBILE } from '@modules/Navbar/Navbar.styled'
import { SM } from '@contextProviders/AppThemeProvider/theme'

export const PageMinHeightWrapper = styled.div<{ center?: boolean }>`
  min-height: calc(100vh - ${NAVBAR_HEIGHT}px);

  @media screen and (max-width: ${SM}px) {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_MOBILE}px);
  }

  ${({ center }) =>
    center &&
    css`
      display: grid;
      place-items: center;
    `}
`
