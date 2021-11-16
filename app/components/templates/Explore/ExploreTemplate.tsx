import { Explore } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { useInfiniteQuery, useQueryClient } from 'react-query'
import useTranslation from 'next-translate/useTranslation'

import api from '@api/HttpClient'
import { IEventDto } from 'domainTypes'
import Observer from '@elements/Observer'
import FetchHandler from '@elements/FetchHandler'
import NothingFound from '@elements/NothingFound'
import useLocalStorage from '@hooks/useLocalStorage'
import EventCard from '@elements/EventCard/EventCard'
import { PageSubTitle, PageTitle } from '@elements/PageTitle'
import EventCardSkeleton from '@elements/EventCard/EventCardSkeleton'
import { IApiError, IQueryDocument, IQueryResponse } from '@api/types'
import EventsFilter, { IEventsFilter, OnlineFilter } from './EventsFilter/EventsFilter'

import { Wrapper, ExploreGrid, NothingFoundWrapper } from './ExploreTemplate.styled'

interface IExploreEvent extends IEventDto {
  organizerPictureUrl?: string
  organizerUsername: string
  organizerId: string
  description?: string
  capacity: number
  attendeesCount: number
}

const loadingCards = Array.from(Array(5).keys()).map(x => <EventCardSkeleton key={x} />)

const ExploreTemplate = () => {
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()
  const [fetchingBecauseOfFilterChange, setFetchingBecauseOfFilterChange] = useState(false)
  const [filter, setFilter] = useLocalStorage<IEventsFilter>('exploreEventsFilter', {
    onlineFilter: OnlineFilter.All
  })

  const { data, isFetching, isLoading, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
    IQueryResponse<IExploreEvent>,
    IApiError
  >(
    ['events', 'explore', filter],
    async ({ pageParam = 0 }) => {
      const queryDocument: IQueryDocument = {
        page: pageParam,
        pageSize: 20
      }
      const res = await api.post('/events/explore', {
        queryDocument,
        ...filter
      })
      return res.data
    },
    {
      staleTime: 300_000,
      keepPreviousData: true,
      getNextPageParam: ({ hasMore, nextPage }) => (hasMore ? nextPage : false)
    }
  )

  useEffect(() => {
    if (fetchingBecauseOfFilterChange && !isFetching) setFetchingBecauseOfFilterChange(false)
  }, [isFetching, fetchingBecauseOfFilterChange])

  const handleFilterChanged = (newFilter: IEventsFilter) => {
    const isNewFilterResultCached = !!queryClient.getQueryData(['events', 'explore', newFilter])
    if (!isNewFilterResultCached) {
      setFetchingBecauseOfFilterChange(true)
    }
    setFilter(newFilter)
  }

  return (
    <Wrapper>
      <PageTitle>
        {t('explore')}
        <Explore />
      </PageTitle>

      <PageSubTitle>{t('hereYouCanFindAllEventsYouMightBeInterestedIn')}</PageSubTitle>

      <EventsFilter
        filter={filter}
        onChange={handleFilterChanged}
        disabled={isLoading || isFetching}
      />

      <ExploreGrid>
        <FetchHandler
          isLoading={isLoading || fetchingBecauseOfFilterChange}
          error={error}
          loadingComponent={loadingCards}
        >
          <>
            {data?.pages.map(page =>
              page.entries.map(
                ({
                  id,
                  startDate,
                  description,
                  attendeesCount,
                  capacity,
                  name,
                  bannerUrl,
                  location,
                  organizerUsername,
                  organizerId,
                  externalLink
                }) => (
                  <EventCard
                    key={id}
                    id={id}
                    name={name}
                    capacity={capacity}
                    location={location}
                    externalLink={externalLink}
                    bannerUrl={bannerUrl}
                    startDate={startDate}
                    description={description}
                    organizerId={organizerId}
                    attendeesCount={attendeesCount}
                    organizerUsername={organizerUsername}
                  />
                )
              )
            )}

            {isFetching && loadingCards}
          </>
        </FetchHandler>
      </ExploreGrid>

      {!data?.pages[0]?.totalEntries && !isLoading && !fetchingBecauseOfFilterChange && (
        <NothingFoundWrapper>
          <NothingFound subText={t('thereAreNoEventMatchingFilters')} />
        </NothingFoundWrapper>
      )}

      <Observer disabled={isFetching || !hasNextPage} callback={fetchNextPage} />
    </Wrapper>
  )
}

export default ExploreTemplate
