import { MenuItem } from '@elements/Menu/Menu'
import styled from 'styled-components'

export const StyledMenuItem = styled(MenuItem)`
  &#deleteMenuItem svg {
    color: ${({ theme }) => theme.palette.error.light};
  }
`
export const StyledInput = styled.input`
  display: none;
`
