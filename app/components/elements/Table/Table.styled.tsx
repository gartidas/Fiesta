import { Badge, Checkbox, IconButton } from '@material-ui/core'
import styled, { css } from 'styled-components'

interface IStyledProps {
  height?: string
  resizable?: boolean
}

export const Wrapper = styled.div<IStyledProps>`
  box-shadow: ${({ theme }) => theme.shadows[2]};
  border-radius: 8px;
  overflow: hidden;

  .MuiTableContainer-root {
    height: ${({ height }) => height || '500px'};
    box-shadow: ${({ theme }) => theme.shadows[0]};
    border-radius: 0;
  }

  .MuiTableCell-stickyHeader {
    background-color: ${({ theme }) => theme.palette.background.paper};
    border-bottom: 1px solid ${({ theme }) => theme.palette.themeText.themeGray};
  }

  .selection-col {
    max-width: 60px;
  }

  ${({ resizable }) =>
    resizable &&
    css`
      .MuiTableHead-root .MuiTableRow-root .MuiTableCell-head {
        resize: horizontal;
        overflow-x: overlay;
        overflow-y: hidden;
        border-right: 1px solid ${({ theme }) => theme.palette.themeText.themeGray};
      }
    `}
`

export const StyledCheckBox = styled(Checkbox)`
  padding: 0;
`

export const FilterButtonBadge = styled(Badge)`
  .MuiBadge-badge {
    top: 4px;
    right: 4px;
  }
`

export const FloatingButtonsContainer = styled.div`
  position: absolute;
  top: -30px;
  right: 10px;
  z-index: 11;

  > * + * {
    margin-left: 7px;
  }
`

export const FloatingButton = styled(IconButton)`
  padding: 10px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: ${({ theme }) => theme.shadows[5]};

  :hover {
    background-color: ${({ theme }) => theme.palette.background.paper};
  }

  &.Mui-disabled {
    background-color: ${({ theme }) => theme.palette.background.paper};
  }
`

export const OuterWrapper = styled.div`
  position: relative;
`
