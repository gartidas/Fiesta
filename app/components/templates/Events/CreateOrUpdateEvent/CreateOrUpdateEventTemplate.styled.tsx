import styled from 'styled-components'

export const Wrapper = styled.div`
  .MuiStepLabel-label {
    color: ${({ theme }) => theme.palette.themeText.themeGray};
    font-weight: 300;
  }

  .MuiStepLabel-active,
  .MuiStepLabel-completed {
    color: ${({ theme }) => theme.palette.themeText.themeBlack};
  }

  .MuiStepLabel-active {
    font-weight: 400;
    font-size: 1.05em;
  }

  .MuiStepper-root {
    margin-bottom: 20px;
  }
`
