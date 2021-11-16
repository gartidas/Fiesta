import { useAuthorizedUser } from '@contextProviders/AuthProvider'
import Button from '@elements/Button/Button'
import { PageSubTitle, PageTitle } from '@elements/PageTitle'
import { Add, Explore } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { Wrapper } from './HomeTemplate.styled'

const HomeTemplate = () => {
  const { currentUser } = useAuthorizedUser()
  const { t } = useTranslation('common')
  return (
    <Wrapper>
      <PageTitle>Home</PageTitle>

      <PageSubTitle>
        Welcome {currentUser.firstName}! What events are you attending next ?
      </PageSubTitle>

      <div style={{ marginTop: '30px' }}>
        <Link href='/events/create-event'>
          <Button startIcon={<Add />} variant='outlined' size='large'>
            {t('createEvent')}
          </Button>
        </Link>

        <span style={{ padding: '0 10px' }}>{t('or').toUpperCase()}</span>

        <Link href='/explore'>
          <Button variant='outlined' startIcon={<Explore />} size='large'>
            {t('explore')}
          </Button>
        </Link>
      </div>
    </Wrapper>
  )
}

export default HomeTemplate
