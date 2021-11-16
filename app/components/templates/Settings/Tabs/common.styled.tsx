import { Accordion } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import styled from 'styled-components'
import { LG, MD } from '@contextProviders/AppThemeProvider/theme'

export const SettingsAccordion = styled(Accordion)`
  .MuiAccordionSummary-root svg {
    color: ${({ theme }) => theme.palette.themeText.themeGray};
  }

  .MuiAccordionDetails-root {
    display: block;
  }

  box-shadow: none;
  padding: 0 7px 10px;

  @media screen and (max-width: ${MD}px) {
    padding: 0;
  }
`

export const AccordionTitle = styled.h2`
  font-weight: 300;
  color: ${({ theme }) => theme.palette.themeText.themeBlack};
  font-size: 1.2rem;

  @media screen and (max-width: ${LG}px) {
    font-size: 1.1rem;
  }

  @media screen and (max-width: ${MD}px) {
    font-size: 1rem;
  }
`

export const StyledSettingsAlert = styled(Alert)`
  padding: 6px 9px;
  margin-bottom: 10px;
  font-weight: 300;
  font-size: 0.95em;
`

export const TabTitle = styled.h1<{ danger?: 1 }>`
  ${({ theme }) => theme.typography.h6 as any}
  margin: 25px 0 10px;

  ${({ danger, theme }) => danger && `color: ${theme.palette.error.main}`};

  @media screen and (min-width: ${MD + 1}px) {
    display: none;
  }
`
