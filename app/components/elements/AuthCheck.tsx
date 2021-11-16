import { isFunction } from 'lodash'
import { useRouter } from 'next/router'
import { useAuth } from '@contextProviders/AuthProvider'
import LoginFallback from './LoginFallback'

interface IAuthCheckProps {
  children: JSX.Element
  fallback?: JSX.Element | ((loginUrl: string) => JSX.Element)
}

const AuthCheck = ({ children, fallback }: IAuthCheckProps) => {
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  const redirectUrl = `/login?redirectedFrom=${router.asPath}`

  if (isLoggedIn) return children
  return isFunction(fallback)
    ? fallback(redirectUrl)
    : fallback || <LoginFallback loginUrl={redirectUrl} />
}

export default AuthCheck
