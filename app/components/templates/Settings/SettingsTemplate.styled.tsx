import styled from 'styled-components'
import { Tab } from '@material-ui/core'

import { PageMinHeightWrapper } from '@elements/PageMinHeightWrapper'
import TabPanel from '@elements/TabPanel/TabPanel'
import { MD } from '@contextProviders/AppThemeProvider/theme'
import { NAVBAR_HEIGHT } from '@modules/Navbar/Navbar.styled'

export const Wrapper = styled(PageMinHeightWrapper)`
  display: flex;
  width: 100%;
`

export const TabsContainer = styled.div`
  position: relative;
  min-width: 200px;
  max-width: 250px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 50px;

  color: ${({ theme }) => theme.palette.themeText.themeBlack};
  border-right: 1px solid ${({ theme }) => theme.palette.themeText.themeBlack}26;
`

export const TabPanelContainer = styled.div`
  flex: 3;

  @media screen and (max-width: ${MD}px) {
    margin-bottom: 20px;
  }
`

export const StyledTab = styled(Tab)`
  font-size: 0.9rem;
  padding: 17px 0;

  .MuiTab-wrapper {
    display: inline;
    text-align: start;
  }
`

export const StyledPanel = styled(TabPanel)`
  @media screen and (min-width: ${MD}px) {
    height: calc(100vh - ${NAVBAR_HEIGHT}px - 50px);
    overflow: auto;
  }
`
