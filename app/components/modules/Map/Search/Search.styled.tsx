import styled from 'styled-components'

export const Wrapper = styled.div`
  .MuiAutocomplete-root {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    max-width: 500px;
    width: 95%;

    .MuiInputBase-root {
      background-color: ${({ theme }) => theme.palette.background.default + 'dd'};
      color: ${({ theme }) => theme.palette.themeText.themeBlack};
      border-radius: 100vh;
      padding-left: 15px;

      svg {
        color: ${({ theme }) => theme.palette.themeText.themeGray};
      }
    }
  }
`

export const OptionText = styled.p`
  color: ${({ theme }) => theme.palette.themeText.themeBlack};
  font-size: 0.85em;
`

export const Option = styled.div`
  display: flex;
  align-items: center;
  svg {
    color: ${({ theme }) => theme.palette.themeText.themeGray};
    margin-right: 10px;
  }
`
