import Button from '@elements/Button/Button'
import { Card } from '@material-ui/core'
import styled from 'styled-components'
import { SM } from '@contextProviders/AppThemeProvider/theme'

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 50px;
  max-width: 500px;
  width: 100%;

  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);

  > * + * {
    margin-top: 30px;
  }

  @media screen and (max-width: ${SM}px) {
    padding: 50px 30px;
  }
`

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  padding-bottom: 0;

  > * + * {
    margin-top: 30px;
  }
`

export const StyledForgotPasswordButton = styled(Button)`
  margin-top: 5px;
  margin-bottom: -25px;
  font-size: 0.9em;
`
