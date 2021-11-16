import { Card } from '@material-ui/core'
import styled from 'styled-components'

export const StyledCard = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: none;
  min-width: 300px;
  padding: 20px;
`

export const FiltersContainer = styled.div`
  > * + * {
    margin-top: 15px;
  }
`
