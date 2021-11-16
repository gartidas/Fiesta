import styled from 'styled-components'
import { MD } from '@contextProviders/AppThemeProvider/theme'
import TabPanel from '@elements/TabPanel/TabPanel'

export const TabsWrapper = styled.div`
  margin-top: 30px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.background.default};

  @media screen and (max-width: ${MD}px) {
    margin-top: 15px;
  }
`

export const StyledPanel = styled(TabPanel)`
  margin-top: 30px;

  @media screen and (max-width: ${MD}px) {
    margin-top: 15px;
  }
`
