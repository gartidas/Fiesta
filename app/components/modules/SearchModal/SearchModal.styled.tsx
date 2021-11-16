import { LG, MD } from '@contextProviders/AppThemeProvider/theme'
import { Card, IconButton, MenuItem } from '@material-ui/core'
import styled from 'styled-components'

export const StyledCard = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 10px;
  outline: none;
  min-width: 300px;
  width: 50vw;
  height: 90vh;

  @media screen and (max-width: ${LG}px) {
    width: 70vw;
  }

  @media screen and (max-width: ${MD}px) {
    height: 95vh;
    width: 95vw;
  }
`

export const StyledCloseButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;

  svg {
    color: ${({ theme }) => theme.palette.themeText.themeGray};
  }
`

export const ItemsContainer = styled.div`
  overflow: auto;
  max-height: calc(100% - 150px);
  padding-bottom: 10px; //Note: needed for <Observer/> to work properly
`

export const SearchModalItem = styled(MenuItem)`
  padding: 13px 8%;

  &.Mui-disabled {
    opacity: 1;
  }

  ${({ disableRipple }) => disableRipple && 'cursor: auto;'};

  @media screen and (max-width: ${MD}px) {
    padding: 7px 8%;
  }
`
