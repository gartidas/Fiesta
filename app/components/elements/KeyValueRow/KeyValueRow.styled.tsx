import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  border-radius: 3px;
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  color: ${({ theme }) => theme.palette.themeText.themeBlack};
  padding: 0 10px;

  :nth-child(even) {
    background-color: ${({ theme }) =>
      theme.palette.type === 'dark'
        ? theme.palette.grey[800] + '50'
        : theme.palette.grey[100] + 'd0'};
  }
`

export const Value = styled.p``

export const Key = styled.p<{ keyWidth: string }>`
  margin-right: 10px;
  font-weight: 500;
  min-width: ${({ keyWidth }) => keyWidth};
  display: block;

  ::after {
    content: ':';
  }
`
