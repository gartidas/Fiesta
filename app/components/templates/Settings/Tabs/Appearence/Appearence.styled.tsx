import { MD } from '@contextProviders/AppThemeProvider/theme'
import { WbSunnyTwoTone } from '@material-ui/icons'
import styled from 'styled-components'

export const Wrapper = styled.div`
  @media screen and (min-width: ${MD}px) {
    padding-left: 30px;
  }
`

export const LightThemeIcon = styled(WbSunnyTwoTone)`
  color: ${({ theme }) => theme.palette.primary.main} !important;
`
