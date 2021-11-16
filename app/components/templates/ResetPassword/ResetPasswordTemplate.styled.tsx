import { Card } from '@material-ui/core'
import styled from 'styled-components'
import { MD } from '@contextProviders/AppThemeProvider/theme'

export const StyledCard = styled(Card)`
  padding: 20px 30px 40px;
  width: 90%;
  max-width: 560px;

  h1 {
    color: ${({ theme }) => theme.palette.primary.main};
  }

  .MuiTextField-root {
    margin-bottom: 13px;
  }
`

export const SuccessResetDialogCard = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: none;
  min-width: 300px;

  p {
    color: ${({ theme }) => theme.palette.themeText.themeBlack};
  }

  h1 {
    color: ${({ theme }) => theme.palette.primary.main};

    @media screen and (max-width: ${MD}px) {
      font-size: 1.2rem;
    }
  }
`
