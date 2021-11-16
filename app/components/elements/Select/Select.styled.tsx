import { FormControl } from '@material-ui/core'
import styled from 'styled-components'

export const StyledFormControl = styled(FormControl)`
  color: ${({ theme }) => theme.palette.themeText.themeBlack};

  svg,
  .MuiFormLabel-root,
  .MuiSelect-root {
    color: ${({ theme }) => theme.palette.themeText.themeBlack};
  }
`
