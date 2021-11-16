import { Card } from '@material-ui/core'
import styled from 'styled-components'

export const StyledCard = styled(Card)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > * + * {
    margin-top: 10px;
  }

  .MuiFormControl-root {
    max-width: 500px;
    width: 100%;
  }
`

export const AccessibilityValue = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
    font-size: 1.1rem;
  }
`
