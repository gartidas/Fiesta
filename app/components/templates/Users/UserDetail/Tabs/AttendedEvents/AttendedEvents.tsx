import { useState } from 'react'
import Link from 'next/link'
import { isEmpty } from 'lodash'
import { Done, Explore } from '@material-ui/icons'
import { useInfiniteQuery } from 'react-query'
import { Box, CircularProgress } from '@material-ui/core'

import api from '@api/HttpClient'
import { IEventDto } from 'domainTypes'
import Observer from '@elements/Observer'
import Button from '@elements/Button/Button'
import useDebounce from '@hooks/useDebounce'
import useWindowSize from '@hooks/useWindowSize'
import FetchError from '@elements/FetchError/FetchError'
import useTranslation from 'next-translate/useTranslation'
import EventListItem from '@elements/EventListItem/EventListItem'
import { IApiError, IQueryDocument, IQueryResponse } from '@api/types'

import { ActionsWrapper, Item, ItemsContainer, StyledTextBox } from '../UserDetailTabs.styled'

interface IAttendedEventsProps {
  userId: string
  isCurrentUser: boolean
}

const AttendedEvents = ({ userId, isCurrentUser }: IAttendedEventsProps) => {
  const { t } = useTranslation('common')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const { minMedium } = useWindowSize()

  const { data, isFetching, isLoading, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
    IQueryResponse<IEventDto>,
    IApiError
  >(
    ['users', userId, 'attended-events', debouncedSearch],
    async ({ pageParam = 0 }) => {
      const queryDocument: IQueryDocument = {
        page: pageParam,
        pageSize: 20
      }
      const res = await api.post(
        `/users/${userId}/attended-events?search=${encodeURIComponent(debouncedSearch)}`,
        {
          queryDocument
        }
      )
      return res.data
    },
    {
      staleTime: 60_000,
      keepPreviousData: true,
      getNextPageParam: ({ hasMore, nextPage }) => (hasMore ? nextPage : false)
    }
  )

  if (isLoading) return <CircularProgress />
  if (error) return <FetchError error={error} />

  const { pages } = data!

  return (
    <>
      <Box>
        <Box color='themeText.themeGray'>
          {t(isCurrentUser ? 'youAttendCountEvents' : 'thisUserAttendsCountEvents', {
            count: pages[0]?.totalEntries || 0
          })}
        </Box>

        <Box display='flex' gridGap='10px' flexWrap='wrap' marginY='30px'>
          <StyledTextBox
            value={search}
            label={t('search')}
            onChange={setSearch}
            variant='outlined'
            size='small'
          />

          {isCurrentUser && (
            <Link href='/explore'>
              <Button startIcon={<Explore />}>{t('exploreEvents')}</Button>
            </Link>
          )}
        </Box>
      </Box>

      {isFetching && (
        <Box marginY='15px'>
          <CircularProgress />
        </Box>
      )}

      {!isFetching && isEmpty(pages.flatMap(x => x.entries)) && (
        <Box marginTop='20px'>{t('nothingFound')}</Box>
      )}

      <ItemsContainer>
        {pages.map(page =>
          page.entries.map(e => (
            <Link key={e.id} href={`/events/${e.id}`}>
              <Item>
                <EventListItem event={e} isLink />

                <ActionsWrapper>
                  {e.isCurrentUserAttending && (
                    <Button variant='outlined' startIcon={<Done />} disabled>
                      {minMedium && t('attending')}
                    </Button>
                  )}
                </ActionsWrapper>
              </Item>
            </Link>
          ))
        )}

        <Observer callback={fetchNextPage} disabled={isFetching || !hasNextPage} />
      </ItemsContainer>
    </>
  )
}

export default AttendedEvents
