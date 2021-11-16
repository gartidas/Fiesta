import { useEffect, useState } from 'react'
import { ParsedUrlQuery } from 'querystring'
import useTranslation from 'next-translate/useTranslation'
import { KeyboardArrowLeft } from '@material-ui/icons'
import { Card, CardContent } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import styled, { keyframes } from 'styled-components'
import Head from 'next/head'

import { loginUsingGoogleCode } from 'services/authService'
import { useAuth } from '@contextProviders/AuthProvider'
import FiestaLogo from '@elements/FiestaLogo'
import Button from '@elements/Button/Button'

const Overlay = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;

  .MuiCardContent-root {
    padding: 30px;
    font-size: 1.5rem;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.error.main};
  }
`

const logoMotion = keyframes`
  from{
    transform: scale(0.85);
  }
  to{
    transform:scale(1.15)
  }
`

const StyledLogo = styled(FiestaLogo)`
  animation: ${logoMotion} 0.8s linear infinite alternate;
`

const getReturnUrlFromQuery = (query: ParsedUrlQuery) => {
  try {
    const returnUrl = JSON.parse(query.state as string).returnUrl
    if (returnUrl) return returnUrl as string
  } catch (err) {
    return undefined
  }
}

const GoogleLoginCallback = () => {
  const [error, setError] = useState<string>()
  const { query, replace } = useRouter()
  const { t } = useTranslation('common')
  const { fetchUser } = useAuth()

  useEffect(() => {
    const sendCodeToServer = async () => {
      const successOrError = await loginUsingGoogleCode(query.code as string)
      if (successOrError !== true) return setError(successOrError)

      await fetchUser()
      replace(getReturnUrlFromQuery(query) || '/home')
    }

    query.code && sendCodeToServer()
  }, [query, fetchUser, replace])

  return (
    <Overlay>
      <Head>
        <title>Callback</title>
      </Head>

      {!error && <StyledLogo />}

      {error && (
        <Card>
          <CardContent>
            <p>{t(`validator.${error}`)}</p>

            <Button
              startIcon={<KeyboardArrowLeft />}
              variant='outlined'
              onClick={() => replace('/login')}
            >
              {t('back')}
            </Button>
          </CardContent>
        </Card>
      )}
    </Overlay>
  )
}

export default GoogleLoginCallback
