import { useEffect, useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Button, Card } from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'

import api from '@api/HttpClient'
import { IApiError } from '@api/types'
import { PageMinHeightWrapper } from '@elements/PageMinHeightWrapper'

const StyledCard = styled(Card)`
  padding: 40px 30px;
  min-width: 300px;

  h1 {
    color: ${({ theme }) => theme.palette.primary.main};
  }

  p {
    color: ${({ theme }) => theme.palette.error.main};
    font-size: 1.3rem;
  }
`

const ConfirmEmailPage = () => {
  const { query, replace } = useRouter()
  const { t } = useTranslation('common')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const verify = async () => {
      try {
        await api.post('/auth/verify-email', { email: query.email, code: query.code })
      } catch (err) {
        setError((err as IApiError).data.errorMessage)
      }

      setLoading(false)
    }

    query.code && query.email && verify()
  }, [query])

  return (
    <PageMinHeightWrapper center>
      <Head>
        <title>Confirm email</title>
      </Head>

      <StyledCard>
        {loading && <p>{t('loading')}...</p>}

        {error && <p>{t(`validator.${error}`)}</p>}

        {!error && !loading && (
          <>
            <h1>{t('success')}</h1>

            <Button
              endIcon={<KeyboardArrowRight />}
              color='primary'
              variant='contained'
              onClick={() => replace('/login')}
            >
              {t('login')}
            </Button>
          </>
        )}
      </StyledCard>
    </PageMinHeightWrapper>
  )
}

export default ConfirmEmailPage
