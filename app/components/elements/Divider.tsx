import { Divider as MuiDivider } from '@material-ui/core'
import styled from 'styled-components'

const Divider = styled(MuiDivider)`
  ${({ theme }) => theme.palette.type === 'dark' && 'background-color: rgba(255,255,255,0.2)'};
`

export default Divider
