import { Button } from '@material-ui/core'
import styled from 'styled-components'

export const StyledMuiButton = styled(Button)`
  ${({ color, variant, disabled, theme }) =>
    color === 'primary' &&
    variant === 'contained' &&
    !disabled &&
    `background: ${theme.palette.gradients.primary}`}
`
