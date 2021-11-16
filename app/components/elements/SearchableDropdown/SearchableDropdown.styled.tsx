import { Card, MenuItem } from '@material-ui/core'
import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  z-index: 5;
  svg {
    color: ${({ theme }) => theme.palette.themeText.themeBlack};
  }
`

export const StartIconWrapper = styled.span`
  margin-right: 10px;
  font-size: inherit;
`

export const ClearAndExpandIcons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 5px;
  margin-left: 5px;
  cursor: pointer;

  #clear-icon {
    color: ${({ theme }) => theme.palette.error.main};
  }
`

export const Expander = styled(Card)<{ maxHeight?: string }>`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  width: 100%;
  padding: 10px 0;
  overflow: auto;
  max-height: ${({ maxHeight }) => maxHeight || '350px'};
`

export const Item = styled(MenuItem)<{ fontSize?: string }>`
  padding: 11px 16px;
  font-size: ${({ fontSize }) => fontSize || '1rem'};
`
