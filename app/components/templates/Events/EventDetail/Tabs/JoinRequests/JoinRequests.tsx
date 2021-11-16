import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query'
import { Box, CircularProgress } from '@material-ui/core'
import { isEmpty } from 'lodash'

import { IApiError, IQueryDocument, IQueryResponse } from '@api/types'
import useDebounce from '@hooks/useDebounce'
import { IUserDto } from 'domainTypes'
import { IEventDetail } from '../../EventDetailTemplate'
import api from '@api/HttpClient'
import Button from '@elements/Button/Button'
import UserListItem from '@elements/UserListItem/UserListItem'
import Observer from '@elements/Observer'
import FetchError from '@elements/FetchError/FetchError'

import { ActionsWrapper, Item, ItemsContainer, StyledTextBox } from '../common.styled'
import { apiErrorToast } from 'services/toastService'

interface IJoinRequestsProps {
  event: IEventDetail
}

interface IJoinRequest {
  interestedUser: IUserDto
}

const JoinRequests = ({ event }: IJoinRequestsProps) => {
  const [acceptingId, setAcceptingId] = useState<string>()
  const [decliningId, setDecliningId] = useState<string>()
  const { t } = useTranslation('common')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const queryKey = ['events', event.id, 'joinRequests', 'query', debouncedSearch]
  const queryClient = useQueryClient()

  const { data, isFetching, isLoading, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
    IQueryResponse<IJoinRequest>,
    IApiError
  >(
    queryKey,
    async ({ pageParam = 0 }) => {
      const queryDocument: IQueryDocument = {
        page: pageParam,
        pageSize: 25
      }
      const res = await api.post(
        `/events/${event.id}/join-requests/query?search=${encodeURIComponent(debouncedSearch)}`,
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

  const handleAccepted = async (interestedUser: IUserDto) => {
    setAcceptingId(interestedUser.id)
    await replyToJoinRequest(interestedUser, true)
    setAcceptingId(undefined)
  }

  const handleDeclined = async (interestedUser: IUserDto) => {
    setDecliningId(interestedUser.id)
    await replyToJoinRequest(interestedUser, false)
    setDecliningId(undefined)
  }

  const replyToJoinRequest = async (interestedUser: IUserDto, accepted: boolean) => {
    try {
      await api.post(`/events/${event.id}/join-requests/reply`, {
        userId: interestedUser.id,
        accepted: accepted
      })
      queryClient.invalidateQueries(['events', event.id, 'joinRequests', 'query'])
      queryClient.setQueryData<InfiniteData<IQueryResponse<IJoinRequest>>>(queryKey, prev => ({
        ...prev!,
        pages: prev!.pages.map(page => ({
          ...page,
          entries: page.entries.filter(e => e.interestedUser.id !== interestedUser.id)
        }))
      }))

      if (accepted) {
        queryClient.invalidateQueries(['events', event.id, 'attendees', 'query'])
        queryClient.setQueryData<IEventDetail>(['events', event.id], prev => ({
          ...prev!,
          attendeesCount: prev!.attendeesCount + 1
        }))
      }
    } catch (err) {
      apiErrorToast(err, t)
    }
  }

  if (isLoading) return <CircularProgress />
  if (error) return <FetchError error={error} />

  const { pages } = data!

  return (
    <>
      <Box display='flex' gridGap='10px' flexWrap='wrap'>
        <StyledTextBox
          value={search}
          label={t('search')}
          onChange={setSearch}
          variant='outlined'
          size='small'
        />
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
            <Item key={e.interestedUser.id}>
              <UserListItem user={e.interestedUser} isLink />

              <ActionsWrapper>
                <Button
                  variant='text'
                  onClick={() => handleAccepted(e.interestedUser)}
                  disabled={e.interestedUser.id === decliningId}
                  loading={e.interestedUser.id === acceptingId}
                >
                  {t('accept')}
                </Button>
                <Button
                  variant='text'
                  onClick={() => handleDeclined(e.interestedUser)}
                  disabled={e.interestedUser.id === acceptingId}
                  loading={e.interestedUser.id === decliningId}
                >
                  {t('decline')}
                </Button>
              </ActionsWrapper>
            </Item>
          ))
        )}

        <Observer callback={fetchNextPage} disabled={isFetching || !hasNextPage} />
      </ItemsContainer>
    </>
  )
}

export default JoinRequests
