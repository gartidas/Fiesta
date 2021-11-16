import Button from '@elements/Button/Button'
import { Chip } from '@material-ui/core'
import styled from 'styled-components'

export const CreatedAt = styled.h6`
  ${({ theme }) => theme.typography.subtitle2 as any};
  font-weight: 400;
  color: ${({ theme }) => theme.palette.themeText.themeGray};
  margin: 0;
`

export const UserName = styled.h6`
  ${({ theme }) => theme.typography.subtitle2 as any};
  color: ${({ theme }) => theme.palette.themeText.themeBlack};
  margin: 0;
  cursor: pointer;

  ::first-letter {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`

export const ViewRepliesButton = styled(Button)`
  padding: 2px 0;
  :hover {
    background-color: inherit;
  }
`

export const Content = styled.p`
  ${({ theme }) => theme.typography.body1 as any};
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
`

export const StyledChip = styled(Chip)`
  background-color: ${({ theme }) =>
    theme.palette.isDark ? theme.palette.grey[900] : theme.palette.grey[300]};
  height: 25px;

  svg {
    color: ${({ theme }) => theme.palette.themeText.themeBlack};
    font-size: ${({ theme }) => theme.typography.subtitle1.fontSize};
  }

  .MuiChip-label {
    ${({ theme }) => theme.typography.subtitle2 as any};
    ::first-letter {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`

export const ReplyButton = styled(Button)`
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
  min-width: 0;
  margin-right: 10px;

  :hover {
    background-color: inherit;
  }
`
