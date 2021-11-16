import { useInfiniteQuery } from 'react-query'
import { CircularProgress, MenuItem, Typography } from '@material-ui/core'

import api from '@api/HttpClient'
import { IEventDto } from 'domainTypes'
import Observer from '@elements/Observer'
import FetchError from '@elements/FetchError/FetchError'
import EventListItem from '@elements/EventListItem/EventListItem'
import { IApiError, IQueryDocument, IQueryResponse } from '@api/types'

const Events = () => {
  const { data, isFetching, isLoading, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
    IQueryResponse<IEventDto>,
    IApiError
  >(
    ['events', 'query'],
    async ({ pageParam = 0 }) => {
      const queryDocument: IQueryDocument = {
        page: pageParam,
        pageSize: 20
      }
      const res = await api.post('/events/query', {
        queryDocument
      })
      return res.data
    },
    {
      staleTime: 30_000,
      keepPreviousData: true,
      getNextPageParam: ({ hasMore, nextPage }) => (hasMore ? nextPage : false)
    }
  )

  if (isLoading) return <CircularProgress />
  if (error) return <FetchError error={error} />

  const { pages } = data!

  return (
    <div>
      <Typography gutterBottom>Total: {pages[0]?.totalEntries}</Typography>

      {pages.map(page =>
        page.entries.map(x => (
          <MenuItem key={x.id} disableGutters>
            <EventListItem event={x} isLink />
          </MenuItem>
        ))
      )}

      <Observer callback={fetchNextPage} disabled={!hasNextPage || isFetching || isLoading} />
    </div>
  )
}

export default Events
