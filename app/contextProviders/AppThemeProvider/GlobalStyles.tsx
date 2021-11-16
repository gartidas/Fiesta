import { NAVBAR_HEIGHT } from '@modules/Navbar/Navbar.styled'
import { createGlobalStyle, css } from 'styled-components'
import { MD } from './theme'

const GlobalStyles = createGlobalStyle`
  .MuiMenuItem-root {
    color: ${({ theme }) => theme.palette.themeText.themeBlack};
  }

  .Toastify__toast-container {
    top: ${NAVBAR_HEIGHT}px;

    @media only screen and (max-width: 480px) {
      width: min(92%, 350px);
      padding: 4px;
      left: auto;
      top: 1rem;
      margin: 0;
    }

    .Toastify__toast {
      padding: 0;
      min-height: 0px;
      margin-bottom: 0.2rem !important;
      box-shadow: ${({ theme }) => theme.shadows[15]};

      .Toastify__toast-body {
        width: 100%;
        padding: 0;
        background-color: ${({ theme }) => theme.palette.background.paper};
      }
    }
  }

  // Disabled Button contrast fix
  ${({ theme }) =>
    theme.palette.type === 'dark' &&
    css`
      .Mui-disabled.MuiButton-root {
        color: ${theme.palette.grey[600]};
      }
      .Mui-disabled.MuiButton-outlined {
        border-color: ${theme.palette.grey[600]};
      }
    `}

  // Scrollbar
  * {
    @media screen and (min-width: ${MD}px) {
      ::-webkit-scrollbar {
        width: 10px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        border-radius: 100px;
        background: ${({ theme: { palette } }) =>
          palette.type === 'dark' ? palette.grey[800] : palette.grey[500]};
      }
    }
  }
`

export default GlobalStyles
