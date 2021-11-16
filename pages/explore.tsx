import AuthorizedPage from '@layouts/AuthorizedPage'
import DefaultLayout from '@layouts/DefaultLayout'
import ExploreTemplate from '@templates/Explore/ExploreTemplate'
import useTranslation from 'next-translate/useTranslation'

const Explore = () => {
  const { t } = useTranslation('common')

  return (
    <AuthorizedPage>
      <DefaultLayout title={`${t('explore')} • Fiesta`} disableNavbarHysteresis>
        <ExploreTemplate />
      </DefaultLayout>
    </AuthorizedPage>
  )
}

export default Explore
