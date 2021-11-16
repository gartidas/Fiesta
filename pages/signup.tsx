import DefaultLayout from '@layouts/DefaultLayout'
import SignupTemplate from '@templates/Signup/SignupTemplate'
import useTranslation from 'next-translate/useTranslation'

const Signup = () => {
  const { t } = useTranslation('common')

  return (
    <DefaultLayout title={`${t('signup')} • Fiesta`} forceUnauthorizedNavbar>
      <SignupTemplate />
    </DefaultLayout>
  )
}

export default Signup
