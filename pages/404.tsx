import { Button } from '@material-ui/core'
import { KeyboardArrowLeft } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { MD } from '@contextProviders/AppThemeProvider/theme'

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  padding: 40px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      color: ${({ theme }) => theme.palette.primary.main};
      text-shadow: 5px 5px 30px rgba(255, 8, 102, 0.5);
      font-size: 2.5rem;
      text-align: center;
      span {
        font-size: 5rem;
      }
      @media screen and (max-width: ${MD}px) {
        font-size: 2rem;
        span {
          font-size: 4rem;
        }
      }
    }

    img {
      width: 100%;
      max-height: 50vh;
      padding: 50px 0 50px 0;
    }
  }
`

const NotFound = () => {
  const { t } = useTranslation('common')
  const { back } = useRouter()

  return (
    <Wrapper>
      <div>
        <h1>
          <span>404</span>
          <br />
          {t('noPartyHere')}
        </h1>
        <img src='/404.svg' />
        <Button
          startIcon={<KeyboardArrowLeft />}
          color='primary'
          variant='outlined'
          size='large'
          onClick={back}
        >
          {t('back')}
        </Button>
      </div>
    </Wrapper>
  )
}

export default NotFound
