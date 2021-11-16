import styled, { css } from 'styled-components'
import { MD } from '@contextProviders/AppThemeProvider/theme'

export const Container = styled.div<{ disabled?: boolean }>`
  width: 100%;

  .MuiChip-root svg {
    margin-bottom: 2px;
    margin-left: 10px;
  }

  ${({ disabled }) =>
    !disabled &&
    css`
      margin: 0 auto;
      max-width: 80%;

      @media screen and (max-width: ${MD}px) {
        max-width: 90%;
      }
    `}
`
