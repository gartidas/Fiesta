import styled from 'styled-components'
import { MD } from '@contextProviders/AppThemeProvider/theme'

export const Wrapper = styled.div``

export const Title = styled.h2`
  color: ${({ theme }) => theme.palette.themeText.themeBlack};
  margin-top: 0px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .MuiIconButton-root {
    color: ${({ theme }) => theme.palette.themeText.themeGray};
    svg {
      font-size: 0.9em;
    }
  }

  @media screen and (max-width: ${MD}px) {
    font-size: 1.5rem;
  }
`

export const MapWrapper = styled.div`
  height: 50vh;
  margin-top: 10px;
`
