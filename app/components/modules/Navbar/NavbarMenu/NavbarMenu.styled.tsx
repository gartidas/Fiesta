import Divider from '@elements/Divider'
import { Avatar, Menu, MenuItem } from '@material-ui/core'
import styled from 'styled-components'

export const StyledMenu = styled(Menu)`
  .MuiList-root {
    padding: 18px 0;
    min-width: 265px;
  }

  .MuiPaper-rounded {
    border-radius: 10px;
  }
`

export const StyledDivider = styled(Divider)`
  margin: 20px 25px 20px;
`

export const StyledAvatar = styled(Avatar)`
  height: 55px;
  width: 55px;
  margin: 0 auto;
  display: block;
  cursor: pointer;

  .MuiAvatar-fallback {
    height: 45px;
    width: 45px;
    color: ${({ theme }) => theme.palette.themeText.themeGray};
    display: block;
    margin: 4px auto 0;
  }
`

export const Name = styled.h1`
  font-weight: 500;
  font-size: ${({ theme }) => theme.typography.h6.fontSize};
  text-align: center;
  color: ${({ theme }) => theme.palette.themeText.themeBlack};
  cursor: pointer;
  margin: 12px auto 0;
  width: 90%;

  :hover {
    text-decoration: underline;
  }

  ::first-letter {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`

export const StyledMenuItem = styled(MenuItem)`
  padding: 10px 25px;
  color: ${({ theme }) => theme.palette.themeText.themeGray};

  display: flex;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.body1.fontSize};

  #lightThemeIcon {
    color: ${({ theme }) => theme.palette.primary.main};
  }

  svg {
    margin-left: auto;
  }
`
