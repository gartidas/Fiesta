import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'

import DefaultLayout from '@layouts/DefaultLayout'
import UserDetailTemplate from '@templates/Users/UserDetail/UserDetailTemplate'

const UserProfile = () => {
  const { t } = useTranslation('common')
  const { query } = useRouter()

  return (
    <DefaultLayout title={`${t('profile')} • Fiesta`}>
      <UserDetailTemplate userId={query.id as string} />
    </DefaultLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export default UserProfile
