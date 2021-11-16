import Divider from '@elements/Divider'
import styled from 'styled-components'
import { MD, LG } from '@contextProviders/AppThemeProvider/theme'
import { Avatar } from '@material-ui/core'

export const Wrapper = styled.div`
  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    > * + * {
      margin-top: 20px;
    }

    .MuiInputBase-formControl {
      max-width: 350px;
    }

    .MuiInputBase-multiline {
      max-width: 100%;
    }

    button {
      width: 150px;
      margin-top: 30px;
    }
  }

  @media screen and (min-width: ${MD}px) {
    padding-left: 30px;
  }
`

export const StyledAvatar = styled(Avatar)`
  height: 170px;
  width: 170px;
  margin: 0;
  display: block;
  cursor: pointer;

  .MuiAvatar-fallback {
    height: 140px;
    width: 140px;
    color: ${({ theme }) => theme.palette.themeText.themeGray};
    display: block;
    margin: 10px auto 0;
  }

  @media screen and (max-width: ${LG}px) {
    height: 150px;
    width: 150px;

    .MuiAvatar-fallback {
      height: 130px;
      width: 130px;
      margin-top: 7px;
    }
  }

  @media screen and (max-width: ${MD}px) {
    height: 100px;
    width: 100px;

    .MuiAvatar-fallback {
      height: 90px;
      width: 90px;
      margin-top: 0;
    }
  }
`

export const StyledDivider = styled(Divider)`
  margin: 25px 5px 30px;
`
