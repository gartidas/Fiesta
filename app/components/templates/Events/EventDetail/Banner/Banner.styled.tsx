import { MD } from '@contextProviders/AppThemeProvider/theme'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const ImageWrapper = styled.div`
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  @media screen and (max-width: ${MD}px) {
    border-radius: 0;
  }
`

export const Overlay = styled.div<{ opacity: 0 | 1 }>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.65);
  opacity: ${({ opacity }) => opacity};
  transition: opacity 0.3s;
  cursor: pointer;

  svg {
    color: ${({ theme }) => theme.palette.grey[100]};
    font-size: ${({ theme }) => theme.typography.h2.fontSize};
  }

  :hover {
    opacity: 1;
  }
`

export const Image = styled.img`
  object-fit: contain;
  min-height: 200px;
  max-height: 50vh;
  max-width: 100%;
  display: block;
`
