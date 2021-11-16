import { Card } from '@material-ui/core'
import styled from 'styled-components'

export const ErrorCard = styled(Card)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  z-index: 999;
  padding: 30px;

  h3 {
    color: ${({ theme }) => theme.palette.error.main};
    ${({ theme }) => theme.typography.h4 as any};
  }

  p {
    ${({ theme }) => theme.typography.body1 as any};
    color: ${({ theme }) => theme.palette.themeText.themeGray};
  }
`
