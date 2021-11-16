import { useState } from 'react'
import useObserver from '@hooks/useObserver'
import { ChevronRight, Facebook, Instagram, Twitter } from '@material-ui/icons'
import { Cursor, useTypewriter } from 'react-simple-typewriter'

import Button from '@elements/Button/Button'
import FiestaLogo from '@elements/FiestaLogo'
import { Container } from '@elements/Container'
import { useAppTheme } from '@contextProviders/AppThemeProvider/AppThemeProvider'

import {
  Footer,
  Layer1,
  Layer2,
  HeroSection,
  Step,
  StepContainer,
  StepLine,
  Wrapper,
  StepsSection,
  TypewriterImage,
  ImagesContainer
} from './LandingPage.styled'

const LandingPage = () => {
  const { isDark } = useAppTheme()
  const [inViewStepIndexes, setInViewStepIndexes] = useState<number[]>([])
  const firstStepRef = useObserver<HTMLDivElement>(() => setInViewStepIndexes(x => [...x, 0]))
  const secondStepRef = useObserver<HTMLDivElement>(() => setInViewStepIndexes(x => [...x, 1]))
  const thirdStepRef = useObserver<HTMLDivElement>(() => setInViewStepIndexes(x => [...x, 2]))
  const fourthStepRef = useObserver<HTMLDivElement>(() => setInViewStepIndexes(x => [...x, 3]))
  const { text, count } = useTypewriter({
    words: ['Event Management', 'Discovering Events', 'Getting Social'],
    loop: true
  })

  return (
    <Wrapper>
      <HeroSection>
        <Container>
          <h1>
            Number #1 Platform
            <br />
            For <span>{text}</span>
            <Cursor />
          </h1>

          <h3>ALPHA - still under development</h3>

          <Button endIcon={<ChevronRight />} id='get-started-btn' href='/signup'>
            Get started
          </Button>
        </Container>

        <ImagesContainer>
          {count % 3 === 0 && <TypewriterImage src='EventManagement.svg' />}
          {count % 3 === 1 && <TypewriterImage src='DiscoveringEvents.svg' />}
          {count % 3 === 2 && <TypewriterImage src='GettingSocial.svg' />}
        </ImagesContainer>

        <Layer1 src='WaveOverlap.svg' />
      </HeroSection>

      <StepsSection>
        <Layer2 src='WaveOverlapReversed.svg' />

        <Container>
          <StepContainer ref={firstStepRef}>
            <StepLine position='first' />
            <Step inView={inViewStepIndexes.includes(0)} className='step'>
              <div className='step-text'>
                <h1>Create Event</h1>
                <p>
                  By providing minimum of required information you can create new event just like
                  that.
                </p>
              </div>

              <div className='step-image-container'>
                <img
                  src={isDark ? 'CreateEventScreenshotDark.png' : 'CreateEventScreenshotLight.png'}
                />
              </div>
            </Step>
          </StepContainer>

          <StepContainer ref={secondStepRef}>
            <StepLine />
            <Step inView={inViewStepIndexes.includes(1)} className='step'>
              <div className='step-text'>
                <h1>Upload Your Banner</h1>
                <p>
                  You will make you event stand out by adding a beautiful banner to it. Make it
                  eye-catching!
                </p>
              </div>

              <div className='step-image-container'>
                <img
                  src={isDark ? 'EventDetailScreenshotDark.png' : 'EventDetailScreenshotLight.png'}
                />
              </div>
            </Step>
          </StepContainer>

          <StepContainer ref={thirdStepRef}>
            <StepLine />
            <Step inView={inViewStepIndexes.includes(2)} className='step'>
              <div className='step-text'>
                <h1>Invite People</h1>
                <p>
                  Get some people on board! Let others know about an amazing event you are up to.
                </p>
              </div>

              <div className='step-image-container'>
                <img src={isDark ? 'InviteScreenshotDark.png' : 'InviteScreenshotLight.png'} />
              </div>
            </Step>
          </StepContainer>

          <StepContainer ref={fourthStepRef}>
            <StepLine position='last' />
            <Step inView={inViewStepIndexes.includes(3)} className='step'>
              <div className='step-text'>
                <h1>Discuss About Event</h1>
                <p>
                  There has never been an event description with all information in it. Here you can
                  get in touch with you attendees.
                </p>
              </div>

              <div className='step-image-container'>
                <img src={isDark ? 'CommentsScreenshotDark.png' : 'CommentsScreenshotLight.png'} />
              </div>
            </Step>
          </StepContainer>
        </Container>
      </StepsSection>

      <Footer>
        <Container className='footer-container'>
          <div className='logo'>
            <FiestaLogo />
          </div>

          <div className='socials'>
            <Facebook /> <Instagram /> <Twitter />
          </div>
        </Container>
      </Footer>
    </Wrapper>
  )
}

export default LandingPage
