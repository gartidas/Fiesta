import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { ErrorOutlineOutlined, FingerprintOutlined, LockTwoTone, Search } from '@material-ui/icons'

import { IApiError } from '@api/types'
import Button from '@elements/Button/Button'
import { useAuth } from '@contextProviders/AuthProvider'
import { ErrorCard } from './FetchError.styled'

interface IFetchErrorProps {
  error: IApiError
}

const FetchError = ({ error }: IFetchErrorProps) => {
  const { t } = useTranslation('common')
  const auth = useAuth()
  const router = useRouter()

  const redirect =
    [401, 403].includes(error.status) &&
    !auth.isLoggedIn &&
    `/login?redirectedFrom=${router.asPath}`

  const getErrorTitle = () => {
    switch (error.status) {
      case 404:
        return 'notFound'
      case 403:
        return 'notAuthorized'
      case 401:
        return 'notAuthenticated'
      default:
        return 'unexpectedErrorOccuredWhileLoadingData'
    }
  }

  const getErrorMessage = () => {
    switch (error.status) {
      case 404:
        return 'resourceDoesNotExistOrHasBeenDeleted'
      case 403:
        return 'youDontHaveSufficentPermissionsToAccessThisResource'
      default:
        return undefined
    }
  }

  const getErrorIcon = () => {
    switch (error.status) {
      case 404:
        return <Search fontSize='large' />
      case 403:
        return <LockTwoTone fontSize='large' />
      default:
        return <ErrorOutlineOutlined fontSize='large' />
    }
  }

  const errorMessage = getErrorMessage()

  return (
    <ErrorCard>
      {getErrorIcon()}

      <h3>{t(getErrorTitle())}</h3>

      {errorMessage && <p>{t(errorMessage)}</p>}

      {redirect && (
        <Link href={redirect}>
          <Button startIcon={<FingerprintOutlined />}>{t('login')}</Button>
        </Link>
      )}
    </ErrorCard>
  )
}

export default FetchError
