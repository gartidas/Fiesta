import { Card } from '@material-ui/core'
import styled from 'styled-components'

export const FiltersWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 50px;
  padding: 10px 0;

  hr {
    height: 30px;
  }

  position: sticky;
  background-color: ${({ theme }) => theme.palette.background.default};
  z-index: 5;
  top: 0px;
`

export const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 600px;
  width: 100%;

  .MuiIconButton-root {
    padding: 4px;

    .MuiIconButton-label {
      color: ${({ theme }) => theme.palette.themeText.themeGray};
    }
  }

  .MuiSlider-root {
    margin: 0 18px 0 7px;
  }
`

export const NoLimitParagraph = styled.p`
  margin: 0;
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.themeText.themeGray};
`

export const DistanceFilterValue = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
  margin: 0;

  ${({ onClick }) => onClick && 'cursor:pointer'};

  ::after {
    content: 'km';
    margin-left: 2px;
    font-weight: 300;
    font-size: 0.8em;
  }
`

export const ModalCard = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: none;
  width: 100%;
  max-width: 90vw;
  min-width: 310px;
  padding: 20px;

  .MuiSlider-root {
    margin: 0 18px 0 0;
  }
`
