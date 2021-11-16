import { MenuItem } from '@material-ui/core'
import styled, { css } from 'styled-components'

export const Wrapper = styled(MenuItem)`
  display: flex;
  padding: 10px 20px;
  white-space: pre-wrap;
  transition: background-color 0.2s;
`

export const CreatedAt = styled.div<{ seen: 0 | 1 }>`
  ${({ theme }) => theme.typography.caption as any};
  color: ${({ theme }) => theme.palette.themeText.themeGray};

  ${({ seen, theme }) =>
    !seen &&
    css`
      color: ${theme.palette.primary.main};
      font-weight: bolder;
    `}
`

export const Content = styled.div`
  ${({ theme }) => theme.typography.body2 as any};
`
