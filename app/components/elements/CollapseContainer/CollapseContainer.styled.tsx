import { Button, Collapse } from '@material-ui/core'
import styled from 'styled-components'

export const StyledCollapse = styled(Collapse)<{ collapsedHeight: number }>`
  min-height: ${({ collapsedHeight }) => `${collapsedHeight}px`} !important;

  &.MuiCollapse-hidden {
    visibility: visible;
  }
`

export const StyledButton = styled(Button)`
  margin-top: 5px;
  padding-left: 0;
  padding-right: 0;
  color: ${({ theme }) => theme.palette.themeText.themeGray};
  font-weight: 500;

  :hover {
    background-color: transparent;
    text-decoration: underline;
  }
`
