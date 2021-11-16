import { MenuItem } from '@material-ui/core'
import styled from 'styled-components'

export const IconWrapper = styled.div`
  color: ${({ theme }) => theme.palette.themeText.themeGray};
  cursor: pointer;
  height: max-content;

  :hover,
  :focus {
    color: ${({ theme }) => theme.palette.themeText.themeBlack};
  }
`

export const StyledMenuItem = styled(MenuItem)`
  svg {
    margin-right: 11px;
    font-size: 1.3em;
  }
`
