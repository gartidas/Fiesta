import AuthorizedPage from '@layouts/AuthorizedPage'
import DefaultLayout from '@layouts/DefaultLayout'
import SettingsTemplate from '@templates/Settings/SettingsTemplate'
import useTranslation from 'next-translate/useTranslation'

const Settings = () => {
  const { t } = useTranslation('common')

  return (
    <AuthorizedPage>
      <DefaultLayout title={`${t('settings')} • Fiesta`}>
        <SettingsTemplate />
      </DefaultLayout>
    </AuthorizedPage>
  )
}

export default Settings
