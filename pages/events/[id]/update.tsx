import moment from 'moment'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'

import api from '@api/HttpClient'
import { IApiError } from '@api/types'
import DefaultLayout from '@layouts/DefaultLayout'
import AuthorizedPage from '@layouts/AuthorizedPage'
import { AccessibilityTypeEnum } from 'domainTypes'
import { ILocationDto } from '@utils/googleUtils'
import { useAuth } from '@contextProviders/AuthProvider'
import CreateOrUpdateEventTemplate from '@templates/Events/CreateOrUpdateEvent/CreateOrUpdateEventTemplate'

interface IResponse {
  id: string
  name: string
  startDate: string
  endDate: string
  accessibilityType: AccessibilityTypeEnum
  capacity: number
  location?: ILocationDto
  externalLink?: string
  description?: string
}

const UpdateEvent = () => {
  const auth = useAuth()
  const { query } = useRouter()

  const { isLoading, error, data, isIdle } = useQuery<IResponse, IApiError>(
    ['events', query.id, 'update'],
    async () => (await api.get<IResponse>(`/events/${query.id}/update`)).data,
    {
      enabled: !!query.id && auth.isLoggedIn,
      cacheTime: 0 // cache time needs to be zero for edits, otherwise form initialValues are set from cache
    }
  )

  return (
    <AuthorizedPage>
      <DefaultLayout title='Edit event • Fiesta'>
        <CreateOrUpdateEventTemplate
          event={
            data
              ? {
                  ...data,
                  startDate: moment.utc(data.startDate).toDate(),
                  endDate: moment.utc(data.endDate).toDate(),
                  isOnlineEvent: !!data.externalLink
                }
              : undefined
          }
          eventFetching={isLoading || isIdle}
          fetchError={error}
        />
      </DefaultLayout>
    </AuthorizedPage>
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

export default UpdateEvent
