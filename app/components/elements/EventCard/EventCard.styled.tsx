import styled, { keyframes } from 'styled-components'
import { pulse } from 'react-animations'

export const CardWrapper = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: 20px;
  overflow: hidden;
  height: 400px;
  width: 100%;
  width: 320px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  position: relative;

  :hover .banner {
    transform: scale(1.2);
  }
`

export const TopWrapper = styled.div`
  height: 55%;
  position: relative;
`

export const BannerWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;

  .banner {
    transition: transform 0.3s ease-out;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
`

export const StartDate = styled.div`
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 20px;
  top: -45px;
  right: 10px;
  border: 10px solid ${({ theme }) => theme.palette.background.paper};
  background: ${({ theme }) => theme.palette.gradients.primary};
  color: ${({ theme }) => theme.palette.themeText.white};
  margin-left: auto;
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

  svg {
    display: none;
    font-size: 3rem;
    animation: ${keyframes(pulse)} 0.65s alternate infinite ease-in-out;
  }

  span {
    position: relative;
    top: 7px;
    :after {
      content: '.';
      position: absolute;
      bottom: 0;
      right: -7px;
    }
  }

  ::before {
    position: absolute;
    content: attr(data-month);
    font-size: 0.6em;
    font-weight: 500;
    text-align: center;
    top: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 10px 10px 0 0;
    transition: opacity 0.2s;
  }

  :hover {
    transform: scale(0.9);
  }
`

export const BottomWrapper = styled.div`
  padding: 0 20px 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 225px;
  border-radius: 25px 25px 0 0;
  background: ${({ theme }) => theme.palette.background.paper};
  transition: height 0.3s ease-in-out;
  display: flex;
  flex-direction: column;

  h3 {
    padding: 12px 90px 0 0;
    margin: 0;
    font-size: 1.2rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: 500;

    span {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  p {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.palette.themeText.themeGray};
    margin: 10px 0;
    svg {
      color: ${({ theme }) => theme.palette.themeText.themeBlack};
      margin-right: 7px;
    }
    .username {
      font-weight: 500;
      cursor: pointer;
      ::first-letter {
        color: ${({ theme }) => theme.palette.primary.main};
      }
    }
  }

  .event-info {
    flex: 1;
    .event-description {
      margin-top: 20px;
      display: none;
    }
    .MuiChip-root svg {
      margin-left: 10px;
      margin-bottom: 2px;
    }
  }

  :hover {
    height: 380px;

    .start-date-avatar {
      border-radius: 50%;
      top: 0;
      span {
        display: none;
      }
      ::before {
        opacity: 0;
      }
      svg {
        display: block;
      }
    }
    .event-info {
      margin-top: 10px;
      overflow-y: auto;
    }
    .event-description {
      display: block;
    }
  }
`
