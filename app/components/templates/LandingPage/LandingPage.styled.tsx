import styled, { css, keyframes } from 'styled-components'
import { fadeInDown } from 'react-animations'
import { LG, MD, SM, XL } from '@contextProviders/AppThemeProvider/theme'

export const Wrapper = styled.div``

export const Layer1 = styled.img`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 200px;
  object-fit: cover;
`
export const Layer2 = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  height: 200px;
  object-fit: cover;
  filter: drop-shadow(0 10px 5px rgba(0, 0, 0, 0.2));
`

export const TypewriterImage = styled.img`
  max-width: 500px;
  max-height: 500px;
  width: 70%;
  height: 70%;

  -webkit-animation-name: cross-fade;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-duration: 8s;
  animation-name: cross-fade;
  animation-iteration-count: infinite;
  animation-duration: 8s;

  @media screen and (max-width: 1300px) {
    width: 50%;
    height: 50%;
  }

  @-webkit-keyframes cross-fade {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    33% {
      opacity: 1;
    }
    53% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes cross-fade {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    33% {
      opacity: 1;
    }
    53% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
`

export const ImagesContainer = styled.div`
  position: absolute;
  top: 50vh;
  transform: translateY(-50%);
  right: 250px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  img:nth-child(2) {
    -webkit-animation-delay: -4s;
    animation-delay: -4s;
  }
  img:nth-child(3) {
    -webkit-animation-delay: -2s;
    animation-delay: -2s;
  }

  @media screen and (max-width: 1500px) {
    right: 100px;
  }

  @media screen and (max-width: 1100px) {
    display: none;
  }
`

export const HeroSection = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  height: 100vh;
  padding-bottom: 100px;

  h1 {
    font-size: 3.6rem;
    font-weight: 600;
    animation: ${keyframes`${fadeInDown}`} 1s ease-out;
    @media screen and (max-width: 800px) {
      font-size: 3rem;
    }
    @media screen and (max-width: 500px) {
      font-size: 2rem;
      text-align: center;
    }
    span {
      background: ${({ theme }) => theme.palette.gradients.primary};
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  h3 {
    font-size: 1.5rem;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.themeText.themeGray};
    @media screen and (max-width: 800px) {
      font-size: 1.3rem;
    }
    @media screen and (max-width: 500px) {
      font-size: 1rem;
      text-align: center;
    }
  }

  #get-started-btn {
    width: 290px;
    height: 60px;
    border-radius: 4px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
    font-weight: 500;
    font-size: 1.3rem;
    text-transform: uppercase;
    transition: transform 0.2s;
    svg {
      font-size: 2rem;
      transition: transform 0.2s;
      transform: translateX(10px);
    }
    :hover {
      transform: scale(1.05);
      svg {
        transform: translateX(30px);
      }
    }

    @media screen and (max-width: 800px) {
      font-size: 1rem;
      width: 250px;
      height: 50px;
    }
    @media screen and (max-width: 700px) {
      margin: 0 auto;
      display: block;
      > * {
        display: flex;
      }
    }
    @media screen and (max-width: 500px) {
      font-size: 0.85rem;
      width: 200px;
    }
  }
`

export const StepsSection = styled.section`
  position: relative;
  padding: 250px 0 150px;
`

export const StepContainer = styled.div`
  display: flex;
  height: 70vh;

  @media screen and (min-width: ${LG + 1}px) {
    :nth-child(even) .step {
      flex-direction: row-reverse;

      .step-image-container {
        ::after {
          left: -30px;
          right: unset;
        }
      }
    }
  }
`

export const Step = styled.section<{ inView: boolean }>`
  height: 100%;
  width: 100%;
  padding: 70px 0;
  display: flex;
  gap: 100px;

  .step-text {
    flex: 3;
    margin: 0 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      font-size: 2rem;
      font-weight: 500;
      margin: 20px 0;
      margin: 0;
    }
    p {
      color: ${({ theme }) => theme.palette.themeText.themeGray};
      font-size: 1.3rem;
    }
  }

  .step-image-container {
    flex: 4;
    position: relative;
    width: 100%;
    height: 100%;
    visibility: hidden;

    img {
      object-fit: contain;
      display: block;
      border-radius: 5px;
      box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
      max-width: 100%;
      max-height: 100%;
      background: ${({ theme }) => theme.palette.background.default};
      ${({ theme }) =>
        theme.palette.isDark &&
        css`
          border: solid 1px ${theme.palette.grey[800]};
        `};
    }

    ::after {
      content: '';
      position: absolute;
      width: 70%;
      height: 50%;
      bottom: -30px;
      right: -30px;
      background: ${({ theme }) => theme.palette.gradients.primary};
      z-index: -1;
      border-radius: 5px;
    }

    ${({ inView }) =>
      inView &&
      css`
        visibility: visible;
        animation: ${keyframes(fadeInDown)} 1s ease-in-out;
      `}
  }

  @media screen and (max-width: ${XL}px) {
    gap: 0px;
    .step-text {
      align-items: flex-start;
    }
  }

  @media screen and (max-width: ${LG}px) {
    flex-direction: column;
    .step-text {
      margin: 0 0 20px;
      h1 {
        font-size: 1.5rem;
      }
      p {
        font-size: 1.2rem;
      }
    }
    .step-image-container {
      height: 50%;
    }
  }

  @media screen and (max-width: ${MD}px) {
    .step-image-container:after {
      right: 0;
    }
  }
`

export const StepLine = styled.div<{ position?: 'first' | 'last' }>`
  margin-right: 80px;
  position: relative;
  width: 1px;
  background: ${({ theme }) => theme.palette.themeText.themeGray};

  ${({ position }) => position === 'first' && 'margin-top: 35vh'};
  ${({ position }) => position === 'last' && 'margin-bottom: 35vh'};

  ::before {
    content: '';
    position: absolute;
    top: ${({ position }) => (position === 'first' ? 0 : position === 'last' ? '100%' : '50%')};
    left: -7px;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.gradients.primary};
  }

  @media screen and (max-width: 450px) {
    margin-right: 30px;
  }
`

export const Footer = styled.footer`
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: 50px 0;

  .footer-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      > * {
        font-size: 3rem;
        z-index: 100;
        margin: 0;

        @media screen and (max-width: ${SM}px) {
          font-size: 2rem;
        }
      }
    }

    .socials {
      display: flex;
      justify-content: flex-end;

      svg {
        font-size: 3em;
        margin-left: 10px;
        cursor: pointer;
        transition: all 0.1s ease-in-out;

        :hover {
          color: ${({ theme }) => theme.palette.primary.main};
          transform: scale(1.05);
        }
      }
    }
  }
`
