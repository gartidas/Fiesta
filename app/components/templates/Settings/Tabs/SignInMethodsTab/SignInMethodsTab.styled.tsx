import styled from 'styled-components'
import { MD } from '@contextProviders/AppThemeProvider/theme'

export const Wrapper = styled.div`
  .MuiChip-root {
    margin-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    max-width: 350px;
    width: 100%;

    > * + * {
      margin-top: 10px;
    }

    button {
      width: 90px;
      margin-top: 20px;
    }
  }

  @media screen and (min-width: ${MD}px) {
    padding-left: 30px;
  }
`
