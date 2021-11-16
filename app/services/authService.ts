import { AxiosInstance } from 'axios'
import { IApiError } from '@api/types'
import { ICurrentUser } from 'domainTypes'
import api, { setAuthHeader } from '../api/HttpClient'

export const logout = async () => {
  try {
    await api.post(`${window.location.origin}/api/logout`)
  } catch {
    //pass
  }
  setAuthHeader(undefined)
}

export const fetchCurrentUser = async () => {
  const hasAuthHeader = !!api.defaults.headers['Authorization']

  try {
    if (!hasAuthHeader) {
      await refreshToken()
    }
    const res = await api.get('/auth/me')
    return res.data as ICurrentUser
  } catch (err) {
    return undefined
  }
}

export const getGoogleLoginUrl = (redirectedFrom?: string) => {
  const redirectUri = `${window.location.origin + process.env.NEXT_PUBLIC_GOOGLE_AUTH_CALLBACK_URL}`

  const queryParams = [
    `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
    `redirect_uri=${redirectUri}`,
    'response_type=code',
    'scope=openid profile email',
    'access_type=offline',
    redirectedFrom && `state=${encodeURI(JSON.stringify({ returnUrl: redirectedFrom }))}`
  ]
    .filter(x => !!x)
    .join('&')

  return 'https://accounts.google.com/o/oauth2/v2/auth?' + queryParams
}

/**
 * @returns true or error message
 */
export const loginUsingGoogleCode = async (code: string) => {
  try {
    const res = await api.post(`${window.location.origin}/api/google-login`, { code })
    setAuthHeader(res.data.accessToken)
    return true
  } catch (err) {
    return (err as IApiError).data.errorMessage
  }
}

/**
 * @returns true or error message
 */
export const loginWithEmailAndPassword = async (body: {
  emailOrUsername: string
  password: string
}) => {
  try {
    const res = await api.post(`${window.location.origin}/api/login`, body)
    setAuthHeader(res.data.accessToken)
    return true
  } catch (err) {
    return (err as IApiError).data.errorMessage
  }
}

/**
 * @returns accessToken
 */
export const refreshToken = async (client: AxiosInstance = api): Promise<string> => {
  try {
    const response = await client.get(window.location.origin + '/api/refresh-token')
    const { accessToken } = response.data
    setAuthHeader(accessToken)
    return Promise.resolve(accessToken)
  } catch (_) {
    return Promise.reject('FAILED TO REFRESH TOKEN')
  }
}
