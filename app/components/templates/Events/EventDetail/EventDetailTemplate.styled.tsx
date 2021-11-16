import styled from 'styled-components'
import Image from 'next/image'
import { Button, Card } from '@material-ui/core'
import { MD, SM } from '@contextProviders/AppThemeProvider/theme'

export const Wrapper = styled.div`
  position: relative;
  padding: 100px 0 30px;

  @media screen and (max-width: ${MD}px) {
    padding-top: 0;
  }
`

export const BlurredImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  ::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 250px;
    background: ${({ theme }) =>
      `linear-gradient(${theme.palette.background.default}00, ${theme.palette.background.default})`};
  }
`

export const BlurredImage = styled(Image)`
  object-fit: cover;
  filter: blur(100px);
`

export const StyledCard = styled(Card)`
  padding: 40px 0 20px;
  margin-top: 30px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.background.paper + 'ee'};
  box-shadow: ${({ theme }) => theme.shadows[3]};
  ::first-letter {
    color: ${({ theme }) => theme.palette.primary.main};
  }
  @media screen and (min-width: ${MD}px) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media screen and (max-width: ${MD}px) {
    padding: 30px 0 20px;
    margin-top: 15px;
  }

  @media screen and (max-width: ${SM}px) {
    padding: 20px 0 15px;
  }
`

export const Title = styled.h1`
  ${({ theme }) => theme.typography.h4 as any};
  margin: 10px 0 20px;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
`

export const EventDescription = styled.p`
  ${({ theme }) => theme.typography.body1 as any};
  font-weight: 300;
  white-space: pre-wrap;
  word-break: break-word;
`

export const InfoRow = styled.div`
  min-height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;

  h6 {
    margin: 0;
    ${({ theme }) => theme.typography.body1 as any};
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 500;

    svg {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
  > div {
    ${({ theme }) => theme.typography.body1 as any};
  }
`

export const Organizer = styled(Button)`
  span {
    ::first-letter {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
  .MuiAvatar-root {
    width: 28px;
    height: 28px;
  }
`
