import { Snackbar } from '@material-ui/core'
import styled from 'styled-components'

export const StyledSnackBar = styled(Snackbar)`
  background-color: ${({ theme }) => theme.palette.background.default};
`
