import { Card } from '@material-ui/core'
import styled from 'styled-components'
import { MD } from '@contextProviders/AppThemeProvider/theme'

export const StyledCard = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: none;
  min-width: 300px;

  p {
    color: ${({ theme }) => theme.palette.themeText.themeBlack};
  }

  input {
    font-size: 0.9em;
  }

  button {
    margin-top: 15px;
  }
`

export const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.palette.primary.main};

  @media screen and (max-width: ${MD}px) {
    font-size: 1.2rem;
  }
`
