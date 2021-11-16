import moment from 'moment'
import Router from 'next/router'
import NProgress from 'nprogress'
import { AppProps } from 'next/app'
import MomentUtils from '@date-io/moment'
import { ToastContainer } from 'react-toastify'
import useTranslation from 'next-translate/useTranslation'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import AuthProvider from '@contextProviders/AuthProvider'
import NotificationsProvider from '@modules/Notifications/NotificationsProvider'
import AppThemeProvider from '@contextProviders/AppThemeProvider/AppThemeProvider'
import FriendRequestsProvider from '@modules/FriendRequests/FriendRequestsProvider'

import '../public/globals.css'
import 'nprogress/nprogress.css'
import 'react-toastify/dist/ReactToastify.min.css'

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } }
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { lang } = useTranslation()
  moment.locale(lang)

  // Note: Keep AppThemeProvider close to the Component
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <FriendRequestsProvider>
            <NotificationsProvider>
              <AppThemeProvider>
                <Component {...pageProps} />

                <ToastContainer />
              </AppThemeProvider>
            </NotificationsProvider>
          </FriendRequestsProvider>
        </MuiPickersUtilsProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default MyApp
