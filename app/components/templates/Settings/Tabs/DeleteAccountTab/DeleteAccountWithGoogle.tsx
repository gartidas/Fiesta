import { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import { IApiError } from '@api/types'
import api from '@api/HttpClient'
import Button from '@elements/Button/Button'
import { errorToast, successToast } from 'services/toastService'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'

const getGoogleRedirectUrl = () => {
  const redirectUri = `${window.location.origin + '/settings?tab=deleteAccount'}`

  const queryParams = [
    `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
    `redirect_uri=${redirectUri}`,
    'response_type=code',
    'scope=openid profile email',
    'access_type=offline'
  ]
    .filter(x => !!x)
    .join('&')

  return 'https://accounts.google.com/o/oauth2/v2/auth?' + queryParams
}

const DeleteAccountWithGoogle = () => {
  const { t } = useTranslation('settings')
  const { query } = useRouter()
  const { logout } = useAuthorizedUser()
  const [deleting, setdeleting] = useState(!!query.code)

  useEffect(() => {
    const deleteAccount = async () => {
      try {
        await api.delete(`/auth/delete-account-with-google?code=${query.code}`)
        await logout(false)
        successToast(t('common:accountDeleted'))
      } catch (err) {
        const message = (err as IApiError).data.errorMessage
        errorToast(t(`common:validator.${message}`))
        setdeleting(false)
      }
    }

    query.code && deleteAccount()
    //Note: t() causes unwanded api calls -> removed from deps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.code, logout])

  return (
    <Box marginTop='30px'>
      <Button
        variant='outlined'
        loading={deleting}
        onClick={() => window.location.assign(getGoogleRedirectUrl())}
      >
        {t('deleteWithGoogle')}
      </Button>
    </Box>
  )
}

export default DeleteAccountWithGoogle
