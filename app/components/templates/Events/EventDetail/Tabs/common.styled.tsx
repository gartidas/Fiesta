import styled from 'styled-components'
import TextBox from '@elements/TextBox/TextBox'
import { MD } from '@contextProviders/AppThemeProvider/theme'

export const Item = styled.div`
  padding: 10px 5px;
  display: flex;
  border-radius: 5px;
  margin: 3px 0;
  transition: background-color 0.2s;

  :hover {
    background-color: ${({ theme }) =>
      theme.palette.isDark ? theme.palette.grey[900] : theme.palette.grey[300]};
  }
`

export const ActionsWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`

export const StyledTextBox = styled(TextBox)`
  width: 100%;
  max-width: 400px;
`
export const ItemsContainer = styled.div`
  margin: 20px 0;

  @media screen and (max-width: ${MD}px) {
    margin-top: 10px;
  }
`
