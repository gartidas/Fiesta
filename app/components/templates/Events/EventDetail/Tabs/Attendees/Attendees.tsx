import { isEmpty } from 'lodash'
import { useState } from 'react'
import { Alert } from '@material-ui/lab'
import { useRouter } from 'next/router'
import { Box, CircularProgress } from '@material-ui/core'
import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query'

import api from '@api/HttpClient'
import { IUserDto } from 'domainTypes'
import Observer from '@elements/Observer'
import Button from '@elements/Button/Button'
import useDebounce from '@hooks/useDebounce'
import FetchError from '@elements/FetchError/FetchError'
import { IEventDetail } from '../../EventDetailTemplate'
import useTranslation from 'next-translate/useTranslation'
import UserListItem from '@elements/UserListItem/UserListItem'
import { useAuthorizedUser } from '@contextProviders/AuthProvider'
import { apiErrorToast, successToast } from 'services/toastService'
import { IApiError, IQueryDocument, IQueryResponse } from '@api/types'
import ConfirmationDialog from '@elements/ConfirmationDialog/ConfirmationDialog'

import { ActionsWrapper, Item, ItemsContainer, StyledTextBox } from '../common.styled'

interface IAttendeesProps {
  event: IEventDetail
  isOrganizer: boolean
}

const Attendees = ({ event, isOrganizer }: IAttendeesProps) => {
  const [removing, setRemoving] = useState(false)
  const [toRemove, setToRemove] = useState<IUserDto>()
  const { currentUser } = useAuthorizedUser()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { t } = useTranslation('common')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const queryKey = ['events', event.id, 'attendees', 'query', debouncedSearch]

  const { data, isFetching, isLoading, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
    IQueryResponse<IUserDto>,
    IApiError
  >(
    queryKey,
    async ({ pageParam = 0 }) => {
      const queryDocument: IQueryDocument = {
        sorts: [{ fieldName: 'username' }],
        page: pageParam,
        pageSize: 25
      }
      const res = await api.post(
        `/events/${event.id}/attendees/query?search=${encodeURIComponent(debouncedSearch)}`,
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

  const handleRemoved = async () => {
    setRemoving(true)
    try {
      await api.post(`/events/${event.id}/attendees/delete`, { removeUserIds: [toRemove!.id] })

      if (toRemove!.id === currentUser.id) {
        router.replace('/home')
        return successToast(t('success'))
      }

      queryClient.invalidateQueries(['events', event.id, 'attendees', 'query'])
      queryClient.setQueryData<InfiniteData<IQueryResponse<IUserDto>>>(queryKey, prev => ({
        ...prev!,
        pages: prev!.pages.map(page => ({
          ...page,
          entries: page.entries.filter(e => e.id !== toRemove?.id)
        }))
      }))
      queryClient.setQueryData<IEventDetail>(['events', event.id], prev => ({
        ...prev!,
        attendeesCount: prev!.attendeesCount - 1
      }))
    } catch (err) {
      apiErrorToast(err, t)
    }
    setRemoving(false)
    setToRemove(undefined)
  }

  if (isLoading) return <CircularProgress />
  if (error) return <FetchError error={error} />

  const { pages } = data!

  return (
    <>
      {event.isCurrentUserAttendee && <Alert>{t('youAreAttendingThisEvent')}</Alert>}

      <Box marginY='20px' color='themeText.themeGray'>
        {t('thisEventHasCountAttendees', { count: event.attendeesCount })}
      </Box>

      <StyledTextBox
        value={search}
        label={t('search')}
        onChange={setSearch}
        variant='outlined'
        size='small'
      />

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
            <Item key={e.id}>
              <UserListItem user={e} isLink />

              {(isOrganizer || e.id === currentUser.id) && (
                <ActionsWrapper>
                  <Button variant='text' onClick={() => setToRemove(e)}>
                    {e.id === currentUser.id ? t('leaveEvent') : t('remove')}
                  </Button>
                </ActionsWrapper>
              )}
            </Item>
          ))
        )}

        <Observer callback={fetchNextPage} disabled={isFetching || !hasNextPage} />
      </ItemsContainer>

      {toRemove && (
        <ConfirmationDialog
          confirmLoading={removing}
          onConfirm={handleRemoved}
          onCancel={() => setToRemove(undefined)}
          confirmText={toRemove.id === currentUser.id ? t('leaveEvent') : t('remove')}
          content={
            toRemove.id === currentUser.id
              ? t('areYouSure')
              : t('doYouReallyWantToRemove', { text: toRemove.username })
          }
        />
      )}
    </>
  )
}

export default Attendees
