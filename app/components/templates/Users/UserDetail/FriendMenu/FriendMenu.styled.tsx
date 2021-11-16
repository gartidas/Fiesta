import { MenuItem } from '@elements/Menu/Menu'
import styled from 'styled-components'

export const StyledMenuItem = styled(MenuItem)`
  &#removeMenuItem svg {
    color: ${({ theme }) => theme.palette.error.light};
  }
`
